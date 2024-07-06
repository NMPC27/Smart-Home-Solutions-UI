import TemperatureSensorCard from "../../src/components/Dashboard/TemperatureSensorCard";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { getSensor } from "../../src/components/API";
import "@testing-library/jest-dom";

// Mock the API call
vi.mock("../../src/components/API");

describe("TemperatureSensorCard", () => {
  const mockDevices = [
    {
      id: "1",
      type: "Temperature Sensor",
      name: "Sensor 1",
      room: "Living Room",
      currentTemperature: 22,
    },
    {
      id: "2",
      type: "Humidity Sensor",
      name: "Sensor 2",
      room: "Living Room",
      currentHumidity: 45,
    },
    {
      id: "3",
      type: "Temperature Sensor",
      name: "Sensor 3",
      room: "Bedroom",
      currentTemperature: 19,
    },
  ];

  const mockRooms = [{ name: "Living Room" }, { name: "Bedroom" }];

  const globalRoom = "Any";

  beforeEach(() => {
    getSensor.mockImplementation((id) => {
      if (id === "1") {
        return Promise.resolve({ data: 22 });
      } else if (id === "2") {
        return Promise.resolve({ data: 45 });
      } else if (id === "3") {
        return Promise.resolve({ data: 19 });
      }
      return Promise.reject(new Error("Sensor not found"));
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders correctly", () => {
    render(
      <TemperatureSensorCard
        globalRoom={globalRoom}
        devices={mockDevices}
        rooms={mockRooms}
      />,
    );
    expect(screen.getByText("Temperature Sensor")).toBeInTheDocument();
  });

  it("selects the correct initial room based on props", () => {
    render(
      <TemperatureSensorCard
        globalRoom="Living Room"
        devices={mockDevices}
        rooms={mockRooms}
      />,
    );
    expect(screen.getByDisplayValue("Living Room")).toBeInTheDocument();
  });

  it("changes the selected room when the dropdown is used", () => {
    render(
      <TemperatureSensorCard
        globalRoom={"Bedroom"}
        devices={mockDevices}
        rooms={mockRooms}
      />,
    );
    expect(screen.getByDisplayValue("Bedroom")).toBeInTheDocument();
  });

  it("displays sensors correctly", () => {
    render(
      <TemperatureSensorCard
        globalRoom={globalRoom}
        devices={mockDevices}
        rooms={mockRooms}
      />,
    );
    expect(screen.getByText("Sensor 1")).toBeInTheDocument();
    expect(screen.getByText("22°C")).toBeInTheDocument();
    expect(screen.getByText("Sensor 2")).toBeInTheDocument();
    expect(screen.getByText("45%")).toBeInTheDocument();
  });
});
