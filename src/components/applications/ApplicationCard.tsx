import { Building2, Calendar, Trash2, Edit, MessageSquare } from 'lucide-react';
import { Application } from '../../types';
import { Button } from '../ui/Button';
import { format } from 'date-fns';

interface ApplicationCardProps {
  application: Application;
  onEdit: (application: Application) => void;
  onDelete: (id: number) => void;
  onInterview: (application: Application) => void;
}

export const ApplicationCard = ({ 
  application, 
  onEdit, 
  onDelete,
  onInterview 
}: ApplicationCardProps) => {
  const statusColors = {
    saved: 'bg-gray-100 text-gray-800',
    applied: 'bg-blue-100 text-blue-800',
    interviewing: 'bg-yellow-100 text-yellow-800',
    offer: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800',
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            {application.jobTitle}
          </h3>
          {application.company && (
            <div className="flex items-center text-gray-600 text-sm mb-2">
              <Building2 className="h-4 w-4 mr-1" />
              {application.company}
            </div>
          )}
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[application.status]}`}>
          {application.status.toUpperCase()}
        </span>
      </div>

      {application.notes && (
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {application.notes}
        </p>
      )}

      <div className="flex items-center text-gray-500 text-sm mb-4">
        <Calendar className="h-4 w-4 mr-1" />
        Updated: {format(new Date(application.updatedAt), 'MMM d, yyyy')}
      </div>

      <div className="flex gap-2">
        <Button
          size="sm"
          variant="secondary"
          onClick={() => onEdit(application)}
          className="flex items-center gap-1"
        >
          <Edit className="h-4 w-4" />
          Edit
        </Button>
        <Button
          size="sm"
          variant="secondary"
          onClick={() => onInterview(application)}
          className="flex items-center gap-1"
        >
          <MessageSquare className="h-4 w-4" />
          Interview
        </Button>
        <Button
          size="sm"
          variant="danger"
          onClick={() => onDelete(application.id)}
          className="flex items-center gap-1"
        >
          <Trash2 className="h-4 w-4" />
          Delete
        </Button>
      </div>
    </div>
  );
};
