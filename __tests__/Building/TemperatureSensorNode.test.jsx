import TemperatureSensorNode from "../../src/components/Building/TemperatureSensorNode";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { useReactFlow } from "reactflow";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import DeleteIcon from "@mui/icons-material/Delete";

// Mock useReactFlow hook
vi.mock("reactflow", () => ({
  useReactFlow: vi.fn(),
}));

describe("TemperatureSensorNode", () => {
  const deleteElementsMock = vi.fn();
  const openDialogMock = vi.fn();

  beforeEach(() => {
    useReactFlow.mockReturnValue({
      deleteElements: deleteElementsMock,
    });
  });

  it("calls openDialog when the thermostat icon is clicked", () => {
    render(
      <TemperatureSensorNode
        id="1"
        data={{ name: "Sensor 1", openDialog: openDialogMock }}
      />,
    );

    const thermostatButton = screen.getByTestId("ThermostatIcon");
    fireEvent.click(thermostatButton);

    expect(openDialogMock).toHaveBeenCalledWith("1", "Temperature Sensor");
  });

  it("calls deleteElements when the delete icon is clicked", () => {
    render(
      <TemperatureSensorNode
        id="1"
        data={{ name: "Sensor 1", openDialog: openDialogMock }}
      />,
    );

    const deleteButton = screen.getByTestId("DeleteIcon");
    fireEvent.click(deleteButton);

    expect(deleteElementsMock).toHaveBeenCalledWith({ nodes: [{ id: "1" }] });
  });
});
