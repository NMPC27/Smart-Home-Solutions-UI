import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import '@testing-library/jest-dom'; // Importing jest-dom matchers
import LightsDialog from '../../src/components/Building/LightsDialog';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

// Mock the useDebounce hook
vi.mock('use-debounce', () => ({
  useDebounce: (value) => [value],
}));

const mockProps = {
  openDialog: true,
  handleCloseDialog: vi.fn(),
  handleLightColor: vi.fn(),
  handleBrightnessChange: vi.fn(),
  handleLightOnOff: vi.fn(),
  devices: [
    {
      id: '1',
      name: 'Living Room Light',
      type: 'Lights',
      color: '#FF0000',
      brightness: 50,
      on: true,
    },
  ],
  deviceID: '1',
};

describe('LightsDialog Component', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <LightsDialog {...mockProps} />
      </MemoryRouter>
    );
  });

  it('renders the dialog with light color and brightness controls', async () => {
    await waitFor(() => expect(screen.getByText('Living Room Light Light')).toBeInTheDocument());
    expect(screen.getByText('Color')).toBeInTheDocument();
    expect(screen.getByText('Brightness')).toBeInTheDocument();
  });

  it('calls handleCloseDialog when the close icon is clicked', () => {
    fireEvent.click(screen.getByTestId('CloseIcon'));
    expect(mockProps.handleCloseDialog).toHaveBeenCalled();
  });

  it('toggles light on and off when the power button is clicked', () => {
    fireEvent.click(screen.getByTestId('PowerSettingsNewIcon'));
    expect(mockProps.handleLightOnOff).toHaveBeenCalledWith(0);
  });

});
