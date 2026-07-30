import { useForm } from 'react-hook-form';
import { Application } from '../../types';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';

interface ApplicationFormProps {
  application?: Application;
  onSubmit: (data: any) => Promise<void>;
  onCancel: () => void;
}

export const ApplicationForm = ({ application, onSubmit, onCancel }: ApplicationFormProps) => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    defaultValues: {
      company: application?.company || '',
      jobTitle: application?.jobTitle || '',
      jobText: application?.jobText || '',
      status: application?.status || 'saved',
      notes: application?.notes || '',
    }
  });

  const statusOptions = [
    { value: 'saved', label: 'Saved' },
    { value: 'applied', label: 'Applied' },
    { value: 'interviewing', label: 'Interviewing' },
    { value: 'offer', label: 'Offer' },
    { value: 'rejected', label: 'Rejected' },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label="Company"
        {...register('company')}
        placeholder="e.g., Google"
      />

      <Input
        label="Job Title *"
        {...register('jobTitle', { required: 'Job title is required' })}
        error={errors.jobTitle?.message}
        placeholder="e.g., Senior Software Engineer"
      />

      <Textarea
        label="Job Description"
        {...register('jobText')}
        rows={6}
        placeholder="Paste the full job description here..."
      />

      <Select
        label="Status"
        {...register('status')}
        options={statusOptions}
      />

      <Textarea
        label="Notes"
        {...register('notes')}
        rows={4}
        placeholder="Add any notes or reminders..."
      />

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
          {application ? 'Update' : 'Create'} Application
        </Button>
      </div>
    </form>
  );
};
