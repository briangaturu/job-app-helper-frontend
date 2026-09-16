import { useEffect, useState } from 'react';
import { Plus, Search, Briefcase } from 'lucide-react';
import { Layout } from '../components/layout/Layout';
import { ApplicationCard } from '../components/applications/ApplicationCard';
import { ApplicationForm } from '../components/applications/ApplicationForm';
import { Modal } from '../components/ui/Modal';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { applicationsService } from '../services/applications.api';
import { Application } from '../types';
import { useNavigate } from 'react-router-dom';

export const ApplicationsPage = () => {
  const navigate = useNavigate();
  const [applications, setApplications] = useState<Application[]>([]);
  const [filteredApps, setFilteredApps] = useState<Application[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingApp, setEditingApp] = useState<Application | undefined>();
  const [selectedApp, setSelectedApp] = useState<Application | undefined>();

  useEffect(() => {
    loadApplications();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredApps(applications);
    } else {
      const query = searchQuery.toLowerCase();
      setFilteredApps(
        applications.filter(
          (app) =>
            app.jobTitle.toLowerCase().includes(query) ||
            app.company?.toLowerCase().includes(query) ||
            app.status.toLowerCase().includes(query)
        )
      );
    }
  }, [searchQuery, applications]);

  const loadApplications = async () => {
    try {
      const data = await applicationsService.list();
      setApplications(data);
      setFilteredApps(data);
    } catch (error) {
      console.error('Failed to load applications:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (data: any) => {
    try {
      await applicationsService.create(data);
      await loadApplications();
      setIsModalOpen(false);
    } catch (error) {
      console.error('Failed to create application:', error);
      throw error;
    }
  };

  const handleUpdate = async (data: any) => {
    if (!editingApp) return;
    try {
      await applicationsService.update(editingApp.id, data);
      await loadApplications();
      setIsModalOpen(false);
      setEditingApp(undefined);
    } catch (error) {
      console.error('Failed to update application:', error);
      throw error;
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this application?')) return;
    try {
      await applicationsService.delete(id);
      await loadApplications();
    } catch (error) {
      console.error('Failed to delete application:', error);
    }
  };

  const handleEdit = (app: Application) => {
    setEditingApp(app);
    setIsModalOpen(true);
  };

  const handleView = (app: Application) => {
    setSelectedApp(app);
  };

  const handleInterview = (app: Application) => {
    navigate(`/interviews/${app.id}`);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingApp(undefined);
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">Loading applications...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Applications</h1>
            <p className="text-gray-600">Manage and track your job applications</p>
          </div>
          <Button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            New Application
          </Button>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            placeholder="Search by job title, company, or status..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {filteredApps.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {searchQuery ? 'No applications found' : 'No applications yet'}
            </h3>
            <p className="text-gray-600 mb-4">
              {searchQuery 
                ? 'Try adjusting your search query' 
                : 'Start by creating your first job application'}
            </p>
            {!searchQuery && (
              <Button onClick={() => setIsModalOpen(true)}>
                Create Application
              </Button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredApps.map((app) => (
              <ApplicationCard
                key={app.id}
                application={app}
                onView={handleView}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onInterview={handleInterview}
              />
            ))}
          </div>
        )}

        <Modal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          title={editingApp ? 'Edit Application' : 'New Application'}
        >
          <ApplicationForm
            application={editingApp}
            onSubmit={editingApp ? handleUpdate : handleCreate}
            onCancel={handleModalClose}
          />
        </Modal>

        <Modal
          isOpen={Boolean(selectedApp)}
          onClose={() => setSelectedApp(undefined)}
          title={selectedApp?.jobTitle || 'Application Details'}
        >
          {selectedApp && (
            <div className="space-y-5">
              <div className="flex flex-wrap items-center gap-3">
                {selectedApp.company && (
                  <p className="text-gray-600">{selectedApp.company}</p>
                )}
                <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-800 text-xs font-medium uppercase">
                  {selectedApp.status}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium text-gray-500">Created</p>
                  <p className="text-gray-900">{new Date(selectedApp.createdAt).toLocaleString()}</p>
                </div>
                <div>
                  <p className="font-medium text-gray-500">Last updated</p>
                  <p className="text-gray-900">{new Date(selectedApp.updatedAt).toLocaleString()}</p>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Job Description</h4>
                <p className="whitespace-pre-wrap text-sm text-gray-700">
                  {selectedApp.jobText || 'No job description added.'}
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Notes</h4>
                <p className="whitespace-pre-wrap text-sm text-gray-700">
                  {selectedApp.notes || 'No notes added.'}
                </p>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </Layout>
  );
};
