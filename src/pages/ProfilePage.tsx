import { useEffect, useState } from 'react';
import { Layout } from '../components/layout/Layout';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Textarea } from '../components/ui/Textarea';
import { profileService } from '../services/profile.api';
import { useAuthStore } from '../store/authStore';

export const ProfilePage = () => {
  const { user, token, login } = useAuthStore();
  const [headline, setHeadline] = useState('');
  const [bio, setBio] = useState('');
  const [location, setLocation] = useState('');
  const [certs, setCerts] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await profileService.get();
        const profile = data.profile || {};
        setHeadline(profile.headline || '');
        setBio(profile.bio || '');
        setLocation(profile.location || '');
        setCerts((profile.certifications || []).join(', '));
      } catch (err) {
        // fallback to auth store
        const profile = user?.profile || {};
        setHeadline(profile.headline || '');
        setBio(profile.bio || '');
        setLocation(profile.location || '');
        setCerts((profile.certifications || []).join(', '));
      }
    };
    load();
  }, [user]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const profile = {
        headline: headline.trim(),
        bio: bio.trim(),
        location: location.trim(),
        certifications: certs.split(',').map((s) => s.trim()).filter(Boolean),
      };

      const updated = await profileService.update(profile);

      // update auth store user
      if (token) {
        login(token, { ...(user || {}), ...updated });
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto py-8">
        <h1 className="text-2xl font-bold mb-4">Profile</h1>
        <div className="space-y-4">
          <Input label="Headline" value={headline} onChange={(e) => setHeadline(e.target.value)} />
          <Input label="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
          <Textarea label="Bio" value={bio} onChange={(e) => setBio(e.target.value)} />
          <Input
            label="Certifications (comma separated)"
            value={certs}
            onChange={(e) => setCerts(e.target.value)}
          />
          <div>
            <Button onClick={handleSave} disabled={saving}>
              {saving ? 'Saving...' : 'Save Profile'}
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;
