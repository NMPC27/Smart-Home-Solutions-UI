import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import "@testing-library/jest-dom";
import MotionSensorNode from "../../src/components/Building/MotionSensorNode";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { useReactFlow } from "reactflow";

vi.mock("reactflow", () => ({
  useReactFlow: vi.fn(),
}));

const mockDeleteElements = vi.fn();
useReactFlow.mockReturnValue({
  deleteElements: mockDeleteElements,
});

const mockProps = {
  id: "1",
  data: {
    openDialog: vi.fn(),
    name: "Living Room Sensor",
  },
};

describe("MotionSensorNode Component", () => {
  it("renders the motion sensor node with the correct name and icon", () => {
    render(
      <MemoryRouter>
        <MotionSensorNode {...mockProps} />
      </MemoryRouter>,
    );

    expect(screen.getByText("Living Room Sensor")).toBeInTheDocument();
    expect(screen.getByTestId("SensorsIcon")).toBeInTheDocument();
  });

  it("calls openDialog when the sensor icon is clicked", () => {
    render(
      <MemoryRouter>
        <MotionSensorNode {...mockProps} />
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByTestId("SensorsIcon"));
    expect(mockProps.data.openDialog).toHaveBeenCalledWith(
      "1",
      "Motion Sensor",
    );
  });

  it("calls deleteElements when the delete icon is clicked", () => {
    render(
      <MemoryRouter>
        <MotionSensorNode {...mockProps} />
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByTestId("DeleteIcon"));
    expect(mockDeleteElements).toHaveBeenCalledWith({ nodes: [{ id: "1" }] });
  });
});
