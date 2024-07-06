import PowerSensorDialog from "../../src/components/Building/PowerSensorDialog";
import { render, screen, waitFor } from "@testing-library/react";
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
  devices: [{ id: "1", name: "Living Room Power Sensor", type: "Power" }],
  deviceID: "1",
};

describe("PowerSensorDialog Component", () => {
  it("renders the power sensor dialog with the correct name and power", async () => {
    getSensor.mockResolvedValue({ data: 50 });

    render(
      <MemoryRouter>
        <PowerSensorDialog {...mockProps} />
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(
        screen.getByText("Living Room Power Sensor Power Sensor"),
      ).toBeInTheDocument();
      expect(screen.getByText("50 W")).toBeInTheDocument();
    });
  });

  it("displays error message on API error", async () => {
    getSensor.mockRejectedValue({ response: { status: 404 } });

    render(
      <MemoryRouter>
        <PowerSensorDialog {...mockProps} />
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(screen.getByText("Error 404")).toBeInTheDocument();
    });
  });
});
