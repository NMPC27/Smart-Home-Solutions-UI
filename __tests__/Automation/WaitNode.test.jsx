// WaitNode.test.jsx

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import React from 'react';
import WaitNode from '../../src/components/Automation/WaitNode';
import { ReactFlowProvider } from 'reactflow';
import '@testing-library/jest-dom';

describe('WaitNode Component', () => {
  let mockEditData, mockClearNodeData, mockDeleteElements;

  beforeEach(() => {
    mockEditData = vi.fn();
    mockClearNodeData = vi.fn();
    mockDeleteElements = vi.fn();
  });

  const renderWithProvider = (props) => {
    return render(
      <ReactFlowProvider>
        <WaitNode {...props} />
      </ReactFlowProvider>
    );
  };

  const defaultProps = {
    id: '1',
    isConnectable: true,
    data: {
      wait: '01:30:45',
      editData: mockEditData,
      clearNodeData: mockClearNodeData,
    },
  };

  it('renders with initial wait time', () => {
    const { getByDisplayValue } = renderWithProvider(defaultProps);
    expect(getByDisplayValue('01')).toBeInTheDocument();
    expect(getByDisplayValue('30')).toBeInTheDocument();
    expect(getByDisplayValue('45')).toBeInTheDocument();
  });

  it('prevents invalid hour input', () => {
    const { getByDisplayValue } = renderWithProvider(defaultProps);
    const hourInput = getByDisplayValue('01');

    fireEvent.change(hourInput, { target: { value: 'a' } });
    expect(mockEditData).not.toHaveBeenCalled();
  });

  it('prevents invalid minute input', () => {
    const { getByDisplayValue } = renderWithProvider(defaultProps);
    const minInput = getByDisplayValue('30');

    fireEvent.change(minInput, { target: { value: 'a' } });
    expect(mockEditData).not.toHaveBeenCalled();
  });

  it('prevents invalid second input', () => {
    const { getByDisplayValue } = renderWithProvider(defaultProps);
    const secInput = getByDisplayValue('45');

    fireEvent.change(secInput, { target: { value: 'a' } });
    expect(mockEditData).not.toHaveBeenCalled();
  });

});
