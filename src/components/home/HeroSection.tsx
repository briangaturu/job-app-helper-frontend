import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '../ui/Button';

export const HeroSection = () => {
  return (
    <div className="relative bg-gradient-to-br from-primary-50 via-white to-primary-50 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="flex items-center justify-center mb-6">
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-primary-100 text-primary-800 text-sm font-medium">
              <Sparkles className="h-4 w-4 mr-2" />
              AI-Powered Job Search Assistant
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Land Your Dream Job
            <br />
            <span className="text-primary-600">10x Faster</span>
          </h1>

          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            From tailored application materials to interview prep—all powered by AI. 
            Paste a job posting and get everything you need to apply in seconds.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/register">
              <Button size="lg" className="flex items-center gap-2">
                Get Started Free
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="secondary">
                Sign In
              </Button>
            </Link>
          </div>

          <p className="mt-6 text-sm text-gray-500">
            No credit card required • Free forever plan available
          </p>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-primary-600 mb-2">10x</div>
            <div className="text-gray-600">Faster Applications</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary-600 mb-2">AI</div>
            <div className="text-gray-600">Powered Analysis</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary-600 mb-2">100%</div>
            <div className="text-gray-600">ATS Optimized</div>
          </div>
        </div>
      </div>
    </div>
  );
};
