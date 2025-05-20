# Bordify Backend

Bordify — це RESTful backend для канбан-системи управління завданнями. Побудований на Node.js + Express із MongoDB як основною базою даних. Забезпечує автентифікацію, управління користувачами, дошками, колонками, завданнями та форму підтримки.

Проєкт повністю розгорнуто на платформі [Render](https://render.com).

## 🌐 Пов’язані сервіси
- Фронтенд частина доступна за адресою: [https://bordify-frontend.onrender.com](https://bordify-frontend.onrender.com)
- Uptime Robot: [![Backend Uptime](https://img.shields.io/uptimerobot/status/m800575843-6d54d4dbb3b8823b35a679ac)](https://stats.uptimerobot.com/3H4vuDHzkP)

## 📦 Стек технологій

- **Node.js / Express.js** — серверна логіка
- **MongoDB / Mongoose** — зберігання даних
- **TypeScript** — типізація
- **JWT / Bcrypt** — автентифікація
- **Swagger** — документація API
- **Firebase Analytics** — аналітика
- **Cloudinary** — зберігання зображень (аватари)
- **Nodemailer** — надсилання пошти
- **Google OAuth 2.0** — авторизація через Google

---

## 🚀 Запуск проєкту локально

### 1. Клонування репозиторію
```bash
git clone https://github.com/your-username/bordify-backend.git
cd bordify-backend
```

### 2. Встановлення залежностей
```bash
npm install
```

### 3. Налаштування змінних середовища
Створи файл `.env` на основі `.env.example` і заповни його:

### 4. Запуск сервера
```bash
npm run dev
```

Сервер буде доступний на `http://localhost:3000`

---

## 📘 Документація API

Документація доступна за адресою:
```
http://localhost:3000/api-docs
```

---

## 📁 Структура проєкту
```
📦 src
├── config/           # Налаштування сервісів (Cloudinary, Passport)
├── controllers/      # Контролери: auth, board, column, task, support
├── middlewares/      # Перевірки auth, errors, validators
├── models/           # Mongoose-схеми
├── routes/           # Express-маршрути
├── services/         # Бізнес-логіка
├── types/            # Типи TypeScript
├── helpers/          # Утиліти: email, tokens, errorHandler
├── app.ts            # Ініціалізація Express
├── server.ts         # Запуск сервера
```

---

## 🔐 Основні функції
- ✅ Реєстрація / логін з JWT
- 🔐 Google OAuth авторизація
- 📧 Підтвердження email через код
- 🧠 Firebase аналітика
- 🌳 MongoDB Atlas аналітика
- 📌 CRUD: Дошки, колонки, задачі

---

## 📄 Ліцензія
Цей проєкт ліцензовано під MIT License.
