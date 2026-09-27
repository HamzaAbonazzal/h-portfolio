<!-- ═══════════════════════════════════════════════════════════ -->
<!-- Portfolio — Full Stack Developer                            -->
<!-- ═══════════════════════════════════════════════════════════ -->

<div align="center">

# 🎨 Hamza Abonazzal — Portfolio

### Full Stack Developer Portfolio

A modern, bilingual (AR/EN), full-stack portfolio website with admin dashboard, built with **Next.js 15**, **Node.js**, **Express**, and **MongoDB**.

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-20-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](./LICENSE)

[🌐 Live Demo](https://your-portfolio.vercel.app) · [🐛 Report Bug](https://github.com/yourusername/portfolio/issues) · [✨ Request Feature](https://github.com/yourusername/portfolio/issues)

</div>

---

<!-- ═══════════════════════════════════════════════════════════ -->
<!-- 📖 English Documentation                                    -->
<!-- ═══════════════════════════════════════════════════════════ -->

## 📖 English Documentation

### 🎯 About The Project

A modern, fully-featured portfolio website designed to showcase projects, skills, and experience as a **Full Stack Developer**. Built with a **decoupled architecture** (separate frontend and backend), it features:

- **Bilingual support** (Arabic RTL / English LTR) with automatic direction switching.
- **Dark/Light mode** with persistent user preference.
- **Admin dashboard** for managing projects and messages without touching code.
- **Smooth animations** powered by Framer Motion.
- **Responsive design** optimized for all devices.

### 📸 Screenshots

|                Home (Dark)                |                Home (Light)                 |
| :---------------------------------------: | :-----------------------------------------: |
| ![Home Dark](./screenshots/home-dark.png) | ![Home Light](./screenshots/home-light.png) |

|                Projects                 |          Admin Dashboard          |
| :-------------------------------------: | :-------------------------------: |
| ![Projects](./screenshots/projects.png) | ![Admin](./screenshots/admin.png) |

> **Note:** Replace the screenshot paths above with your actual images.

---

### ✨ Features

#### 🎨 Frontend

- ⚡ **Next.js 15** with App Router and Turbopack
- 🎭 **Framer Motion** animations (scroll reveal, hover, transitions)
- 🌗 **Dark/Light mode** with `next-themes` alternative (custom implementation)
- 🌍 **Multi-language** support with `next-intl` (Arabic + English)
- 📱 **Fully responsive** design (mobile, tablet, desktop)
- 🎯 **SEO optimized** with dynamic metadata
- 🖼️ **Custom scrollbar** and scroll progress indicator
- 🎬 **Typing effect** and particle background in hero section
- 🔍 **Filterable projects** by category
- 📊 **Animated statistics counters**
- 📬 **Contact form** with real-time validation

#### 🛠️ Backend

- 🚀 **Node.js + Express** REST API
- 🗄️ **MongoDB** with Mongoose ODM
- 🔐 **JWT authentication** for admin access
- 🔒 **Password hashing** with bcryptjs
- 🛡️ **Protected routes** with auth middleware
- ✅ **Centralized error handling**
- 📨 **Contact form** message storage

#### 👨‍💼 Admin Dashboard

- 🔑 Secure login with JWT
- 📁 Full CRUD for projects (Create, Read, Update, Delete)
- 📬 Inbox for reading and managing messages
- 📊 Live statistics (projects, messages, featured)
- 🌗 Themed interface matching the main site

---

### 🧰 Tech Stack

#### Frontend

| Technology                         | Purpose                         |
| ---------------------------------- | ------------------------------- |
| **Next.js 15**                     | React framework with App Router |
| **React 19**                       | UI library                      |
| **TypeScript**                     | Type safety                     |
| **Tailwind CSS 4**                 | Utility-first styling           |
| **Framer Motion**                  | Animations                      |
| **next-intl**                      | Internationalization            |
| **Axios**                          | HTTP client                     |
| **react-icons** & **lucide-react** | Icon libraries                  |

#### Backend

| Technology     | Purpose               |
| -------------- | --------------------- |
| **Node.js**    | JavaScript runtime    |
| **Express.js** | Web framework         |
| **MongoDB**    | NoSQL database        |
| **Mongoose**   | MongoDB ODM           |
| **JWT**        | Authentication        |
| **bcryptjs**   | Password hashing      |
| **dotenv**     | Environment variables |
| **CORS**       | Cross-origin requests |

---

### 📁 Project Structure

```
portfolio/
│
├── client/                          # Next.js frontend
│   ├── public/                      # Static assets (favicon, cv, images)
│   ├── src/
│   │   ├── app/                     # App Router
│   │   │   ├── [locale]/            # Locale-based routing
│   │   │   │   ├── admin/           # Admin dashboard
│   │   │   │   │   ├── login/       # Admin login page
│   │   │   │   │   ├── layout.tsx   # Admin protection
│   │   │   │   │   └── page.tsx     # Dashboard home
│   │   │   │   ├── layout.tsx       # Locale layout
│   │   │   │   └── page.tsx         # Home page
│   │   │   ├── globals.css          # Global styles + Tailwind
│   │   │   └── layout.tsx           # Root layout
│   │   ├── components/
│   │   │   ├── admin/               # Admin components
│   │   │   ├── layout/              # Navbar, Footer
│   │   │   ├── providers/           # Theme, Auth providers
│   │   │   ├── sections/            # Page sections
│   │   │   └── ui/                  # Reusable UI components
│   │   ├── i18n/                    # next-intl configuration
│   │   ├── lib/                     # Utilities (API, motion config)
│   │   ├── messages/                # Translation files (ar.json, en.json)
│   │   ├── types/                   # TypeScript types
│   │   └── proxy.ts                 # Next.js middleware
│   ├── tailwind.config.ts
│   ├── next.config.ts
│   └── package.json
│
├── server/                          # Express backend
│   ├── config/
│   │   └── db.js                    # MongoDB connection
│   ├── controllers/                 # Business logic
│   │   ├── authController.js
│   │   ├── messageController.js
│   │   ├── projectController.js
│   │   └── skillController.js
│   ├── middleware/                  # Custom middleware
│   │   ├── authMiddleware.js
│   │   └── errorMiddleware.js
│   ├── models/                      # Mongoose schemas
│   │   ├── Message.js
│   │   ├── Project.js
│   │   ├── Skill.js
│   │   └── User.js
│   ├── routes/                      # API routes
│   │   ├── authRoutes.js
│   │   ├── messageRoutes.js
│   │   ├── projectRoutes.js
│   │   └── skillRoutes.js
│   ├── seed.js                      # Seed admin user
│   ├── seedProjects.js              # Seed sample projects
│   ├── server.js                    # Entry point
│   └── package.json
│
└── README.md
```

---

### 🚀 Getting Started

#### Prerequisites

Make sure you have installed:

- **Node.js** (v18 or later) — [Download](https://nodejs.org/)
- **npm** or **yarn** or **pnpm**
- **MongoDB** (local or [Atlas](https://www.mongodb.com/atlas))
- **Git**

#### Installation

**1. Clone the repository:**

```bash
git clone https://github.com/yourusername/portfolio.git
cd portfolio
```

**2. Setup the Backend:**

```bash
cd server
npm install
```

Create a `.env` file in `server/`:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/portfolio
JWT_SECRET=your_super_secret_key_change_this
NODE_ENV=development
```

Seed the admin user and sample projects:

```bash
node seed.js
node seedProjects.js
```

Start the backend:

```bash
npm run dev
```

The API will be available at `http://localhost:5000`.

**3. Setup the Frontend:**

```bash
cd ../client
npm install
```

Create a `.env.local` file in `client/`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

Start the frontend:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

### 🔑 Admin Access

After running `node seed.js`, you can login to the admin dashboard at:

```
http://localhost:3000/en/admin/login
```

**Default credentials:**

- 📧 **Email:** `admin@portfolio.com`
- 🔑 **Password:** `admin123456`

> ⚠️ **Important:** Change the password immediately after first login in production.

---

### 🔌 API Endpoints

#### Authentication

| Method | Endpoint          | Description      | Access  |
| ------ | ----------------- | ---------------- | ------- |
| `POST` | `/api/auth/login` | Login as admin   | Public  |
| `GET`  | `/api/auth/me`    | Get current user | Private |

#### Projects

| Method   | Endpoint            | Description        | Access |
| -------- | ------------------- | ------------------ | ------ |
| `GET`    | `/api/projects`     | Get all projects   | Public |
| `GET`    | `/api/projects/:id` | Get single project | Public |
| `POST`   | `/api/projects`     | Create project     | Admin  |
| `PUT`    | `/api/projects/:id` | Update project     | Admin  |
| `DELETE` | `/api/projects/:id` | Delete project     | Admin  |

#### Skills

| Method   | Endpoint          | Description    | Access |
| -------- | ----------------- | -------------- | ------ |
| `GET`    | `/api/skills`     | Get all skills | Public |
| `POST`   | `/api/skills`     | Create skill   | Admin  |
| `PUT`    | `/api/skills/:id` | Update skill   | Admin  |
| `DELETE` | `/api/skills/:id` | Delete skill   | Admin  |

#### Messages

| Method   | Endpoint                 | Description      | Access |
| -------- | ------------------------ | ---------------- | ------ |
| `POST`   | `/api/messages`          | Send message     | Public |
| `GET`    | `/api/messages`          | Get all messages | Admin  |
| `PUT`    | `/api/messages/:id/read` | Mark as read     | Admin  |
| `DELETE` | `/api/messages/:id`      | Delete message   | Admin  |

---

### 📜 Available Scripts

#### Frontend (`client/`)

| Command         | Description              |
| --------------- | ------------------------ |
| `npm run dev`   | Start development server |
| `npm run build` | Build for production     |
| `npm run start` | Start production server  |
| `npm run lint`  | Run ESLint               |

#### Backend (`server/`)

| Command                | Description             |
| ---------------------- | ----------------------- |
| `npm run dev`          | Start with nodemon      |
| `npm start`            | Start production server |
| `node seed.js`         | Seed admin user         |
| `node seedProjects.js` | Seed sample projects    |

---

### 🌐 Environment Variables

#### Backend (`server/.env`)

| Variable     | Description               | Example                               |
| ------------ | ------------------------- | ------------------------------------- |
| `PORT`       | Server port               | `5000`                                |
| `MONGO_URI`  | MongoDB connection string | `mongodb://127.0.0.1:27017/portfolio` |
| `JWT_SECRET` | Secret for JWT signing    | `your_secret_key`                     |
| `NODE_ENV`   | Environment mode          | `development`                         |

#### Frontend (`client/.env.local`)

| Variable              | Description     | Example                     |
| --------------------- | --------------- | --------------------------- |
| `NEXT_PUBLIC_API_URL` | Backend API URL | `http://localhost:5000/api` |

---

### 🚢 Deployment

#### Frontend (Vercel)

1. Push your code to GitHub.
2. Go to [vercel.com](https://vercel.com/) and import the `client` folder.
3. Add the environment variable:
   ```
   NEXT_PUBLIC_API_URL=https://your-backend-url.com/api
   ```
4. Deploy! ✅

#### Backend (Render / Railway)

**On Render:**

1. Create a new **Web Service**.
2. Connect your GitHub repo, select the `server` folder.
3. Set:
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
4. Add environment variables:
   - `PORT=5000`
   - `MONGO_URI=your_mongodb_atlas_uri`
   - `JWT_SECRET=your_production_secret`
   - `NODE_ENV=production`
5. Deploy! ✅

#### Database (MongoDB Atlas)

1. Create a free cluster on [MongoDB Atlas](https://www.mongodb.com/atlas).
2. Create a database user.
3. Whitelist your server IP (or use `0.0.0.0/0` for all).
4. Copy the connection string to your `.env`.

---

### 🎨 Customization

#### Change Colors

Edit `client/src/app/globals.css`:

```css
@theme {
  --color-gold-500: #d4af37; /* Main brand color */
  --color-dark-900: #0a0a0f; /* Dark background */
}
```

#### Change Animations

Edit `client/src/lib/motion.ts` — all animation settings are centralized:

```ts
export const MOTION_CONFIG = {
  duration: { fast: 0.25, normal: 0.35, slow: 0.5 },
  stagger: { fast: 0.04, normal: 0.06, slow: 0.08 },
  viewportMargin: "-30px",
};
```

#### Change Translations

Edit `client/src/messages/ar.json` and `en.json`.

---

### 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the project.
2. Create your feature branch: `git checkout -b feature/AmazingFeature`.
3. Commit your changes: `git commit -m 'Add some AmazingFeature'`.
4. Push to the branch: `git push origin feature/AmazingFeature`.
5. Open a Pull Request.

---

### 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](./LICENSE) file for details.

---

### 📬 Contact

**Hamza Abonazzal** — Full Stack Developer

- 📧 Email: [hamzaabonazzal@gmail.com](mailto:hamzaabonazzal@gmail.com)
- 📱 Phone: +963 986 751 916
- 🔗 GitHub: [@yourusername](https://github.com/yourusername)
- 💼 LinkedIn: [in/yourusername](https://linkedin.com/in/yourusername)
- 🌐 Portfolio: [your-portfolio.com](https://your-portfolio.com)

---

### ⭐ Show Your Support

If this project helped you, please give it a ⭐ on GitHub!

---

### 🙏 Acknowledgments

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [next-intl](https://next-intl-docs.vercel.app/)
- [Lucide Icons](https://lucide.dev/)
- [React Icons](https://react-icons.github.io/react-icons/)

---

<div align="center">

**Made with ❤️ by [Hamza Abonazzal](https://github.com/yourusername)**

© 2026 Hamza Abonazzal. All rights reserved.

</div>

---

---

<!-- ═══════════════════════════════════════════════════════════ -->
<!-- 📖 التوثيق العربي                                            -->
<!-- ═══════════════════════════════════════════════════════════ -->

<div dir="rtl">

## 📖 التوثيق العربي

### 🎯 عن المشروع

موقع بورتفوليو حديث ومتكامل لعرض المشاريع والمهارات والخبرات كمطور فل ستاك. مبني بهيكلة **مفصولة** (واجهة أمامية مستقلة + خلفية مستقلة)، ويتميز بـ:

- **دعم لغتين** (عربي RTL / إنجليزي LTR) مع تبديل تلقائي للاتجاه.
- **وضع ليلي/نهاري** مع حفظ تفضيل المستخدم.
- **لوحة تحكم للمشرف** لإدارة المشاريع والرسائل بدون تعديل الكود.
- **أنميشن سلس** باستخدام Framer Motion.
- **تصميم متجاوب** يعمل على جميع الأجهزة.

### 📸 لقطات الشاشة

|              الرئيسية (ليلي)              |              الرئيسية (نهاري)               |
| :---------------------------------------: | :-----------------------------------------: |
| ![Home Dark](./screenshots/home-dark.png) | ![Home Light](./screenshots/home-light.png) |

|                المشاريع                 |            لوحة التحكم            |
| :-------------------------------------: | :-------------------------------: |
| ![Projects](./screenshots/projects.png) | ![Admin](./screenshots/admin.png) |

---

### ✨ الميزات

#### 🎨 الواجهة الأمامية

- ⚡ **Next.js 15** مع App Router و Turbopack
- 🎭 **Framer Motion** للأنميشن (Scroll Reveal، Hover، Transitions)
- 🌗 **وضع ليلي/نهاري** بدون مكتبات خارجية
- 🌍 **دعم متعدد اللغات** عبر `next-intl` (عربي + إنجليزي)
- 📱 **تصميم متجاوب كامل** (جوال، تابلت، سطح مكتب)
- 🎯 **محسّن لمحركات البحث** مع metadata ديناميكي
- 🖼️ **شريط تمرير مخصص** ومؤشر تقدم الصفحة
- 🎬 **تأثير الكتابة** وخلفية الجزيئات في قسم Hero
- 🔍 **فلترة المشاريع** حسب التصنيف
- 📊 **عدادات إحصائيات متحركة**
- 📬 **نموذج تواصل** مع تحقق فوري

#### 🛠️ الواجهة الخلفية

- 🚀 **Node.js + Express** REST API
- 🗄️ **MongoDB** مع Mongoose
- 🔐 **مصادقة JWT** لوصول المشرف
- 🔒 **تشفير كلمات المرور** بـ bcryptjs
- 🛡️ **حماية المسارات** بـ Middleware
- ✅ **معالجة أخطاء مركزية**
- 📨 **تخزين رسائل نموذج التواصل**

#### 👨‍💼 لوحة التحكم

- 🔑 تسجيل دخول آمن بـ JWT
- 📁 إدارة كاملة للمشاريع (إضافة، عرض، تعديل، حذف)
- 📬 صندوق الرسائل للقراءة والإدارة
- 📊 إحصائيات فورية (مشاريع، رسائل، مميزة)
- 🌗 واجهة بنفس هوية الموقع

---

### 🧰 التقنيات المستخدمة

#### الواجهة الأمامية

| التقنية                            | الغرض                    |
| ---------------------------------- | ------------------------ |
| **Next.js 15**                     | إطار React مع App Router |
| **React 19**                       | مكتبة الواجهات           |
| **TypeScript**                     | أمان الأنواع             |
| **Tailwind CSS 4**                 | تنسيق Utility-first      |
| **Framer Motion**                  | الأنميشن                 |
| **next-intl**                      | تعدد اللغات              |
| **Axios**                          | عميل HTTP                |
| **react-icons** و **lucide-react** | مكتبات الأيقونات         |

#### الواجهة الخلفية

| التقنية        | الغرض              |
| -------------- | ------------------ |
| **Node.js**    | بيئة التشغيل       |
| **Express.js** | إطار الويب         |
| **MongoDB**    | قاعدة البيانات     |
| **Mongoose**   | ODM لـ MongoDB     |
| **JWT**        | المصادقة           |
| **bcryptjs**   | تشفير كلمات المرور |
| **dotenv**     | متغيرات البيئة     |
| **CORS**       | طلبات عبر النطاقات |

---

### 📁 هيكل المشروع

```text
portfolio/
│
├── client/                          # واجهة Next.js
│   ├── public/                      # الملفات الثابتة
│   ├── src/
│   │   ├── app/                     # App Router
│   │   │   ├── [locale]/            # مسارات اللغة
│   │   │   │   ├── admin/           # لوحة التحكم
│   │   │   │   ├── layout.tsx       # تخطيط اللغة
│   │   │   │   └── page.tsx         # الصفحة الرئيسية
│   │   │   ├── globals.css          # الأنماط العامة
│   │   │   └── layout.tsx           # التخطيط الجذري
│   │   ├── components/              # مكونات React
│   │   ├── i18n/                    # إعداد next-intl
│   │   ├── lib/                     # أدوات مساعدة
│   │   ├── messages/                # ملفات الترجمة
│   │   └── types/                   # أنواع TypeScript
│   └── package.json
│
├── server/                          # خلفية Express
│   ├── config/                      # الاتصال بـ MongoDB
│   ├── controllers/                 # منطق العمل
│   ├── middleware/                  # Middleware مخصصة
│   ├── models/                      # مخططات Mongoose
│   ├── routes/                      # مسارات API
│   ├── seed.js                      # بذر المشرف
│   ├── seedProjects.js              # بذر المشاريع
│   ├── server.js                    # نقطة الانطلاق
│   └── package.json
│
└── README.md
```

---

### 🚀 البدء

#### المتطلبات

تأكد من تثبيت:

- **Node.js** (v18 أو أحدث) — [تحميل](https://nodejs.org/)
- **npm** أو **yarn** أو **pnpm**
- **MongoDB** (محلي أو [Atlas](https://www.mongodb.com/atlas))
- **Git**

#### التثبيت

**1. استنسخ المستودع:**

```bash
git clone https://github.com/yourusername/portfolio.git
cd portfolio
```

**2. تجهيز الواجهة الخلفية:**

```bash
cd server
npm install
```

أنشئ ملف `.env` في `server/`:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/portfolio
JWT_SECRET=your_super_secret_key_change_this
NODE_ENV=development
```

بذر المشرف والمشاريع:

```bash
node seed.js
node seedProjects.js
```

تشغيل الخلفية:

```bash
npm run dev
```

الـ API سيكون متاحاً على `http://localhost:5000`.

**3. تجهيز الواجهة الأمامية:**

```bash
cd ../client
npm install
```

أنشئ ملف `.env.local` في `client/`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

تشغيل الواجهة:

```bash
npm run dev
```

افتح [http://localhost:3000](http://localhost:3000).

---

### 🔑 الدخول للوحة التحكم

بعد تشغيل `node seed.js`، يمكنك الدخول من:

```
http://localhost:3000/ar/admin/login
```

**بيانات الدخول الافتراضية:**

- 📧 **البريد:** `admin@portfolio.com`
- 🔑 **كلمة المرور:** `admin123456`

> ⚠️ **مهم:** غيّر كلمة المرور فوراً بعد أول دخول في الإنتاج.

---

### 🌐 متغيرات البيئة

#### الخلفية (`server/.env`)

| المتغير      | الوصف              | المثال                                |
| ------------ | ------------------ | ------------------------------------- |
| `PORT`       | منفذ السيرفر       | `5000`                                |
| `MONGO_URI`  | رابط اتصال MongoDB | `mongodb://127.0.0.1:27017/portfolio` |
| `JWT_SECRET` | مفتاح توقيع JWT    | `your_secret_key`                     |
| `NODE_ENV`   | بيئة التشغيل       | `development`                         |

#### الواجهة الأمامية (`client/.env.local`)

| المتغير               | الوصف           | المثال                      |
| --------------------- | --------------- | --------------------------- |
| `NEXT_PUBLIC_API_URL` | رابط API الخلفي | `http://localhost:5000/api` |

---

### 🚢 النشر

#### الواجهة الأمامية (Vercel)

1. ارفع الكود إلى GitHub.
2. اذهب إلى [vercel.com](https://vercel.com/) واستورد مجلد `client`.
3. أضف متغير البيئة:
   ```
   NEXT_PUBLIC_API_URL=https://your-backend-url.com/api
   ```
4. انشر! ✅

#### الواجهة الخلفية (Render / Railway)

**على Render:**

1. أنشئ **Web Service** جديداً.
2. اربط مستودع GitHub، واختر مجلد `server`.
3. اضبط:
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
4. أضف متغيرات البيئة:
   - `PORT=5000`
   - `MONGO_URI=your_mongodb_atlas_uri`
   - `JWT_SECRET=your_production_secret`
   - `NODE_ENV=production`
5. انشر! ✅

#### قاعدة البيانات (MongoDB Atlas)

1. أنشئ عنقوداً مجانياً على [MongoDB Atlas](https://www.mongodb.com/atlas).
2. أنشئ مستخدماً للقاعدة.
3. أضف IP سيرفرك (أو `0.0.0.0/0` للجميع).
4. انسخ رابط الاتصال إلى `.env`.

---

### 🎨 التخصيص

#### تغيير الألوان

عدّل `client/src/app/globals.css`:

```css
@theme {
  --color-gold-500: #d4af37; /* اللون الأساسي */
  --color-dark-900: #0a0a0f; /* الخلفية الداكنة */
}
```

#### تغيير الأنميشن

عدّل `client/src/lib/motion.ts` — كل الإعدادات في مكان واحد:

```ts
export const MOTION_CONFIG = {
  duration: { fast: 0.25, normal: 0.35, slow: 0.5 },
  stagger: { fast: 0.04, normal: 0.06, slow: 0.08 },
  viewportMargin: "-30px",
};
```

#### تغيير الترجمات

عدّل `client/src/messages/ar.json` و `en.json`.

---

### 📄 الترخيص

هذا المشروع مرخص تحت **رخصة MIT** — راجع ملف [LICENSE](./LICENSE) للتفاصيل.

---

### 📬 تواصل معي

**حمزة أبونزال** — مطور فل ستاك

- 📧 البريد: [hamzaabonazzal@gmail.com](mailto:hamzaabonazzal@gmail.com)
- 📱 الجوال: +963 986 751 916
- 🔗 GitHub: [@yourusername](https://github.com/yourusername)
- 💼 LinkedIn: [in/yourusername](https://linkedin.com/in/yourusername)
- 🌐 البورتفوليو: [your-portfolio.com](https://your-portfolio.com)

---

### ⭐ ادعم المشروع

إذا أفادك هذا المشروع، فامنحه ⭐ على GitHub!

---

<div align="center">

**صُنع بـ ❤️ بواسطة [حمزة أبونزال](https://github.com/hamzaabonazzal)**

© 2026 حمزة أبونزال. جميع الحقوق محفوظة.

</div>

</div>
