import fs from 'node:fs/promises';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import bcrypt from 'bcrypt';

import * as authServices from '../services/authServices';

import HttpError from '../helpers/HttpError';
import cloudinary from '../helpers/cloudinary';
import ctrlWrapper from '../decorators/ctrlWrapper';
import { env } from '../helpers/env';
import { sendMail } from '../helpers/sendEmail';

import { Controller } from '../types';

const generateToken = () => Math.random().toString(36).substring(2, 14);

const registerUser: Controller = async (req, res) => {
  const { username, email, password } = req.body;

  const user = await authServices.findUser({ email });

  if (user) {
    throw new HttpError(409, 'Email already in use');
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const verificationToken = generateToken();

  const newUser = await authServices.registerUser({
    username,
    email,
    password: hashPassword,
    verificationToken,
    isVerified: false, 
    avatarUrl: null
  });

  const verificationUrl = new URL('/bordify/verify-email', env('FRONTEND_URL'));
  verificationUrl.searchParams.set('token', verificationToken);

  await sendMail({
    to: email,
    subject: 'Verify your Bordify account',
    html: `
      <h2>Welcome to Bordify!</h2>
      <p>Please verify your email by clicking this link:</p>
      <a href="${verificationUrl}">Verify Email</a>
      <p>Or copy this URL to your browser:</p>
      <p>${verificationUrl}</p>
    `
  });

  res.status(201).json({
    status: 201,
    message: 'Registration successful! Please check your email to verify your account',
    data: {
      username: newUser.username,
      email: newUser.email,
    },
  });
};

const loginUser: Controller = async (req, res) => {
  const { email, password } = req.body;

  const ACCESS_JWT_SECRET = env('ACCESS_JWT_SECRET');
  const REFRESH_JWT_SECRET = env('REFRESH_JWT_SECRET');

  const user = await authServices.findUser({ email });

  if (!user) {
    throw new HttpError(400, 'Email or password invalid');
  }

  const passwordCompare = await bcrypt.compare(password, user.password);

  if (!passwordCompare) {
    throw new HttpError(400, 'Email or password invalid');
  }

  if (!user.isVerified) {
    throw new HttpError(403, 'Please verify your email first');
  }


  const { _id } = user;

  await authServices.abortUserSession({ userId: _id });

  const payload = { id: _id };

  const accessToken = jwt.sign(payload, ACCESS_JWT_SECRET, { expiresIn: '1h' });
  const refreshToken = jwt.sign(payload, REFRESH_JWT_SECRET, {
    expiresIn: '7d',
  });

  const newSession = await authServices.createSession({
    userId: _id,
    accessToken,
    refreshToken,
  });

  if (!newSession) {
    throw new HttpError(400, `Something went wrong during session creation`);
  }

  res.json({
    status: 200,
    data: {
      sid: newSession?._id,
      accessToken,
      refreshToken,
      user: {
        username: user?.username,
        email: user?.email,
        avatarUrl: user?.avatarUrl,
        theme: user?.theme,
      },
    },
  });
};

const logoutUser: Controller = async (req, res) => {
  const { _id } = req.user as { _id: string };
  await authServices.abortUserSession({ userId: _id });
  res.status(204).json({
    status: 204,
  });
};

const getCurrentUser: Controller = async (req, res) => {
  const { email, username, avatarUrl, theme } = req.user as {
    email: string;
    username: string;
    avatarUrl: string | null;
    theme: string;
  };

  res.json({
    status: 200,
    data: { username, email, avatarUrl, theme },
  });
};

const patchUser: Controller = async (req, res) => {
  const { username, email, password, theme } = req.body;
  const { _id } = req.user as {
    _id: unknown;
  };

  let hashPassword;
  let avatarUrl;

  if (password) {
    hashPassword = await bcrypt.hash(password, 10);
  }

  if (email) {
    const userWithNewMail = await authServices.findUser({ email });
    if (userWithNewMail) {
      throw new HttpError(
        408,
        'Cannot change email to that which is already occupied.'
      );
    }
  }

  if (req?.file?.path) {
    try {
      const { secure_url } = await cloudinary.uploader.upload(req.file.path, {
        folder: 'avatars',
      });

      avatarUrl = secure_url;

      await fs.unlink(req.file.path);
    } catch (error) {
      await fs.unlink(req.file.path);
      throw error;
    }
  }

  const newUser = await authServices.updateUser(
    { _id },
    {
      username,
      email,
      password: hashPassword,
      theme,
      avatarUrl,
    }
  );

  res.json({
    status: 200,
    data: {
      username: newUser?.username,
      email: newUser?.email,
      theme: newUser?.theme,
      avatarUrl: newUser?.avatarUrl,
    },
  });
};

const refreshTokens: Controller = async (req, res) => {
  const { sid } = req.body;
  const { authorization } = req.headers;

  const REFRESH_JWT_SECRET = env('REFRESH_JWT_SECRET');
  const ACCESS_JWT_SECRET = env('ACCESS_JWT_SECRET');

  if (!authorization) {
    throw new HttpError(401, `Authorization header not found`);
  }

  const [bearer, oldRefreshToken] = authorization.split(' ');

  if (bearer !== 'Bearer') {
    throw new HttpError(401, 'Bearer not found');
  }

  const { id } = jwt.verify(
    oldRefreshToken,
    REFRESH_JWT_SECRET
  ) as jwt.JwtPayload;

  const currentSession = await authServices.abortSession({
    userId: id,
    _id: sid,
  });

  if (!currentSession) {
    throw new HttpError(401, 'Session not found');
  }

  const payload = { id };

  const accessToken = jwt.sign(payload, ACCESS_JWT_SECRET, { expiresIn: '1h' });
  const refreshToken = jwt.sign(payload, REFRESH_JWT_SECRET, {
    expiresIn: '7d',
  });

  const newSession = await authServices.createSession({
    userId: id,
    accessToken,
    refreshToken,
  });

  res.json({
    status: 200,
    data: {
      sid: newSession?._id,
      accessToken: newSession?.accessToken,
      refreshToken: newSession?.refreshToken,
    },
  });
};

const googleAuth: Controller = async (req, res) => {
  const params = new URLSearchParams({
    client_id: process.env.GOOGLE_AUTH_CLIENT_ID!,
    redirect_uri: `${env('BASE_URL')}/api/auth/google-redirect`,
    scope: [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
    ].join(' '),
    response_type: 'code',
    access_type: 'offline',
    prompt: 'consent',
  }).toString();

  return res.redirect(
    `https://accounts.google.com/o/oauth2/v2/auth?${params}`
  );
};

const verifyEmail: Controller = async (req, res) => {
  const { token } = req.params;

  const user = await authServices.findUser({ verificationToken: token });
  
  if (!user) {
    throw new HttpError(400, 'Invalid or expired verification link');
  }

  await authServices.updateUser(
    { _id: user._id },
    { 
      isVerified: true,
      verificationToken: null 
    }
  );

  res.json({
    status: 200,
    message: 'Email verified successfully!'
  });
};

const googleRedirect: Controller = async (req, res) => {
  const fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
  const urlObj = new URL(fullUrl);
  const code = urlObj.searchParams.get('code');

  const tokenData = await axios({
    url: `https://oauth2.googleapis.com/token`,
    method: 'post',
    data: {
      client_id: env('GOOGLE_AUTH_CLIENT_ID'),
      client_secret: env('GOOGLE_AUTH_CLIENT_SECRET'),
      redirect_uri: `${env('BASE_URL')}/api/auth/google-redirect`,
      grant_type: 'authorization_code',
      code,
    },
  });

  const { data } = await axios({
    url: 'https://www.googleapis.com/oauth2/v2/userinfo',
    method: 'get',
    headers: {
      Authorization: `Bearer ${tokenData.data.access_token}`,
    },
  });

  const { email, name, picture, id } = data;

  const ACCESS_JWT_SECRET = env('ACCESS_JWT_SECRET');
  const REFRESH_JWT_SECRET = env('REFRESH_JWT_SECRET');

  const user = await authServices.findUser({ email });

  if (!user) {
    const hashPassword = await bcrypt.hash(id, 10);

    const newUser = await authServices.registerUser({
      username: name,
      email,
      password: hashPassword,
      verificationToken: null,
      isVerified: true,
      avatarUrl: picture,
    });

    const { _id } = newUser;
    const payload = { id: _id };

    const accessToken = jwt.sign(payload, ACCESS_JWT_SECRET, {
      expiresIn: '1h',
    });
    const refreshToken = jwt.sign(payload, REFRESH_JWT_SECRET, {
      expiresIn: '7d',
    });

    const newSession = await authServices.createSession({
      userId: _id,
      accessToken,
      refreshToken,
    });

    return res.redirect(
      `${env('FRONTEND_URL')}?sid=${newSession._id}&accessToken=${newSession.accessToken}&refreshToken=${newSession.refreshToken}`
    );
  }

  const { _id } = user;

  await authServices.abortUserSession({ userId: _id });

  const payload = { id: _id };

  const accessToken = jwt.sign(payload, ACCESS_JWT_SECRET, {
    expiresIn: '1h',
  });
  const refreshToken = jwt.sign(payload, REFRESH_JWT_SECRET, {
    expiresIn: '7d',
  });

  const newSession = await authServices.createSession({
    userId: _id,
    accessToken,
    refreshToken,
  });

  if (!newSession) {
    throw new HttpError(400, 'Something went wrong during session creation');
  }

  return res.redirect(
    `${env('FRONTEND_URL')}?sid=${newSession._id}&accessToken=${newSession.accessToken}&refreshToken=${newSession.refreshToken}`
  );
};


export default {
  registerUser: ctrlWrapper(registerUser),
  loginUser: ctrlWrapper(loginUser),
  logoutUser: ctrlWrapper(logoutUser),
  getCurrentUser: ctrlWrapper(getCurrentUser),
  patchUser: ctrlWrapper(patchUser),
  refreshTokens: ctrlWrapper(refreshTokens),
  googleAuth: ctrlWrapper(googleAuth),
  googleRedirect: ctrlWrapper(googleRedirect),
  verifyEmail: ctrlWrapper(verifyEmail)
};