// CameraDialog.test.jsx
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import CameraDialog from "../../src/components/Building/CameraDialog";
import React from "react";
import "@testing-library/jest-dom";

const mockDevices = [
  {
    id: "1",
    name: "Front Door",
    type: "Camera",
    on: true,
  },
  {
    id: "2",
    name: "Back Yard",
    type: "Camera",
    on: false,
  },
];

const mockProps = {
  openDialog: true,
  handleCloseDialog: vi.fn(),
  devices: mockDevices,
  deviceID: "1",
  handleCameraOnOff: vi.fn(),
};

describe("CameraDialog Component", () => {
  beforeEach(() => {
    render(<CameraDialog {...mockProps} />);
  });

  it("renders the Dialog with the correct title", () => {
    expect(screen.getByText("Front Door Camera")).toBeInTheDocument();
  });

  it("renders CircularProgress when camera is on and no image is loaded", () => {
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("renders VideocamOffIcon when the camera is off", () => {
    render(<CameraDialog {...mockProps} deviceID="2" />);
    expect(screen.getByTestId("VideocamOffIcon")).toBeInTheDocument();
  });

  it("toggles the camera on/off when the power button is clicked", () => {
    fireEvent.click(screen.getAllByRole("button", { tabindex: 0 })[1]);
    expect(mockProps.handleCameraOnOff).toHaveBeenCalledWith(0);
  });
});
