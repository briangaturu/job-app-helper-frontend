import { useForm } from 'react-hook-form';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { Button } from '../ui/Button';

interface GenerationFormData {
  jobTitle?: string;
  jobText: string;
}

interface GenerationFormProps {
  onSubmit: (data: GenerationFormData) => Promise<void>;
  onCancel: () => void;
}

export const GenerationForm = ({ onSubmit, onCancel }: GenerationFormProps) => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<GenerationFormData>();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label="Job Title (optional)"
        {...register('jobTitle')}
        placeholder="e.g., Senior Software Engineer"
      />

      <Textarea
        label="Job Description *"
        {...register('jobText', { 
          required: 'Job description is required',
          minLength: {
            value: 50,
            message: 'Please paste the full job description (at least 50 characters)'
          },
          maxLength: {
            value: 8000,
            message: 'Job description is too long (maximum 8000 characters)'
          }
        })}
        error={errors.jobText?.message}
        rows={10}
        placeholder="Paste the full job description here (minimum 50 characters)..."
      />

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          <strong>Note:</strong> Our AI will analyze the job description and generate a tailored cover letter, 
          resume tips, and match score to help you stand out.
        </p>
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          isLoading={isSubmitting}
        >
          Generate Analysis
        </Button>
      </div>
    </form>
  );
};
