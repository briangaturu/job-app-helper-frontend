# Job Application Helper - Frontend

A modern React application for managing job applications with AI-powered features.

## Features

- 🔐 **Authentication**: Secure login and registration
- 📊 **Dashboard**: Overview of your job applications with stats
- 💼 **Applications**: Create, track, and manage job applications
- ✨ **AI Generations**: Generate tailored cover letters and resume tips
- 🎤 **Interview Practice**: AI-powered interview questions and feedback

## Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development and builds
- **TailwindCSS** for styling
- **React Router** for navigation
- **Zustand** for state management
- **React Hook Form** for form handling
- **Axios** for API calls
- **Lucide React** for icons
- **date-fns** for date formatting

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Basic UI components (Button, Input, Modal, etc.)
│   ├── layout/         # Layout components (Navbar, Layout)
│   ├── applications/   # Application-specific components
│   ├── generations/    # Generation-specific components
│   └── interviews/     # Interview-specific components
├── pages/              # Page components
│   ├── LoginPage.tsx
│   ├── RegisterPage.tsx
│   ├── DashboardPage.tsx
│   ├── ApplicationsPage.tsx
│   ├── GenerationsPage.tsx
│   └── InterviewsPage.tsx
├── services/           # API service layers
│   ├── auth.service.ts
│   ├── applications.service.ts
│   ├── generations.service.ts
│   └── interviews.service.ts
├── store/              # State management
│   └── authStore.ts
├── types/              # TypeScript types
│   └── index.ts
├── lib/                # Third-party library configs
│   └── axios.ts
├── utils/              # Utility functions
│   └── cn.ts
├── App.tsx             # Main app component with routing
├── main.tsx            # Entry point
└── index.css           # Global styles
```

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm run dev
   ```

3. **Build for production**:
   ```bash
   npm run build
   ```

4. **Preview production build**:
   ```bash
   npm run preview
   ```

## Environment Setup

Production requests use the deployed backend at `https://job-app-helper-backend.onrender.com` by default. To use a local backend, create a `.env.local` file with:

```bash
VITE_API_URL=http://localhost:4000
```

The Vite development proxy remains available for local setups that use relative `/api` requests.

## Component Architecture

### UI Components
- **Button**: Reusable button with variants (primary, secondary, danger, ghost)
- **Input**: Text input with label and error handling
- **Textarea**: Multi-line text input
- **Select**: Dropdown select component
- **Modal**: Accessible modal dialog
- **Card**: Container component for content

### Feature Components
- **ApplicationCard**: Displays application summary with actions
- **ApplicationForm**: Form for creating/editing applications
- **GenerationCard**: Displays AI generation results
- **GenerationForm**: Form for creating new generations
- **InterviewQuestionCard**: Interview question with answer submission
- **StatsCard**: Dashboard statistics display

### Pages
- **LoginPage**: User authentication
- **RegisterPage**: New user registration
- **DashboardPage**: Overview with statistics and quick actions
- **ApplicationsPage**: List and manage job applications
- **GenerationsPage**: View and create AI generations
- **InterviewsPage**: Practice interview questions

## API Integration

All API calls are centralized in service files:
- `auth.service.ts` - Authentication endpoints
- `applications.service.ts` - Application CRUD operations
- `generations.service.ts` - AI generation operations
- `interviews.service.ts` - Interview practice operations

## State Management

The application uses Zustand for global state management, currently managing:
- **authStore**: User authentication state and actions

## Routing

Protected routes require authentication and redirect to `/login` if not authenticated.
Public routes (login, register) redirect to `/dashboard` if already authenticated.

## Styling

TailwindCSS is used for all styling with a custom color palette defined in `tailwind.config.js`. The primary color is blue with shades from 50 to 900.

## Development Notes

- All components are fully typed with TypeScript
- Forms use React Hook Form for validation and state management
- API responses are typed with interfaces defined in `types/index.ts`
- Error handling is implemented in the Axios interceptor
- Authentication tokens are stored in localStorage
