import CameraCard from "../../src/components/Dashboard/CameraCard";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { getCamImg } from "../../src/components/API";

vi.mock("../../src/components/API", () => ({
  getCamImg: vi.fn(),
}));

describe("CameraCard", () => {
  const mockDevices = [
    { type: "Camera", room: "Living Room", id: "1", on: true, name: "Cam 1" },
    { type: "Camera", room: "Bedroom", id: "2", on: false, name: "Cam 2" },
  ];

  const mockRooms = [{ name: "Living Room" }, { name: "Bedroom" }];

  const mockProps = {
    rooms: mockRooms,
    devices: mockDevices,
    globalRoom: "Any",
    handleCameraOnOff: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the CameraCard component", () => {
    render(<CameraCard {...mockProps} />);
    expect(screen.getByText("Camera")).toBeInTheDocument();
    expect(screen.getByLabelText("Room")).toBeInTheDocument();
  });

  it("shows camera image when device is on", async () => {
    getCamImg.mockResolvedValue({ data: "mockImageData" });

    render(<CameraCard {...mockProps} />);

    await waitFor(() => {
      expect(screen.getByAltText("Camera")).toBeInTheDocument();
    });
  });

  it("shows loader when image is being fetched", () => {
    render(<CameraCard {...mockProps} />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("shows VideocamOffIcon when device is off", () => {
    const offDevicesProps = {
      ...mockProps,
      devices: mockDevices.map((device) =>
        device.id === "1" ? { ...device, on: false } : device,
      ),
    };

    render(<CameraCard {...offDevicesProps} />);
    expect(screen.getByTestId("VideocamOffIcon")).toBeInTheDocument();
  });

  it("calls handleCameraOnOff when power button is clicked", () => {
    render(<CameraCard {...mockProps} />);
    const powerButton = screen.getByTestId("PowerSettingsNewIcon");
    fireEvent.click(powerButton);
    expect(mockProps.handleCameraOnOff).toHaveBeenCalledWith(0);
  });

  it("displays error message when image fetch fails", async () => {
    getCamImg.mockRejectedValue({ response: { status: 404 } });

    render(<CameraCard {...mockProps} />);

    await waitFor(() => {
      expect(screen.getByRole("alert")).toHaveTextContent("Error 404");
    });
  });
});
