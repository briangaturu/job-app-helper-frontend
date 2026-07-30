# Installation Guide

## Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **pnpm** (package manager)
- Backend API running on `http://localhost:5000`

## Step 1: Install Dependencies

Navigate to the frontend directory and install all dependencies:

```bash
cd c:\Users\USER\Desktop\job-app-helper\job-app-helper-frontend
npm install
```

Or if you prefer pnpm:

```bash
pnpm install
```

## Step 2: Verify Configuration

The frontend is configured to proxy API requests to the backend. Check `vite.config.ts`:

```typescript
server: {
  port: 3000,
  proxy: {
    '/api': {
      target: 'http://localhost:5000',
      changeOrigin: true,
    }
  }
}
```

If your backend runs on a different port, update the `target` value.

## Step 3: Start Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:3000`

## Step 4: Build for Production

To create a production build:

```bash
npm run build
```

The build output will be in the `dist/` directory.

## Step 5: Preview Production Build

To preview the production build locally:

```bash
npm run preview
```

## Troubleshooting

### Port Already in Use

If port 3000 is already in use, you can change it in `vite.config.ts`:

```typescript
server: {
  port: 3001, // Change to any available port
  // ...
}
```

### API Connection Issues

If you see network errors:

1. Ensure the backend is running on `http://localhost:5000`
2. Check browser console for CORS errors
3. Verify the backend has CORS enabled for `http://localhost:3000`

### TypeScript Errors

If you see TypeScript errors during build:

```bash
# Clear node_modules and reinstall
rm -rf node_modules
npm install

# Or with pnpm
pnpm install
```

### Module Not Found Errors

Make sure all dependencies are installed:

```bash
npm install react react-dom react-router-dom axios zustand react-hook-form zod @hookform/resolvers lucide-react clsx date-fns
npm install -D @types/react @types/react-dom typescript @vitejs/plugin-react tailwindcss postcss autoprefixer
```

## Directory Structure After Installation

```
job-app-helper-frontend/
├── node_modules/          # Dependencies (created after npm install)
├── dist/                  # Production build (created after npm run build)
├── src/                   # Source code
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── ...
```

## Development Workflow

1. **Start backend server** (on port 5000)
2. **Start frontend dev server** (on port 3000)
3. **Open browser** to `http://localhost:3000`
4. **Register a new account** or **login**
5. **Start using the app**

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Create production build
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint to check code quality

## Environment Variables

Currently, the app doesn't use environment variables. All configuration is in `vite.config.ts`.

If you need to add environment variables in the future:

1. Create `.env` file in the root
2. Add variables with `VITE_` prefix: `VITE_API_URL=http://localhost:5000`
3. Access in code: `import.meta.env.VITE_API_URL`

## Next Steps

After installation:

1. Create a user account on the register page
2. Explore the dashboard
3. Create your first job application
4. Generate AI-powered content
5. Practice interview questions

## Support

For issues or questions:
- Check the README.md for detailed documentation
- Review STRUCTURE.md for architecture details
- Check browser console for error messages
