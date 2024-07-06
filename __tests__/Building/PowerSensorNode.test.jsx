import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import "@testing-library/jest-dom";
import React from "react";
import { useReactFlow } from "reactflow";
import PowerSensorNode from "../../src/components/Building/PowerSensorNode";

vi.mock("reactflow", () => ({
  useReactFlow: vi.fn(),
}));

const mockDeleteElements = vi.fn();

const mockProps = {
  id: "1",
  data: {
    openDialog: vi.fn(),
    name: "Living Room Power Sensor",
  },
};

useReactFlow.mockReturnValue({
  deleteElements: mockDeleteElements,
});

describe("PowerSensorNode Component", () => {
  it("renders the power sensor node with the correct name", () => {
    render(<PowerSensorNode {...mockProps} />);

    expect(screen.getByText("Living Room Power Sensor")).toBeInTheDocument();
  });

  it("calls openDialog with correct arguments when BoltIcon is clicked", () => {
    render(<PowerSensorNode {...mockProps} />);

    fireEvent.click(screen.getByTestId("BoltIcon"));
    expect(mockProps.data.openDialog).toHaveBeenCalledWith("1", "Power");
  });

  it("calls deleteElements with correct arguments when DeleteIcon is clicked", () => {
    render(<PowerSensorNode {...mockProps} />);

    fireEvent.click(screen.getByTestId("DeleteIcon"));
    expect(mockDeleteElements).toHaveBeenCalledWith({ nodes: [{ id: "1" }] });
  });
});
