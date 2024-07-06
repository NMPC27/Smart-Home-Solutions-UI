import MotionSensorCard from "../../src/components/Dashboard/MotionSensorCard";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect, vi } from "vitest";

describe("MotionSensorCard", () => {
  const mockProps = {
    devices: [
      {
        id: "sensor.1",
        type: "Motion Sensor",
        name: "Living Room Sensor",
        room: "Living Room",
        detectedMotion: "off",
      },
      {
        id: "sensor.2",
        type: "Motion Sensor",
        name: "Bedroom Sensor",
        room: "Bedroom",
        detectedMotion: "on",
      },
    ],
    rooms: [{ name: "Living Room" }, { name: "Bedroom" }],
    globalRoom: "Any",
  };

  it("renders the MotionSensorCard component", () => {
    render(<MotionSensorCard {...mockProps} />);
    expect(screen.getByText("Motion Sensor")).toBeInTheDocument();
  });
});
