// HumiditySensorNode.test.jsx
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import "@testing-library/jest-dom"; // Importing jest-dom matchers
import HumiditySensorNode from "../../src/components/Building/HumiditySensorNode";
import React from "react";

// Mock useReactFlow hook
vi.mock("reactflow", () => ({
  useReactFlow: () => ({
    deleteElements: vi.fn(),
  }),
}));

const mockProps = {
  id: "1",
  data: {
    openDialog: vi.fn(),
    name: "Humidity Sensor Node",
  },
};

describe("HumiditySensorNode Component", () => {
  beforeEach(() => {
    render(<HumiditySensorNode {...mockProps} />);
  });

  it("renders the humidity sensor icon and name", () => {
    expect(screen.getByText("Humidity Sensor Node")).toBeInTheDocument();
    expect(screen.getByTestId("WaterDropIcon")).toBeInTheDocument();
  });

  it("calls openDialog with correct arguments when the humidity sensor icon is clicked", () => {
    fireEvent.click(screen.getByTestId("WaterDropIcon"));
    expect(mockProps.data.openDialog).toHaveBeenCalledWith(
      "1",
      "Humidity Sensor",
    );
  });
});
