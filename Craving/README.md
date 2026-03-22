# Craving

A full-stack food ordering platform with role-based dashboards for **User**, **Restaurant**, **Rider**, and **Admin**.

## Features

- Authentication with OTP flow and password reset
- Public restaurant listing and menu browsing
- Place orders and checkout flow
- Razorpay payment integration
- Restaurant dashboard for menu/order/profile management
- Rider dashboard for current and history orders
- User dashboard for profile, orders, and payment info
- Contact form support

## Tech Stack

### Frontend (client)
- React 19
- Vite
- React Router
- Axios
- React Hot Toast
- Tailwind CSS

### Backend (server)
- Node.js
- Express
- MongoDB + Mongoose
- JWT Auth
- Cloudinary (image hosting)
- Nodemailer (email/OTP)
- Razorpay (payments)

## Project Structure

```text
Craving/
  client/   # React + Vite frontend
  server/   # Express backend API
```

## Prerequisites

- Node.js 18+
- npm 9+
- MongoDB connection string
- Razorpay test account
- Cloudinary account
- Gmail app password (for email sending)

## Installation

From project root:

```bash
cd client
npm install

cd ../server
npm install
```

## Environment Variables

Create a `.env` file inside `server/`:

```env
PORT=4500
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

GMAIL_USER=your_email@gmail.com
GMAIL_PASSCODE=your_gmail_app_password

RAZORPAY_TEST_API_KEY=your_razorpay_test_key
RAZORPAY_TEST_API_SECRET=your_razorpay_test_secret

DISTANCE_MATRIX_API_KEY=your_google_distance_matrix_api_key
```

> Note:
> - Frontend API client uses `http://localhost:4500` by default.
> - If backend runs on another port, update `client/src/Config/Api.jsx`.

## Run the Project

Open two terminals from project root.

Terminal 1 (backend):

```bash
cd server
npm run dev
```

Terminal 2 (frontend):

```bash
cd client
npm run dev
```

Frontend default URL: `http://localhost:5173`

## Seed Commands (Optional)

Run from `server/`:

```bash
npm run seed:admin
npm run seed:user
npm run seed:menu
```

## API Base Routes

- `/auth`
- `/public`
- `/user`
- `/restaurant`
- `/rider`
- `/payment`

## Available Scripts

### client

```bash
npm run dev
npm run build
npm run preview
npm run lint
```

### server

```bash
npm run dev
npm run seed:admin
npm run seed:user
npm run seed:menu
```

## Notes

- This project is currently configured for local development.
- Keep route/file naming consistent with case to avoid issues on Linux deployments.
- Update CORS origin in `server/index.js` when deploying.

## Author

Rakhi Rani
