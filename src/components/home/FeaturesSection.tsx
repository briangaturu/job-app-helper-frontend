import { Sparkles, Target, MessageSquare, BarChart, Shield, Zap } from 'lucide-react';

const features = [
  {
    icon: Sparkles,
    title: 'AI-Powered Generation',
    description: 'Generate tailored resume bullets, cover letters, and keyword lists in seconds using advanced AI.',
    color: 'bg-purple-100 text-purple-600',
  },
  {
    icon: Target,
    title: 'Match Score Analysis',
    description: 'Get a 0-100 score showing how well your experience matches the job requirements.',
    color: 'bg-blue-100 text-blue-600',
  },
  {
    icon: Shield,
    title: 'ATS-Optimized',
    description: 'All content is optimized to pass Applicant Tracking Systems used by 98% of companies.',
    color: 'bg-green-100 text-green-600',
  },
  {
    icon: BarChart,
    title: 'Application Tracking',
    description: 'Track every application with statuses, notes, and a visual pipeline of your job search.',
    color: 'bg-yellow-100 text-yellow-600',
  },
  {
    icon: MessageSquare,
    title: 'Interview Practice',
    description: 'AI generates realistic interview questions and provides feedback on your answers.',
    color: 'bg-red-100 text-red-600',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Get everything you need in seconds, not hours. Apply to more jobs in less time.',
    color: 'bg-indigo-100 text-indigo-600',
  },
];

export const FeaturesSection = () => {
  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Everything You Need to Succeed
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Powerful features designed to give you the competitive edge in your job search
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="p-6 rounded-lg border border-gray-200 hover:border-primary-300 hover:shadow-md transition-all"
            >
              <div className={`inline-flex p-3 rounded-lg ${feature.color} mb-4`}>
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
