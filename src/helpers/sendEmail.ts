import { OAuth2Client } from 'google-auth-library';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { env } from './env';

interface IEmailData {
  to: string;
  subject: string;
  text?: string;
  html?: string;
  from?: string;
}

dotenv.config();

const oauth2Client = new OAuth2Client(
  env('GOOGLE_AUTH_CLIENT_ID'),
  env('GOOGLE_AUTH_CLIENT_SECRET'),
  'https://developers.google.com/oauthplayground'
);

oauth2Client.setCredentials({
  refresh_token: env('GOOGLE_AUTH_REFRESH_TOKEN'),
});

export const sendMail = async (data: IEmailData) => {
  try {
    const { token } = await oauth2Client.getAccessToken();
    if (!token) throw new Error('Failed to get access token');
    
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: env('GMAIL_EMAIL'),
        clientId: env('GOOGLE_AUTH_CLIENT_ID'),
        clientSecret: env('GOOGLE_AUTH_CLIENT_SECRET'),
        refreshToken: env('GOOGLE_AUTH_REFRESH_TOKEN'),
        accessToken: token,
      },
    });

    await transporter.verify();
    console.log('Server is ready to send emails');

    const mailOptions = {
      from: `Bordify <${env('GMAIL_EMAIL')}>`,
      to: data.to,
      subject: data.subject,
      text: data.text,
      html: data.html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);
    return info;
  } catch (error) {
    console.error('Email sending failed:', error);
    throw error;
  }
};