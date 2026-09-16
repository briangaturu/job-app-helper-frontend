import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Briefcase } from 'lucide-react';
import { authService } from '../services/auth.api';
import { useAuthStore } from '../store/authStore';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';

interface LoginFormData {
  email: string;
  password: string;
}

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const [error, setError] = useState('');
  
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    try {
      setError('');
      const response = await authService.login(data.email, data.password);
      login(response.token, response.user);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <div className="flex items-center justify-center mb-8">
          <Briefcase className="h-12 w-12 text-primary-600 mr-2" />
          <h1 className="text-3xl font-bold text-gray-900">Job Helper</h1>
        </div>

        <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
          Welcome Back
        </h2>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-3 mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Email"
            type="email"
            {...register('email', { 
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address'
              }
            })}
            error={errors.email?.message}
            placeholder="your@email.com"
          />

          <Input
            label="Password"
            type="password"
            {...register('password', { 
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters'
              }
            })}
            error={errors.password?.message}
            placeholder="••••••••"
          />

          <Button
            type="submit"
            className="w-full"
            isLoading={isSubmitting}
          >
            Sign In
          </Button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          Don't have an account?{' '}
          <Link to="/register" className="text-primary-600 hover:text-primary-700 font-medium">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};
