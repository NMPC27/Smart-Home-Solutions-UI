import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import "@testing-library/jest-dom";
import LightsNode from "../../src/components/Building/LightsNode";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { useReactFlow } from "reactflow";

// Mock useReactFlow hook
vi.mock("reactflow", () => ({
  useReactFlow: vi.fn(),
}));

const mockDeleteElements = vi.fn();

const mockProps = {
  id: "1",
  data: {
    openDialog: vi.fn(),
    name: "Living Room Light",
    on: true,
  },
};

describe("LightsNode Component", () => {
  beforeEach(() => {
    // Mock the return value of useReactFlow
    useReactFlow.mockReturnValue({
      deleteElements: mockDeleteElements,
    });

    render(
      <MemoryRouter>
        <LightsNode {...mockProps} />
      </MemoryRouter>,
    );
  });

  it("renders the light node with the correct name and icon color", () => {
    expect(screen.getByText("Living Room Light")).toBeInTheDocument();
    expect(screen.getByTestId("LightbulbIcon")).toHaveStyle({
      color: "#D9A406",
    });
  });

  it("calls openDialog when the light icon is clicked", () => {
    fireEvent.click(screen.getByTestId("LightbulbIcon"));
    expect(mockProps.data.openDialog).toHaveBeenCalledWith("1", "Lights");
  });

  it("calls deleteElements when the delete icon is clicked", () => {
    fireEvent.click(screen.getByTestId("DeleteIcon"));
    expect(mockDeleteElements).toHaveBeenCalledWith({ nodes: [{ id: "1" }] });
  });
});
