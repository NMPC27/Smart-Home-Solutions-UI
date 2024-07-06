import CameraDialog from "../../src/components/Dashboard/CameraDialog";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect, vi } from "vitest";

describe("CameraDialog", () => {
  const mockProps = {
    openDialog: true,
    handleCloseDialog: vi.fn(),
    name: "Living Room",
    fullImg: "mockBase64Image",
  };

  it("renders the CameraDialog component", () => {
    render(<CameraDialog {...mockProps} />);
    expect(screen.getByText("Living Room Camera")).toBeInTheDocument();
  });

  it("displays the image correctly", () => {
    render(<CameraDialog {...mockProps} />);
    const image = screen.getByAltText("Camera");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute(
      "src",
      "data:image/jpeg;base64,mockBase64Image",
    );
  });

  it("renders with the correct styles", () => {
    render(<CameraDialog {...mockProps} />);
    const dialogTitle = screen.getByText("Living Room Camera");
    expect(dialogTitle).toHaveStyle("color: #FFFFFF");
  });
});
