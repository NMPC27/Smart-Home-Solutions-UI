// HumiditySensorDialog.test.jsx
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import "@testing-library/jest-dom"; // Importing jest-dom matchers
import HumiditySensorDialog from "../../src/components/Building/HumiditySensorDialog";
import React from "react";

// Mock getSensor function
vi.mock("../../src/components/API", () => ({
  getSensor: vi.fn(() => Promise.resolve({ data: 50 })),
}));

const mockProps = {
  openDialog: true,
  handleCloseDialog: vi.fn(),
  devices: [
    {
      id: "1",
      name: "Living Room",
      type: "Humidity Sensor",
    },
  ],
  deviceID: "1",
};

describe("HumiditySensorDialog Component", () => {
  it("renders the Dialog with the correct title", () => {
    render(<HumiditySensorDialog {...mockProps} />);
    expect(screen.getByText("Living Room Humidity Sensor")).toBeInTheDocument();
  });

  it("fetches and displays the humidity value", async () => {
    render(<HumiditySensorDialog {...mockProps} />);
    await waitFor(() => expect(screen.getByText("50%")).toBeInTheDocument());
  });
});
