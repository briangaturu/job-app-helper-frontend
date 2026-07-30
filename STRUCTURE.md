# Frontend Application Structure

## Overview
Complete React + TypeScript frontend for the Job Application Helper, built with a component-based architecture.

## File Structure

```
job-app-helper-frontend/
├── src/
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Button.tsx          # Reusable button with variants
│   │   │   ├── Input.tsx           # Text input with validation
│   │   │   ├── Textarea.tsx        # Multi-line text input
│   │   │   ├── Select.tsx          # Dropdown select
│   │   │   ├── Modal.tsx           # Modal dialog
│   │   │   └── Card.tsx            # Card container
│   │   ├── layout/
│   │   │   ├── Layout.tsx          # Main layout wrapper
│   │   │   └── Navbar.tsx          # Navigation bar
│   │   ├── applications/
│   │   │   ├── ApplicationCard.tsx # Application display card
│   │   │   ├── ApplicationForm.tsx # Create/edit form
│   │   │   └── StatsCard.tsx       # Stats display card
│   │   ├── generations/
│   │   │   ├── GenerationCard.tsx  # Generation display card
│   │   │   └── GenerationForm.tsx  # Generation creation form
│   │   └── interviews/
│   │       └── InterviewQuestionCard.tsx # Interview Q&A card
│   ├── pages/
│   │   ├── LoginPage.tsx           # Login page
│   │   ├── RegisterPage.tsx        # Registration page
│   │   ├── DashboardPage.tsx       # Main dashboard
│   │   ├── ApplicationsPage.tsx    # Applications list
│   │   ├── GenerationsPage.tsx     # Generations list
│   │   └── InterviewsPage.tsx      # Interview practice
│   ├── services/
│   │   ├── auth.service.ts         # Auth API calls
│   │   ├── applications.service.ts # Applications API
│   │   ├── generations.service.ts  # Generations API
│   │   └── interviews.service.ts   # Interviews API
│   ├── store/
│   │   └── authStore.ts            # Authentication state (Zustand)
│   ├── types/
│   │   └── index.ts                # TypeScript interfaces
│   ├── lib/
│   │   └── axios.ts                # Axios config with interceptors
│   ├── utils/
│   │   └── cn.ts                   # Class name utility
│   ├── App.tsx                     # Main app with routing
│   ├── main.tsx                    # Entry point
│   ├── index.css                   # Global styles + Tailwind
│   └── vite-env.d.ts              # Vite types
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
├── README.md
└── STRUCTURE.md (this file)
```

## Pages

### 1. **LoginPage** (`/login`)
- Email/password login form
- Form validation with react-hook-form
- Error handling
- Link to registration

### 2. **RegisterPage** (`/register`)
- New user registration
- Name, email, password, confirm password fields
- Password matching validation
- Link to login

### 3. **DashboardPage** (`/dashboard`)
- Application statistics overview
- 6 stat cards: Total, Applied, Interviewing, Offers, Saved, Rejected
- Quick action buttons
- Welcome banner

### 4. **ApplicationsPage** (`/applications`)
- List all job applications
- Search functionality
- Create/edit modal
- Delete with confirmation
- Status badges with colors
- Interview button per application

### 5. **GenerationsPage** (`/generations`)
- List AI generations
- Create new generation modal
- Display cover letter & resume tips
- Match score display
- Create application from generation

### 6. **InterviewsPage** (`/interviews/:applicationId`)
- Generate interview questions
- Answer questions
- Receive AI feedback
- View all questions for an application

## Components

### UI Components
- **Button**: 4 variants (primary, secondary, danger, ghost), 3 sizes, loading state
- **Input**: Label, error display, ref forwarding
- **Textarea**: Multi-line input with validation
- **Select**: Dropdown with options array
- **Modal**: Backdrop, ESC to close, scroll support
- **Card**: Simple container with shadow

### Layout Components
- **Layout**: Main wrapper with Navbar and content area
- **Navbar**: Logo, navigation links, user info, logout

### Feature Components
- **ApplicationCard**: Displays app with edit/delete/interview actions
- **ApplicationForm**: Create/edit with company, title, description, status, notes
- **StatsCard**: Number display with icon and colored background
- **GenerationCard**: Shows AI output with match score
- **GenerationForm**: Job title + description input
- **InterviewQuestionCard**: Question, answer textarea, feedback display

## Services

All services use Axios with auth token injection:

### auth.service.ts
- `register(name, email, password)` → Returns { token, user }
- `login(email, password)` → Returns { token, user }

### applications.service.ts
- `create(data)` → Create new application
- `list()` → Get all applications
- `update(id, data)` → Update application
- `delete(id)` → Delete application
- `getStats()` → Get statistics

### generations.service.ts
- `create({ jobTitle?, jobText })` → Generate AI content
- `list()` → Get all generations

### interviews.service.ts
- `generateQuestions({ applicationId, count? })` → Generate questions
- `submitAnswer({ questionId, userAnswer })` → Submit answer & get feedback
- `listForApplication(applicationId)` → Get all questions

## State Management

### authStore (Zustand)
- `user`: Current user object
- `token`: JWT token
- `isAuthenticated`: Boolean flag
- `login(token, user)`: Store credentials
- `logout()`: Clear credentials
- `initialize()`: Load from localStorage on app start

## Routing

### Protected Routes
- `/dashboard` - Dashboard
- `/applications` - Applications list
- `/generations` - Generations list
- `/interviews/:applicationId` - Interview practice

### Public Routes
- `/login` - Login page
- `/register` - Registration page
- `/` - Redirects to `/dashboard`

## Styling

- **TailwindCSS** for all styling
- **Custom primary color**: Blue palette (50-900)
- **Responsive**: Mobile-first approach
- **Dark mode**: Not implemented (future enhancement)

## Data Flow

1. **User logs in** → Token stored in localStorage & authStore
2. **API requests** → Axios interceptor adds token to headers
3. **Protected routes** → Check `isAuthenticated` from authStore
4. **401 responses** → Interceptor clears auth & redirects to login

## Installation & Running

```bash
# Install dependencies
npm install

# Start development server (http://localhost:3000)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Environment Configuration

The app proxies `/api` requests to `http://localhost:5000` (configured in vite.config.ts).

## Key Dependencies

- **react** (18.2.0) - UI library
- **react-router-dom** (6.22.0) - Routing
- **axios** (1.6.7) - HTTP client
- **zustand** (4.5.0) - State management
- **react-hook-form** (7.50.0) - Form handling
- **zod** (3.22.4) - Schema validation
- **lucide-react** (0.323.0) - Icons
- **date-fns** (3.3.1) - Date formatting
- **tailwindcss** (3.4.1) - Styling
- **typescript** (5.2.2) - Type safety
- **vite** (5.1.0) - Build tool

## Type Safety

All components and services are fully typed with TypeScript. Main types:

```typescript
User, Application, Generation, InterviewQuestion, 
ApplicationStatus, Plan, AuthResponse, ApplicationStats
```

## Future Enhancements

- Dark mode support
- Pagination for lists
- Advanced filtering & sorting
- File upload for resumes
- Email notifications
- Mobile app (React Native)
- Real-time updates (WebSocket)
