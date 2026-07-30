import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '../ui/Button';

export const CTASection = () => {
  return (
    <div className="py-20 bg-gradient-to-br from-primary-600 to-primary-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Ready to Transform Your Job Search?
        </h2>
        <p className="text-xl text-primary-100 mb-8 max-w-3xl mx-auto">
          Join thousands of job seekers who are landing interviews faster with AI-powered tools
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Link to="/register">
            <Button
              size="lg"
              variant="secondary"
              className="flex items-center gap-2 bg-white text-primary-600 hover:bg-gray-100"
            >
              Start Free Today
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center text-primary-100">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            <span>No credit card required</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            <span>Free forever plan</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            <span>Setup in 30 seconds</span>
          </div>
        </div>
      </div>
    </div>
  );
};
