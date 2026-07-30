import { useEffect, useState } from 'react';
import { Plus, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { GenerationCard } from '../components/generations/GenerationCard';
import { GenerationForm } from '../components/generations/GenerationForm';
import { Modal } from '../components/ui/Modal';
import { Button } from '../components/ui/Button';
import { generationsService } from '../services/generations.api';
import { applicationsService } from '../services/applications.api';
import { Generation } from '../types';
import { useAuthStore } from '../store/authStore';

export const GenerationsPage = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [generations, setGenerations] = useState<Generation[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState<string>('');

  const generationsLeft = user?.plan === 'pro' 
    ? 'Unlimited' 
    : Math.max(0, 2 - (user?.dailyGenerationCount || 0));

  useEffect(() => {
    loadGenerations();
  }, []);

  const loadGenerations = async () => {
    try {
      const data = await generationsService.list();
      setGenerations(data);
    } catch (error) {
      console.error('Failed to load generations:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (data: { jobTitle?: string; jobText: string }) => {
    setError('');
    try {
      await generationsService.create(data);
      await loadGenerations();
      setIsModalOpen(false);
    } catch (error: any) {
      console.error('Failed to create generation:', error);
      
      // Handle specific error codes
      if (error.response?.status === 429) {
        setError(
          error.response?.data?.message || 
          '⚠️ Daily limit reached. You can generate 2 times per day on the free plan. Upgrade to Pro for unlimited generations!'
        );
      } else {
        const errorMessage = error.response?.data?.message || 
                            error.response?.data?.issues?.[0]?.message ||
                            'Failed to create generation. Please try again.';
        setError(errorMessage);
      }
      // Don't re-throw, just show the error message
    }
  };

  const handleCreateApplication = async (generation: Generation) => {
    try {
      const app = await applicationsService.create({
        jobTitle: generation.jobTitle || 'Untitled',
        jobText: generation.jobText,
        generationId: generation.id,
        status: 'saved',
      });
      navigate(`/applications`);
    } catch (error) {
      console.error('Failed to create application:', error);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">Loading generations...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Generations</h1>
            <p className="text-gray-600">AI-powered cover letters and resume tips</p>
          </div>
          <div className="flex items-center gap-4">
            {user?.plan === 'free' && (
              <div className="text-sm text-gray-600 bg-gray-100 px-4 py-2 rounded-lg">
                <span className="font-semibold">{generationsLeft}/2</span> left today
              </div>
            )}
            <Button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              New Generation
            </Button>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-4">
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}

        <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Sparkles className="h-5 w-5 text-primary-600 mt-0.5" />
            <div>
              <p className="text-sm text-primary-900 font-medium">AI-Powered Analysis</p>
              <p className="text-sm text-primary-700">
                Our AI analyzes job descriptions to generate tailored cover letters, 
                resume tips, and match scores to help you stand out.
              </p>
            </div>
          </div>
        </div>

        {generations.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <Sparkles className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No generations yet</h3>
            <p className="text-gray-600 mb-4">
              Start by generating AI-powered content for a job posting
            </p>
            <Button onClick={() => setIsModalOpen(true)}>
              Create Generation
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {generations.map((gen) => (
              <GenerationCard
                key={gen.id}
                generation={gen}
                onCreateApplication={handleCreateApplication}
              />
            ))}
          </div>
        )}

        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Generate AI Content"
        >
          <GenerationForm
            onSubmit={handleCreate}
            onCancel={() => setIsModalOpen(false)}
          />
        </Modal>
      </div>
    </Layout>
  );
};
