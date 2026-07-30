import { useState } from 'react';
import { MessageSquare, Send } from 'lucide-react';
import { InterviewQuestion } from '../../types';
import { Button } from '../ui/Button';
import { Textarea } from '../ui/Textarea';

interface InterviewQuestionCardProps {
  question: InterviewQuestion;
  onSubmitAnswer: (questionId: number, answer: string) => Promise<void>;
}

export const InterviewQuestionCard = ({ question, onSubmitAnswer }: InterviewQuestionCardProps) => {
  const [answer, setAnswer] = useState(question.userAnswer || '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!answer.trim()) return;
    
    setIsSubmitting(true);
    try {
      await onSubmitAnswer(question.id, answer);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-start gap-3 mb-4">
        <MessageSquare className="h-5 w-5 text-primary-600 mt-1" />
        <div className="flex-1">
          <p className="text-gray-900 font-medium">{question.question}</p>
        </div>
      </div>

      <div className="space-y-4">
        <Textarea
          label="Your Answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          rows={4}
          placeholder="Type your answer here..."
          disabled={!!question.feedback}
        />

        {!question.feedback && (
          <Button
            onClick={handleSubmit}
            isLoading={isSubmitting}
            disabled={!answer.trim()}
            className="flex items-center gap-2"
          >
            <Send className="h-4 w-4" />
            Submit Answer
          </Button>
        )}

        {question.feedback && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-sm font-medium text-green-900 mb-2">AI Feedback:</p>
            <p className="text-sm text-green-800">{question.feedback}</p>
          </div>
        )}
      </div>
    </div>
  );
};
