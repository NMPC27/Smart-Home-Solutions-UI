import TemperatureCard from "../../src/components/Dashboard/TemperatureCard";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect, vi } from "vitest";

// Mock ResizeObserver
class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

global.ResizeObserver = ResizeObserver;

describe("TemperatureCard", () => {
  const mockProps = {
    devices: [
      {
        id: 1,
        name: "Living Room Temperature",
        type: "Temperature",
        room: "Living Room",
        targetTemperature: 20,
        currentTemperature: 21,
        currentHumidity: 50,
        on: true,
      },
      {
        id: 2,
        name: "Bedroom Temperature",
        type: "Temperature",
        room: "Bedroom",
        targetTemperature: 22,
        currentTemperature: 23,
        currentHumidity: 45,
        on: false,
      },
      {
        id: 3,
        name: "Living Room Humidity",
        type: "Humidity Sensor",
        room: "Living Room",
        currentTemperature: 21,
        currentHumidity: 50,
        on: true,
      },
    ],
    rooms: [{ name: "Living Room" }, { name: "Bedroom" }],
    globalRoom: "Living Room",
    handleMinusTemperature: vi.fn(),
    handlePlusTemperature: vi.fn(),
    handleTemperatureTarget: vi.fn(),
    handleTemperatureOnOff: vi.fn(),
  };

  it("renders the TemperatureCard component", () => {
    render(<TemperatureCard {...mockProps} />);
    expect(screen.getByText("Temperature")).toBeInTheDocument();
    expect(screen.getByText("Living Room Temperature")).toBeInTheDocument();
  });

  it("displays the correct target temperature", () => {
    render(<TemperatureCard {...mockProps} />);
    expect(screen.getByText("Target 20°")).toBeInTheDocument();
  });

  it("calls handleMinusTemperature when clicking minus button", () => {
    render(<TemperatureCard {...mockProps} />);
    fireEvent.click(screen.getByTestId("RemoveIcon"));
    expect(mockProps.handleMinusTemperature).toHaveBeenCalledWith(0); // Device index 0
  });

  it("calls handlePlusTemperature when clicking plus button", () => {
    render(<TemperatureCard {...mockProps} />);
    fireEvent.click(screen.getByTestId("AddIcon"));
    expect(mockProps.handlePlusTemperature).toHaveBeenCalledWith(0); // Device index 0
  });

  it("calls handleTemperatureOnOff when clicking power button", () => {
    render(<TemperatureCard {...mockProps} />);
    fireEvent.click(screen.getByTestId("PowerSettingsNewIcon"));
    expect(mockProps.handleTemperatureOnOff).toHaveBeenCalledWith(0); // Device index 0
  });
});
