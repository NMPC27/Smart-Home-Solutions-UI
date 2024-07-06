import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect, vi } from "vitest";
import LightsDialog from "../../src/components/Dashboard/LightsDialog";

describe("LightsDialog", () => {
  const mockProps = {
    openDialog: true,
    handleCloseDialog: vi.fn(),
    handleLightColor: vi.fn(),
    handleBrightnessChange: vi.fn(),
    handleLightOnOff: vi.fn(),
    devices: [
      {
        id: "light.1",
        name: "Living Room Light",
        color: "#ff0000",
        brightness: 50,
        on: true,
      },
      {
        id: "light.2",
        name: "Bedroom Light",
        color: "#00ff00",
        brightness: 75,
        on: false,
      },
    ],
    deviceIdx: 0,
  };

  it("renders the LightsDialog component", () => {
    render(<LightsDialog {...mockProps} />);
    expect(screen.getByText("Living Room Light Light")).toBeInTheDocument();
  });

  it("calls handleLightOnOff when the power button is clicked", () => {
    render(<LightsDialog {...mockProps} />);
    const powerButton = screen.getByTestId("PowerSettingsNewIcon");
    fireEvent.click(powerButton);
    expect(mockProps.handleLightOnOff).toHaveBeenCalledWith(
      mockProps.deviceIdx,
    );
  });
});
