import MotionSensorDialog from "../../src/components/Building/MotionSensorDialog";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import "@testing-library/jest-dom";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { getSensor } from "../../src/components/API";

vi.mock("../../src/components/API", () => ({
  getSensor: vi.fn(),
}));

const mockProps = {
  openDialog: true,
  handleCloseDialog: vi.fn(),
  devices: [
    {
      id: "1",
      name: "Living Room Sensor",
      type: "Motion Sensor",
    },
  ],
  deviceID: "1",
};

describe("MotionSensorDialog Component", () => {
  it("renders the motion sensor dialog with the correct name and icon", () => {
    getSensor.mockResolvedValueOnce({ data: "off" });

    render(
      <MemoryRouter>
        <MotionSensorDialog {...mockProps} />
      </MemoryRouter>,
    );

    expect(screen.getByText("Living Room Sensor")).toBeInTheDocument();
    expect(screen.getByTestId("SensorsOffIcon")).toBeInTheDocument();
  });

  it("calls handleCloseDialog when the close icon is clicked", () => {
    render(
      <MemoryRouter>
        <MotionSensorDialog {...mockProps} />
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByTestId("CloseIcon"));
    expect(mockProps.handleCloseDialog).toHaveBeenCalled();
  });
});
