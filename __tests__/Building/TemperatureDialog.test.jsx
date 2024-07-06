import TemperatureDialog from "../../src/components/Building/TemperatureDialog";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import "@testing-library/jest-dom";
import React from "react";

// Mock the API call
vi.mock("../../src/components/API", () => ({
  getSensor: vi.fn(),
}));

// Mock ResizeObserver
class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

global.ResizeObserver = ResizeObserver;

const mockProps = {
  openDialog: true,
  handleCloseDialog: vi.fn(),
  handleTemperatureTarget: vi.fn(),
  handleTemperatureOnOff: vi.fn(),
  handleMinusTemperature: vi.fn(),
  handlePlusTemperature: vi.fn(),
  devices: [
    {
      id: "1",
      name: "Living Room",
      type: "Temperature",
      targetTemperature: 22,
      currentTemperature: 24,
      currentHumidity: 40,
      room: "Living Room",
      on: true,
    },
    {
      id: "2",
      name: "Living Room Sensor",
      type: "Temperature Sensor",
      currentTemperature: 24,
      room: "Living Room",
    },
    {
      id: "3",
      name: "Living Room Humidity",
      type: "Humidity Sensor",
      currentHumidity: 40,
      room: "Living Room",
    },
  ],
  deviceID: "1",
};

describe("TemperatureDialog Component", () => {
  it("renders the temperature dialog with the correct name and temperature", () => {
    render(<TemperatureDialog {...mockProps} />);

    expect(screen.getByText("Living Room Temperature")).toBeInTheDocument();
    expect(screen.getByText("Target 22°")).toBeInTheDocument();
    expect(screen.getByText("24°C | 40%")).toBeInTheDocument();
  });

  it("calls handleCloseDialog when the close button is clicked", () => {
    render(<TemperatureDialog {...mockProps} />);

    fireEvent.click(screen.getByTestId("CloseIcon"));
    expect(mockProps.handleCloseDialog).toHaveBeenCalled();
  });

  it("calls handleMinusTemperature when the minus button is clicked", () => {
    render(<TemperatureDialog {...mockProps} />);

    fireEvent.click(screen.getByTestId("RemoveIcon"));
    expect(mockProps.handleMinusTemperature).toHaveBeenCalledWith(0);
  });

  it("calls handlePlusTemperature when the plus button is clicked", () => {
    render(<TemperatureDialog {...mockProps} />);

    fireEvent.click(screen.getByTestId("AddIcon"));
    expect(mockProps.handlePlusTemperature).toHaveBeenCalledWith(0);
  });

  it("calls handleTemperatureOnOff when the power button is clicked", () => {
    render(<TemperatureDialog {...mockProps} />);

    fireEvent.click(screen.getByTestId("PowerSettingsNewIcon"));
    expect(mockProps.handleTemperatureOnOff).toHaveBeenCalledWith(0);
  });
});
