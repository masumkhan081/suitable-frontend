# Suitable - Islamic Dating App Frontend

This is a [Next.js](https://nextjs.org) project for the Suitable Islamic dating platform.


## API Integration Status

### Summary: APIs to Build & Test First

#### ✅ Already Built (Test These First):

1. `POST /auth/register` - User registration
2. `POST /auth/login` - User login
3. `POST /auth/email-verification` - Email verification
4. `GET /health` - Health check

#### 🔨 Need to Build Next:

1. `GET /auth/me` - Get current user profile
2. `POST /profile` - Create/update profile (for onboarding)
3. `POST /profile/photos` - Upload profile photos
4. `PATCH /profile/preferences` - Save user preferences

#### 🧪 Test Plan:

1. **Run the test script**: `node test-api.js` (from frontend directory)
2. **Integrate working auth APIs** into SignIn/SignUp components
3. **Build missing profile APIs** in backend
4. **Connect onboarding flow** to profile APIs

#### Frontend Flow:

**Homepage → Sign Up → Onboarding (6 steps) → Dashboard**

#### Backend Configuration:

- **Backend Port**: 3000 (MongoDB connected)
- **Frontend Port**: 3001 (Next.js)
- **API Base URL**: `http://localhost:3000`

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
npm dev
# or
bun dev
```

here:

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
