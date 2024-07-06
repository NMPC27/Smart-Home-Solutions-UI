// EventNode.test.jsx

import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Handle, Position, useReactFlow } from "reactflow";
import EventNode from "../../src/components/Automation/EventNode";
import "@testing-library/jest-dom";

vi.mock("reactflow", () => ({
  Handle: ({ type, position, isConnectable, style }) => (
    <div
      data-testid="handle"
      data-type={type}
      data-position={position}
      data-isconnectable={isConnectable}
      style={style}
    />
  ),
  Position: {
    Right: "right",
  },
  useReactFlow: vi.fn(),
}));

describe("EventNode Component", () => {
  let deleteElementsMock;

  beforeEach(() => {
    deleteElementsMock = vi.fn();
    useReactFlow.mockReturnValue({
      deleteElements: deleteElementsMock,
    });
  });

  const defaultProps = {
    id: "1",
    data: {
      devices: [
        { id: "device1", name: "Temp Sensor", type: "Temperature Sensor" },
        { id: "device2", name: "Motion Sensor", type: "Motion Sensor" },
        { id: "device3", name: "Humidity Sensor", type: "Humidity Sensor" },
      ],
      deviceID: "device1",
      temperature: 20,
      humidity: 50,
      sensor: "notDetected",
      sinal: "<",
      editData: vi.fn(),
      clearNodeData: vi.fn(),
    },
    isConnectable: true,
  };

  it("renders correctly", () => {
    render(<EventNode {...defaultProps} />);
    expect(screen.getByText(/Event Device:/i)).toBeInTheDocument();
  });

  it("calls editData when changing device", () => {
    render(<EventNode {...defaultProps} />);
    const select = screen.getByRole("combobox");
    fireEvent.change(select, { target: { value: "1" } });
    expect(defaultProps.data.editData).toHaveBeenCalledWith(
      { id: "1", deviceID: "device2", deviceType: "Motion Sensor" },
      "eventData",
    );
  });

  it("increases temperature when plus button is clicked", () => {
    render(
      <EventNode
        {...defaultProps}
        data={{ ...defaultProps.data, deviceID: "device1" }}
      />,
    );
    const plusButton = screen.getByText("+");
    fireEvent.click(plusButton);
    expect(defaultProps.data.editData).toHaveBeenCalledWith(
      { id: "1", temperature: 21 },
      "eventData",
    );
  });

  it("decreases temperature when minus button is clicked", () => {
    render(
      <EventNode
        {...defaultProps}
        data={{ ...defaultProps.data, deviceID: "device1" }}
      />,
    );
    const minusButton = screen.getByText("-");
    fireEvent.click(minusButton);
    expect(defaultProps.data.editData).toHaveBeenCalledWith(
      { id: "1", temperature: 19 },
      "eventData",
    );
  });

  it("increases humidity when plus button is clicked", () => {
    render(
      <EventNode
        {...defaultProps}
        data={{ ...defaultProps.data, deviceID: "device3" }}
      />,
    );
    const plusButton = screen.getByText("+");
    fireEvent.click(plusButton);
    expect(defaultProps.data.editData).toHaveBeenCalledWith(
      { id: "1", humidity: 55 },
      "eventData",
    );
  });

  it("decreases humidity when minus button is clicked", () => {
    render(
      <EventNode
        {...defaultProps}
        data={{ ...defaultProps.data, deviceID: "device3" }}
      />,
    );
    const minusButton = screen.getByText("-");
    fireEvent.click(minusButton);
    expect(defaultProps.data.editData).toHaveBeenCalledWith(
      { id: "1", humidity: 45 },
      "eventData",
    );
  });
});
