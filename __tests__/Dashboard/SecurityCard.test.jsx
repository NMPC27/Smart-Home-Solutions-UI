import SecurityCard from "../../src/components/Dashboard/SecurityCard";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect, vi } from "vitest";

describe("SecurityCard", () => {
  const mockProps = {
    devices: [
      { type: "Motion Sensor", on: true },
      { type: "Door Sensor", on: false }, // Adding a non-matching device for variety
    ],
    alarmOn: false,
    handleClickAlarm: vi.fn(),
  };

  it("renders the SecurityCard component", () => {
    render(<SecurityCard {...mockProps} />);
    expect(screen.getByText("Security")).toBeInTheDocument();
  });

  it('displays "Armed" button when alarm is on', () => {
    render(<SecurityCard {...mockProps} alarmOn={true} />);
    expect(screen.getByRole("button", { name: /armed/i })).toBeInTheDocument();
  });

  it('displays "Unarmed" button when alarm is off', () => {
    render(<SecurityCard {...mockProps} />);
    expect(
      screen.getByRole("button", { name: /unarmed/i }),
    ).toBeInTheDocument();
  });

  it("calls handleClickAlarm when clicking the button", () => {
    render(<SecurityCard {...mockProps} />);
    fireEvent.click(screen.getByRole("button", { name: /unarmed/i }));
    expect(mockProps.handleClickAlarm).toHaveBeenCalledWith(true); // Check if it's called with `true` (alarmOn = true)
  });

  it("sets initial alarm state based on Motion Sensor", () => {
    render(<SecurityCard {...mockProps} />);
    expect(mockProps.handleClickAlarm).toHaveBeenCalledWith(true); // Since there is a Motion Sensor with `on: true`
  });
});
