import { useState } from 'react';
import { Shield, ArrowLeft, Sparkles } from 'lucide-react';
import { Layout } from '../components/layout/Layout';
import { FileUpload } from '../components/cv-checker/FileUpload';
import { ATSResults } from '../components/cv-checker/ATSResults';
import { Button } from '../components/ui/Button';
import { CoverLetterActions } from '../components/generations/coverLetterActions';
import { cvCheckerService, CVCheckResponse } from '../services/cv-checker.api';

export const CVCheckerPage = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [result, setResult] = useState<CVCheckResponse | null>(null);
  const [error, setError] = useState<string>('');

  const [isImproving, setIsImproving] = useState(false);
  const [improvedCv, setImprovedCv] = useState<string | null>(null);
  const [improveError, setImproveError] = useState<string>('');

  const handleFileSelect = async (file: File) => {
    setIsUploading(true);
    setError('');

    try {
      const response = await cvCheckerService.checkCV(file);
      setResult(response);
    } catch (err: any) {
      console.error('CV check error:', err);
      setError(
        err.response?.data?.message || 
        'Failed to analyze CV. Please try again.'
      );
    } finally {
      setIsUploading(false);
    }
  };

  const handleImprove = async () => {
    if (!result) return;

    setIsImproving(true);
    setImproveError('');

    try {
      const response = await cvCheckerService.improveCV(result.id);
setImprovedCv(response.improvedCv);
    } catch (err: any) {
      console.error('CV improvement error:', err);
      setImproveError(
        err.response?.data?.message ||
        'Failed to generate an improved CV. Please try again.'
      );
    } finally {
      setIsImproving(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setError('');
    setImprovedCv(null);
    setImproveError('');
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              ATS CV Checker
            </h1>
            <p className="text-gray-600">
              Check if your CV is optimized for Applicant Tracking Systems
            </p>
          </div>
          <Shield className="h-12 w-12 text-primary-600" />
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-blue-900 mb-2">
            What is ATS?
          </h3>
          <p className="text-sm text-blue-800">
            Applicant Tracking Systems (ATS) are software used by 98% of Fortune 500 
            companies to filter resumes. Our AI analyzes your CV to ensure it passes 
            ATS filters and reaches human recruiters.
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        {!result ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <FileUpload
              onFileSelect={handleFileSelect}
              isUploading={isUploading}
            />

            <div className="mt-8 space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">
                What We Check:
              </h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  'Standard section headings',
                  'Clean formatting',
                  'Relevant keywords',
                  'Contact information',
                  'Work experience structure',
                  'Skills section',
                  'Education details',
                  'File readability',
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-gray-700">
                    <span className="text-primary-600">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <>
            <Button
              variant="ghost"
              onClick={handleReset}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Check Another CV
            </Button>
            <ATSResults
              analysis={result.analysis}
              fileName={result.fileName}
            />

            {!improvedCv ? (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
                <Sparkles className="h-8 w-8 text-primary-600 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Want a more ATS-friendly version?
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  We'll rewrite your CV to fix the weaknesses above, using only the
                  experience you already listed — nothing invented.
                </p>
                {improveError && (
                  <p className="text-sm text-red-800 mb-3">{improveError}</p>
                )}
                <Button
                  onClick={handleImprove}
                  isLoading={isImproving}
                  className="flex items-center gap-2 mx-auto"
                >
                  <Sparkles className="h-4 w-4" />
                  Generate ATS-Optimized CV
                </Button>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Optimized CV
                  </h3>
                  <CoverLetterActions
                    coverLetter={improvedCv}
                    jobTitle={result.fileName.replace(/\.[^/.]+$/, '')}
                  />
                </div>
                <pre className="whitespace-pre-wrap text-sm text-gray-700 font-sans">
                  {improvedCv}
                </pre>
              </div>
            )}
          </>
        )}
      </div>
    </Layout>
  );
};