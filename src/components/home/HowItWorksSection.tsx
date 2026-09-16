import { FileText, Sparkles, FolderOpen, MessageSquare, BarChart } from 'lucide-react';

const steps = [
  {
    icon: FileText,
    number: '1',
    title: 'Sign Up & Log In',
    description: 'Create your free account in seconds. No credit card required to get started.',
  },
  {
    icon: Sparkles,
    number: '2',
    title: 'Paste a Job Posting',
    description: 'Copy the job description from LinkedIn, company sites, or anywhere. Hit generate and watch the magic happen.',
  },
  {
    icon: FileText,
    number: '3',
    title: 'Get Instant Materials',
    description: 'Within seconds, receive ATS-friendly resume bullets, a tailored cover letter, keyword highlights, and a match score (0-100).',
  },
  {
    icon: FolderOpen,
    number: '4',
    title: 'Track Your Applications',
    description: 'Save jobs to your case file with company names and status tracking: Saved, Applied, Interviewing, Offer, or Rejected.',
  },
  {
    icon: MessageSquare,
    number: '5',
    title: 'Practice Interviews',
    description: 'Generate 6 likely interview questions based on the job. Type your answers and get instant AI feedback to improve.',
  },
  {
    icon: BarChart,
    number: '6',
    title: 'Manage Your Pipeline',
    description: 'Your dashboard shows every application, current status, private notes, and stage counts—your entire job search at a glance.',
  },
];

export const HowItWorksSection = () => {
  return (
    <div className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From job posting to offer letter—streamline your entire job search process with AI
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div
              key={step.number}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-full bg-primary-100">
                  <step.icon className="h-6 w-6 text-primary-600" />
                </div>
                <span className="text-5xl font-bold text-primary-100">{step.number}</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
              <p className="text-gray-600 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>

        {/* Bottom Summary */}
        <div className="mt-16 bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-8 md:p-12 text-white text-center">
          <h3 className="text-3xl font-bold mb-4">
            Paste a Job → Get Materials → Track It → Prep Interview
          </h3>
          <p className="text-xl text-primary-100 mb-6">
            Everything you need to land your next job, all in one place
          </p>
        </div>
      </div>
    </div>
  );
};
