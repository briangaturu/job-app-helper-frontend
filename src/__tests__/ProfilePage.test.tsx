import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';

import { ProfilePage } from '../pages/ProfilePage';
import * as profileApi from '../services/profile.api';
import { useAuthStore } from '../store/authStore';

vi.mock('../services/profile.api');

describe('ProfilePage', () => {
  beforeEach(() => {
    // provide a logged-in user in the auth store
    useAuthStore.setState({
      user: {
        id: 1,
        name: 'Test User',
        email: 't@test.com',
        plan: 'free',
        dailyGenerationCount: 0,
        usageResetAt: '2026-09-16',
        createdAt: '2026-09-16T00:00:00.000Z',
      },
      token: 'tok',
      isAuthenticated: true,
      login: () => {},
      logout: () => {},
      initialize: () => {},
    });
    vi.mocked(profileApi.profileService.get).mockResolvedValue({ profile: {} });
    vi.mocked(profileApi.profileService.update).mockResolvedValue({
      id: 1,
      name: 'Test User',
      email: 't@test.com',
      profile: { headline: 'Dev', certifications: ['Cert A'] },
    });
  });

  it('saves profile when clicking Save Profile', async () => {
    render(
      <MemoryRouter>
        <ProfilePage />
      </MemoryRouter>
    );

    const headline = await screen.findByLabelText(/Headline/i);
    await userEvent.clear(headline);
    await userEvent.type(headline, 'Developer');

    const save = screen.getByRole('button', { name: /Save Profile/i });
    await userEvent.click(save);

    expect(profileApi.profileService.update).toHaveBeenCalled();
  });
});
