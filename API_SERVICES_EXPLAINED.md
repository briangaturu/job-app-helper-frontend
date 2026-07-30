# API Services Explained

## 📡 What Are API Services?

**API Services** (now named `.api.ts`) are modules that handle all communication with the backend API. They act as a **bridge** between your React components and the backend server.

## 🎯 Purpose

### 1. **Separation of Concerns**
- Components focus on **UI and user interactions**
- API services handle **data fetching and sending**
- Clean separation makes code easier to maintain

### 2. **Reusability**
- Multiple components can use the same API function
- No need to rewrite API calls in every component
- Single source of truth for backend communication

### 3. **Type Safety**
- API responses are typed with TypeScript interfaces
- Compile-time errors if you use wrong data types
- Better IDE autocomplete and suggestions

### 4. **Centralized Error Handling**
- All API errors go through Axios interceptors
- Consistent error handling across the app
- Automatic logout on 401 (unauthorized) errors

## 📂 The 4 API Services

### 1. `auth.api.ts` - Authentication
Handles user authentication operations.

```typescript
export const authService = {
  // Register new user
  register: async (name, email, password) => {
    // POST /api/auth/register
    // Returns: { token: string, user: User }
  },

  // Login existing user
  login: async (email, password) => {
    // POST /api/auth/login
    // Returns: { token: string, user: User }
  }
}
```

**Used by:**
- `LoginPage.tsx` - User login
- `RegisterPage.tsx` - User registration

**Example:**
```typescript
// In LoginPage.tsx
const response = await authService.login(email, password);
// response = { token: "jwt...", user: { id: 1, name: "John", ... } }
```

---

### 2. `applications.api.ts` - Job Applications
Manages CRUD operations for job applications.

```typescript
export const applicationsService = {
  // Create new application
  create: async (data) => {
    // POST /api/applications
    // Returns: Application object
  },

  // Get all applications
  list: async () => {
    // GET /api/applications
    // Returns: Application[]
  },

  // Update existing application
  update: async (id, data) => {
    // PATCH /api/applications/:id
    // Returns: Updated Application
  },

  // Delete application
  delete: async (id) => {
    // DELETE /api/applications/:id
    // Returns: void
  },

  // Get statistics
  getStats: async () => {
    // GET /api/applications/stats
    // Returns: { total, saved, applied, interviewing, offer, rejected }
  }
}
```

**Used by:**
- `ApplicationsPage.tsx` - List, create, edit, delete
- `DashboardPage.tsx` - Get statistics
- `GenerationsPage.tsx` - Create application from generation

**Example:**
```typescript
// In ApplicationsPage.tsx
const apps = await applicationsService.list();
// apps = [{ id: 1, jobTitle: "Engineer", company: "Google", ... }, ...]

await applicationsService.delete(5);
// Deletes application with ID 5
```

---

### 3. `generations.api.ts` - AI Generations
Handles AI-powered content generation.

```typescript
export const generationsService = {
  // Generate AI content from job description
  create: async (data) => {
    // POST /api/generations
    // Input: { jobTitle?: string, jobText: string }
    // Returns: Generation with AI output
  },

  // Get all past generations
  list: async () => {
    // GET /api/generations
    // Returns: Generation[]
  }
}
```

**Used by:**
- `GenerationsPage.tsx` - Create and list generations

**Example:**
```typescript
// In GenerationsPage.tsx
const generation = await generationsService.create({
  jobTitle: "Senior Engineer",
  jobText: "We are looking for..."
});
// generation = {
//   id: 1,
//   outputJson: {
//     coverLetter: "Dear Hiring Manager...",
//     resumeTips: ["Highlight React experience", ...],
//   },
//   matchScore: 85
// }
```

---

### 4. `interviews.api.ts` - Interview Practice
Manages interview question generation and feedback.

```typescript
export const interviewsService = {
  // Generate AI interview questions
  generateQuestions: async (data) => {
    // POST /api/interviews/questions
    // Input: { applicationId: number, count?: number }
    // Returns: InterviewQuestion[]
  },

  // Submit answer and get AI feedback
  submitAnswer: async (data) => {
    // POST /api/interviews/answers
    // Input: { questionId: number, userAnswer: string }
    // Returns: InterviewQuestion with feedback
  },

  // Get all questions for an application
  listForApplication: async (applicationId) => {
    // GET /api/interviews/applications/:applicationId/questions
    // Returns: InterviewQuestion[]
  }
}
```

**Used by:**
- `InterviewsPage.tsx` - Generate questions, submit answers

**Example:**
```typescript
// In InterviewsPage.tsx
const questions = await interviewsService.generateQuestions({
  applicationId: 1,
  count: 5
});
// questions = [
//   { id: 1, question: "Tell me about yourself", ... },
//   { id: 2, question: "Why do you want to work here?", ... }
// ]

const updated = await interviewsService.submitAnswer({
  questionId: 1,
  userAnswer: "I am a software engineer with 5 years..."
});
// updated = {
//   id: 1,
//   question: "Tell me about yourself",
//   userAnswer: "I am a software engineer...",
//   feedback: "Great answer! Consider adding..."
// }
```

---

## 🔄 How Data Flows

### Example: Creating a Job Application

```
1. User clicks "Create Application" button in ApplicationsPage
   ↓
2. Component calls: applicationsService.create(formData)
   ↓
3. Service makes API call: POST /api/applications
   ↓
4. Axios adds JWT token from localStorage to request headers
   ↓
5. Backend receives request, validates, saves to database
   ↓
6. Backend sends response: { id: 5, jobTitle: "...", ... }
   ↓
7. Service returns typed Application object to component
   ↓
8. Component updates UI with new application
```

### Visual Flow:
```
┌─────────────────┐
│ Component       │
│ (UI Layer)      │
└────────┬────────┘
         │ calls service function
         ↓
┌─────────────────┐
│ API Service     │
│ (Data Layer)    │
└────────┬────────┘
         │ HTTP request
         ↓
┌─────────────────┐
│ Axios           │
│ (HTTP Client)   │
└────────┬────────┘
         │ adds auth token
         ↓
┌─────────────────┐
│ Backend API     │
│ (Server)        │
└─────────────────┘
```

---

## 🔐 Axios Configuration (`lib/axios.ts`)

The services use a configured Axios instance with:

### 1. **Base URL**
```typescript
baseURL: '/api'
// All requests go to /api/... which proxies to backend
```

### 2. **Request Interceptor** (adds auth token)
```typescript
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```
**What it does:** Automatically adds JWT token to every request

### 3. **Response Interceptor** (handles 401 errors)
```typescript
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Unauthorized - clear auth and redirect to login
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
```
**What it does:** Auto-logout when token expires or is invalid

---

## 💡 Benefits of This Architecture

### ✅ Easy to Test
```typescript
// Mock the service in tests
jest.mock('../services/applications.api');
applicationsService.list.mockResolvedValue([mockApp1, mockApp2]);
```

### ✅ Easy to Update
```typescript
// Need to change an endpoint? Update in one place
// Before: POST /api/applications
// After:  POST /api/v2/applications
// Change it once in applications.api.ts, all components still work
```

### ✅ Easy to Debug
```typescript
// Add logging in one place
export const applicationsService = {
  create: async (data) => {
    console.log('Creating application:', data);
    const response = await api.post('/applications', data);
    console.log('Response:', response.data);
    return response.data;
  }
}
```

### ✅ Type Safety
```typescript
// TypeScript knows the return type
const app: Application = await applicationsService.create(data);
//    ^--- TypeScript autocomplete works here!
```

---

## 🎯 When Components Use Services

### LoginPage Example:
```typescript
const LoginPage = () => {
  const handleLogin = async (email, password) => {
    try {
      // Call auth API service
      const response = await authService.login(email, password);
      
      // Store token and user
      localStorage.setItem('token', response.token);
      
      // Redirect to dashboard
      navigate('/dashboard');
    } catch (error) {
      // Show error message
      setError('Login failed');
    }
  };
  
  return <form onSubmit={handleLogin}>...</form>;
};
```

### ApplicationsPage Example:
```typescript
const ApplicationsPage = () => {
  const [apps, setApps] = useState([]);
  
  useEffect(() => {
    // Call applications API service on mount
    const loadApps = async () => {
      const data = await applicationsService.list();
      setApps(data);
    };
    loadApps();
  }, []);
  
  const handleDelete = async (id) => {
    // Call delete API service
    await applicationsService.delete(id);
    
    // Refresh list
    const data = await applicationsService.list();
    setApps(data);
  };
  
  return apps.map(app => <ApplicationCard onDelete={handleDelete} />);
};
```

---

## 🔑 Key Takeaways

1. **Services = API Communication Layer**
   - Components don't make HTTP requests directly
   - Services handle all backend communication

2. **Single Responsibility**
   - `auth.api.ts` = Authentication only
   - `applications.api.ts` = Applications only
   - `generations.api.ts` = Generations only
   - `interviews.api.ts` = Interviews only

3. **Type-Safe**
   - Input and output types defined
   - TypeScript catches errors at compile time

4. **Centralized**
   - One place to update endpoints
   - One place to add logging/debugging
   - One place for error handling

5. **Reusable**
   - Any component can use any service
   - No code duplication

---

## 📚 Summary

**API Services are the middlemen between your UI and backend.** They:
- Make HTTP requests using Axios
- Add authentication tokens automatically
- Handle errors consistently
- Provide type-safe functions for components
- Keep your code clean and organized

Without services, every component would need to:
- Import axios
- Know all API endpoints
- Handle auth tokens manually
- Duplicate error handling
- Write the same code repeatedly

With services, components just call simple functions like:
```typescript
const apps = await applicationsService.list();
const generation = await generationsService.create(data);
const questions = await interviewsService.generateQuestions(data);
```

Clean, simple, maintainable! 🎉
