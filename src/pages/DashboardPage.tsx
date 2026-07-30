import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Briefcase, 
  FileText, 
  MessageSquare, 
  Target, 
  TrendingUp,
  Clock
} from 'lucide-react';
import { Layout } from '../components/layout/Layout';
import { StatsCard } from '../components/applications/StatsCard';
import { Button } from '../components/ui/Button';
import { applicationsService } from '../services/applications.api';
import { ApplicationStats } from '../types';

export const DashboardPage = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState<ApplicationStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const data = await applicationsService.getStats();
      setStats(data);
    } catch (error) {
      console.error('Failed to load stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">Loading...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Track your job application journey</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatsCard
            title="Total Applications"
            value={stats?.total || 0}
            icon={<Briefcase className="h-6 w-6 text-white" />}
            color="bg-primary-600"
          />
          <StatsCard
            title="Applied"
            value={stats?.applied || 0}
            icon={<FileText className="h-6 w-6 text-white" />}
            color="bg-blue-600"
          />
          <StatsCard
            title="Interviewing"
            value={stats?.interviewing || 0}
            icon={<MessageSquare className="h-6 w-6 text-white" />}
            color="bg-yellow-600"
          />
          <StatsCard
            title="Offers"
            value={stats?.offer || 0}
            icon={<Target className="h-6 w-6 text-white" />}
            color="bg-green-600"
          />
          <StatsCard
            title="Saved"
            value={stats?.saved || 0}
            icon={<Clock className="h-6 w-6 text-white" />}
            color="bg-gray-600"
          />
          <StatsCard
            title="Rejected"
            value={stats?.rejected || 0}
            icon={<TrendingUp className="h-6 w-6 text-white" />}
            color="bg-red-600"
          />
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button
              onClick={() => navigate('/applications')}
              className="h-24 flex flex-col items-center justify-center gap-2"
            >
              <Briefcase className="h-8 w-8" />
              <span>View Applications</span>
            </Button>
            <Button
              onClick={() => navigate('/generations')}
              className="h-24 flex flex-col items-center justify-center gap-2"
              variant="secondary"
            >
              <FileText className="h-8 w-8" />
              <span>Generate Content</span>
            </Button>
            <Button
              onClick={() => navigate('/applications')}
              className="h-24 flex flex-col items-center justify-center gap-2"
              variant="secondary"
            >
              <MessageSquare className="h-8 w-8" />
              <span>Practice Interview</span>
            </Button>
          </div>
        </div>

        <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg shadow-sm p-8 text-white">
          <h2 className="text-2xl font-semibold mb-2">Welcome to Job Application Helper!</h2>
          <p className="text-primary-100 mb-4">
            Streamline your job search with AI-powered tools. Generate tailored cover letters, 
            track applications, and practice interviews all in one place.
          </p>
          <Button
            variant="secondary"
            onClick={() => navigate('/generations')}
          >
            Get Started
          </Button>
        </div>
      </div>
    </Layout>
  );
};
