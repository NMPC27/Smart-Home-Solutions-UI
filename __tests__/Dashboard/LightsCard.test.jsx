import LightsCard from "../../src/components/Dashboard/LightsCard";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect, vi } from "vitest";

describe("LightsCard", () => {
  const mockProps = {
    devices: [
      {
        id: "light.1",
        name: "Living Room Light",
        type: "Light",
        room: "Living Room",
        on: true,
      },
      {
        id: "light.2",
        name: "Bedroom Light",
        type: "Light",
        room: "Bedroom",
        on: false,
      },
    ],
    rooms: [{ name: "Living Room" }, { name: "Bedroom" }],
    globalRoom: "Any",
    handleLightOnOff: vi.fn(),
    handleLightColor: vi.fn(),
    handleBrightnessChange: vi.fn(),
  };

  it("renders the LightsCard component", () => {
    render(<LightsCard {...mockProps} />);
    expect(screen.getByText("Lights")).toBeInTheDocument();
  });

  it("calls handleLightOnOff when the light switch is clicked", () => {
    render(<LightsCard {...mockProps} />);
    const switchButton = screen.getByTestId("FlashOnIcon");
    fireEvent.click(switchButton);
    expect(mockProps.handleLightOnOff).toHaveBeenCalled();
  });

  it("opens the LightsDialog when the settings button is clicked", () => {
    render(<LightsCard {...mockProps} />);
    const settingsButton = screen.getByTestId("SettingsIcon");
    fireEvent.click(settingsButton);
    expect(screen.getByText("Living Room Light")).toBeInTheDocument();
  });
});
