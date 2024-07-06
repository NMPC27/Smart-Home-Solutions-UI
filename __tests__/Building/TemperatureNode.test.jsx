import TemperatureNode from "../../src/components/Building/TemperatureNode";

import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import "@testing-library/jest-dom";
import React from "react";
import { useReactFlow } from "reactflow";

// Mock useReactFlow hook
vi.mock("reactflow", () => ({
  useReactFlow: vi.fn(),
}));

const mockDeleteElements = vi.fn();
useReactFlow.mockReturnValue({ deleteElements: mockDeleteElements });

const mockProps = {
  id: "1",
  data: {
    openDialog: vi.fn(),
    name: "Living Room",
    on: true,
  },
};

describe("TemperatureNode Component", () => {
  it("renders the TemperatureNode with the correct name and icon color", () => {
    render(<TemperatureNode {...mockProps} />);

    expect(screen.getByText("Living Room")).toBeInTheDocument();
    expect(screen.getByTestId("AcUnitIcon")).toHaveStyle({ color: "#D9A406" });
  });

  it("calls openDialog with correct arguments when the AcUnitIcon button is clicked", () => {
    render(<TemperatureNode {...mockProps} />);

    fireEvent.click(screen.getByTestId("AcUnitIcon"));
    expect(mockProps.data.openDialog).toHaveBeenCalledWith("1", "Temperature");
  });

  it("calls deleteElements with correct arguments when the delete button is clicked", () => {
    render(<TemperatureNode {...mockProps} />);

    fireEvent.click(screen.getByTestId("DeleteIcon"));
    expect(mockDeleteElements).toHaveBeenCalledWith({ nodes: [{ id: "1" }] });
  });
});
