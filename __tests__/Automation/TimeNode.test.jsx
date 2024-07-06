// TimeNode.test.jsx

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import React from 'react';
import TimeNode from '../../src/components/Automation/TimeNode';
import { ReactFlowProvider } from 'reactflow';
import '@testing-library/jest-dom';

describe('TimeNode Component', () => {
    let mockEditData, mockClearNodeData, mockDeleteElements;
  
    beforeEach(() => {
      mockEditData = vi.fn();
      mockClearNodeData = vi.fn();
      mockDeleteElements = vi.fn();
    });
  
    const renderWithProvider = (props) => {
      return render(
        <ReactFlowProvider>
          <TimeNode {...props} />
        </ReactFlowProvider>
      );
    };
  
    const defaultProps = {
      id: '1',
      isConnectable: true,
      data: {
        time: '12:30',
        editData: mockEditData,
        clearNodeData: mockClearNodeData,
      },
    };
  
    it('renders with initial time', () => {
      const { getByDisplayValue } = renderWithProvider(defaultProps);
      expect(getByDisplayValue('12')).toBeInTheDocument();
      expect(getByDisplayValue('30')).toBeInTheDocument();
    });
  
    it('prevents invalid hour input', () => {
      const { getByDisplayValue } = renderWithProvider(defaultProps);
      const hourInput = getByDisplayValue('12');
  
      fireEvent.change(hourInput, { target: { value: '25' } });
      expect(mockEditData).not.toHaveBeenCalled();
    });
  
    it('prevents invalid minute input', () => {
      const { getByDisplayValue } = renderWithProvider(defaultProps);
      const minInput = getByDisplayValue('30');
  
      fireEvent.change(minInput, { target: { value: '61' } });
      expect(mockEditData).not.toHaveBeenCalled();
    });
  
  });