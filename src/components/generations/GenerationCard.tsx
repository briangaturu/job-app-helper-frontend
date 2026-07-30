import { Calendar, Sparkles, Plus } from 'lucide-react';
import { Generation } from '../../types';
import { Button } from '../ui/Button';
import { CoverLetterActions } from './coverLetterActions';
import { format } from 'date-fns';

interface GenerationCardProps {
  generation: Generation;
  onCreateApplication: (generation: Generation) => void;
}

export const GenerationCard = ({ generation, onCreateApplication }: GenerationCardProps) => {
  const output = generation.outputJson;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            {generation.jobTitle || 'Untitled Generation'}
          </h3>
          {generation.matchScore !== null && (
            <div className="flex items-center text-primary-600 text-sm mb-2">
              <Sparkles className="h-4 w-4 mr-1" />
              Match Score: {generation.matchScore}%
            </div>
          )}
        </div>
      </div>

      {output && (
        <div className="mb-4 space-y-2">
          {output.coverLetter && (
            <div>
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm font-medium text-gray-700">Cover Letter:</p>
                <CoverLetterActions
                  coverLetter={output.coverLetter}
                  jobTitle={generation.jobTitle}
                />
              </div>
              <p className="text-sm text-gray-600 line-clamp-3">{output.coverLetter}</p>
            </div>
          )}
          {output.resumeTips && Array.isArray(output.resumeTips) && output.resumeTips.length > 0 && (
            <div>
              <p className="text-sm font-medium text-gray-700">Resume Tips:</p>
              <ul className="list-disc list-inside text-sm text-gray-600">
                {output.resumeTips.slice(0, 2).map((tip: string, idx: number) => (
                  <li key={idx} className="line-clamp-1">{tip}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className="flex items-center text-gray-500 text-sm">
          <Calendar className="h-4 w-4 mr-1" />
          {format(new Date(generation.createdAt), 'MMM d, yyyy')}
        </div>
        <Button
          size="sm"
          onClick={() => onCreateApplication(generation)}
          className="flex items-center gap-1"
        >
          <Plus className="h-4 w-4" />
          Create Application
        </Button>
      </div>
    </div>
  );
};