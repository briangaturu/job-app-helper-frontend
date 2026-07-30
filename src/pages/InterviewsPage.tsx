import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { Layout } from '../components/layout/Layout';
import { InterviewQuestionCard } from '../components/interviews/InterviewQuestionCard';
import { Button } from '../components/ui/Button';
import { interviewsService } from '../services/interviews.api';
import { applicationsService } from '../services/applications.api';
import { InterviewQuestion, Application } from '../types';

export const InterviewsPage = () => {
  const { applicationId } = useParams<{ applicationId: string }>();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<InterviewQuestion[]>([]);
  const [application, setApplication] = useState<Application | null>(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    if (applicationId) {
      loadData();
    }
  }, [applicationId]);

  const loadData = async () => {
    if (!applicationId) return;
    
    try {
      const [apps, qs] = await Promise.all([
        applicationsService.list(),
        interviewsService.listForApplication(Number(applicationId)),
      ]);
      
      const app = apps.find((a) => a.id === Number(applicationId));
      setApplication(app || null);
      setQuestions(qs);
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateQuestions = async () => {
    if (!applicationId) return;
    
    setGenerating(true);
    try {
      await interviewsService.generateQuestions({
        applicationId: Number(applicationId),
        count: 5,
      });
      await loadData();
    } catch (error) {
      console.error('Failed to generate questions:', error);
    } finally {
      setGenerating(false);
    }
  };

  const handleSubmitAnswer = async (questionId: number, answer: string) => {
    try {
      await interviewsService.submitAnswer({ questionId, userAnswer: answer });
      await loadData();
    } catch (error) {
      console.error('Failed to submit answer:', error);
      throw error;
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">Loading interview questions...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <Button
            variant="ghost"
            onClick={() => navigate('/applications')}
            className="mb-4 flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Applications
          </Button>
          
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Interview Practice</h1>
              {application && (
                <p className="text-gray-600">
                  {application.jobTitle} {application.company && `at ${application.company}`}
                </p>
              )}
            </div>
            
            {questions.length === 0 && (
              <Button
                onClick={handleGenerateQuestions}
                isLoading={generating}
                className="flex items-center gap-2"
              >
                <Sparkles className="h-5 w-5" />
                Generate Questions
              </Button>
            )}
          </div>
        </div>

        {questions.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <Sparkles className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No questions yet</h3>
            <p className="text-gray-600 mb-4">
              Generate AI-powered interview questions based on this job application
            </p>
            <Button
              onClick={handleGenerateQuestions}
              isLoading={generating}
              className="flex items-center gap-2"
            >
              <Sparkles className="h-5 w-5" />
              Generate Questions
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {questions.map((question) => (
              <InterviewQuestionCard
                key={question.id}
                question={question}
                onSubmitAnswer={handleSubmitAnswer}
              />
            ))}
            
            {questions.length > 0 && questions.every((q) => q.feedback) && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                <h3 className="text-lg font-semibold text-green-900 mb-2">
                  Great job! You've completed all questions.
                </h3>
                <p className="text-green-700 mb-4">
                  Review the feedback to improve your interview skills.
                </p>
                <Button onClick={handleGenerateQuestions} isLoading={generating}>
                  Generate More Questions
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};
