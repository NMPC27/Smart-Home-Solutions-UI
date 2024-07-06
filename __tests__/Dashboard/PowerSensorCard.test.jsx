import PowerSensorCard from "../../src/components/Dashboard/PowerSensorCard";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect, vi } from "vitest";

describe("PowerSensorCard", () => {
  const mockProps = {
    devices: [
      {
        id: "sensor.1",
        type: "Power",
        name: "Living Room Sensor",
        room: "Living Room",
        val: 120,
      },
      {
        id: "sensor.2",
        type: "Power",
        name: "Bedroom Sensor",
        room: "Bedroom",
        val: 60,
      },
    ],
    rooms: [{ name: "Living Room" }, { name: "Bedroom" }],
    globalRoom: "Any",
  };

  it("renders the PowerSensorCard component", () => {
    render(<PowerSensorCard {...mockProps} />);
    expect(screen.getByText("Power Sensor")).toBeInTheDocument();
  });

  it("displays the correct power value for each sensor", () => {
    render(<PowerSensorCard {...mockProps} />);
    expect(screen.getByText("120 W")).toBeInTheDocument();
    expect(screen.getByText("60 W")).toBeInTheDocument();
  });
});
