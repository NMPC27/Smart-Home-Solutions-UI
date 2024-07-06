// DeviceNode.test.jsx

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Handle, Position, useReactFlow } from 'reactflow';
import DeviceNode  from '../../src/components/Automation/DeviceNode';
import '@testing-library/jest-dom';

vi.mock('reactflow', () => ({
  Handle: ({ type, position, isConnectable, style }) => (
    <div data-testid="handle" data-type={type} data-position={position} data-isconnectable={isConnectable} style={style} />
  ),
  Position: {
    Left: 'left',
  },
  useReactFlow: vi.fn(),
}));

vi.mock('use-debounce', () => ({
  useDebounce: vi.fn((value) => [value]),
}));

describe('DeviceNode Component', () => {
  let deleteElementsMock;

  beforeEach(() => {
    deleteElementsMock = vi.fn();
    useReactFlow.mockReturnValue({
      deleteElements: deleteElementsMock,
    });
  });

  const defaultProps = {
    id: '1',
    data: {
      devices: [
        { id: 'device1', name: 'Light 1', type: 'Light' },
        { id: 'device2', name: 'Thermostat', type: 'Temperature' },
      ],
      deviceID: 'device1',
      deviceState: 'turnOff',
      temperature: 20,
      color: '#ffffff',
      brightness: 50,
      editData: vi.fn(),
      clearNodeData: vi.fn(),
    },
    isConnectable: true,
  };

  it('renders correctly', () => {
    render(<DeviceNode {...defaultProps} />);
    expect(screen.getByText(/Device:/i)).toBeInTheDocument();
    expect(screen.getByText(/State:/i)).toBeInTheDocument();
  });

  it('calls editData when changing device state', () => {
    render(<DeviceNode {...defaultProps} />);
    const select = screen.getAllByRole('combobox')[1];
    fireEvent.change(select, { target: { value: 'turnOn' } });
    expect(defaultProps.data.editData).toHaveBeenCalledWith({ id: '1', deviceState: 'turnOn' }, 'deviceData');
  });

  it('increases temperature when plus button is clicked', () => {
    render(<DeviceNode {...defaultProps} data={{ ...defaultProps.data, deviceState: 'turnOn', deviceID: 'device2' }} />);
    const plusButton = screen.getByText('+');
    fireEvent.click(plusButton);
    expect(defaultProps.data.editData).toHaveBeenCalledWith({ id: '1', temperature: 21 }, 'deviceData');
  });

  it('decreases temperature when minus button is clicked', () => {
    render(<DeviceNode {...defaultProps} data={{ ...defaultProps.data, deviceState: 'turnOn', deviceID: 'device2' }} />);
    const minusButton = screen.getByText('-');
    fireEvent.click(minusButton);
    expect(defaultProps.data.editData).toHaveBeenCalledWith({ id: '1', temperature: 19 }, 'deviceData');
  });

  it('calls deleteElements when delete button is clicked', () => {
    render(<DeviceNode {...defaultProps} />);
    const deleteButton = screen.getByRole('button');
    fireEvent.click(deleteButton);
    expect(defaultProps.data.clearNodeData).toHaveBeenCalledWith('1', 'clearNodeData');
    expect(deleteElementsMock).toHaveBeenCalledWith({ nodes: [{ id: '1' }] });
  });
});
