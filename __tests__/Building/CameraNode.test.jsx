// CameraNode.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom'; // Importing jest-dom matchers
import CameraNode from '../../src/components/Building/CameraNode';
import React from 'react';

// Mock useReactFlow hook
vi.mock('reactflow', () => ({
  useReactFlow: () => ({
    deleteElements: vi.fn(),
  }),
}));

const mockProps = {
  id: '1',
  data: {
    openDialog: vi.fn(),
    on: true,
    name: 'Camera Node',
  },
};

describe('CameraNode Component', () => {
  it('renders the camera icon and name', () => {
    render(<CameraNode {...mockProps} />);
    expect(screen.getByText('Camera Node')).toBeInTheDocument();
    expect(screen.getByTestId('VideocamIcon')).toBeInTheDocument();
  });

  it('calls openDialog with correct arguments when camera icon is clicked', () => {
    render(<CameraNode {...mockProps} />);
    fireEvent.click(screen.getByTestId('VideocamIcon'));
    expect(mockProps.data.openDialog).toHaveBeenCalledWith('1', 'Camera');
  });
});
