import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

import { ProfilePage } from '../pages/ProfilePage';
import * as profileApi from '../services/profile.api';
import { useAuthStore } from '../store/authStore';

vi.mock('../services/profile.api');

describe('ProfilePage', () => {
  beforeEach(() => {
    // provide a logged-in user in the auth store
    useAuthStore.setState({
      user: { id: 1, name: 'Test User', email: 't@test.com', plan: 'free' },
      token: 'tok',
      isAuthenticated: true,
      login: () => {},
      logout: () => {},
      initialize: () => {},
    });
    (profileApi.profileService.get as vi.Mock).mockResolvedValue({ profile: {} });
    (profileApi.profileService.update as vi.Mock).mockResolvedValue({
      id: 1,
      name: 'Test User',
      email: 't@test.com',
      profile: { headline: 'Dev', certifications: ['Cert A'] },
    });
  });

  it('saves profile when clicking Save Profile', async () => {
    render(<ProfilePage />);

    const headline = await screen.findByLabelText(/Headline/i);
    await userEvent.clear(headline);
    await userEvent.type(headline, 'Developer');

    const save = screen.getByRole('button', { name: /Save Profile/i });
    await userEvent.click(save);

    expect(profileApi.profileService.update).toHaveBeenCalled();
  });
});
