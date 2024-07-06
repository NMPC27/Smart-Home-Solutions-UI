import TemperatureSensorDialog from "../../src/components/Building/TemperatureSensorDialog";
import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { describe, it, vi, expect, beforeEach } from "vitest";
import "@testing-library/jest-dom";
import { getSensor } from "../../src/components/API";

vi.mock("../../src/components/API", () => ({
  getSensor: vi.fn(),
}));

const mockProps = {
  openDialog: true,
  handleCloseDialog: vi.fn(),
  deviceID: "1",
  devices: [
    { id: "1", name: "Living Room Sensor", type: "Temperature Sensor" },
  ],
};

describe("TemperatureSensorDialog Component", () => {
  beforeEach(() => {
    getSensor.mockResolvedValue({ data: 25 });
  });

  it("renders the TemperatureSensorDialog with the correct name and temperature", async () => {
    await act(async () => {
      render(<TemperatureSensorDialog {...mockProps} />);
    });

    expect(
      screen.getByText("Living Room Sensor Temperature Sensor"),
    ).toBeInTheDocument();
    expect(screen.getByText("25°C")).toBeInTheDocument();
  });

  it("calls handleCloseDialog when the CloseIcon button is clicked", async () => {
    await act(async () => {
      render(<TemperatureSensorDialog {...mockProps} />);
    });

    fireEvent.click(screen.getByTestId("CloseIcon"));
    expect(mockProps.handleCloseDialog).toHaveBeenCalled();
  });

  it("shows error message when getSensor API call fails", async () => {
    getSensor.mockRejectedValue({ response: { status: 500 } });

    await act(async () => {
      render(<TemperatureSensorDialog {...mockProps} />);
    });

    expect(await screen.findByText("Error 500")).toBeInTheDocument();
  });
});
