/// DeviceDialog.test.jsx
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import DeviceDialog from "../../src/components/AppBar/DeviceDialog";
import React from "react";

describe("DeviceDialog", () => {
  const mockDevices = [
    { name: "Device 1", type: "Type 1", room: "Room 1" },
    { name: "Device 2", type: "Type 2", room: "Room 2" },
  ];
  const mockRooms = [{ name: "Room 1" }, { name: "Room 2" }];

  const renderComponent = (props) => {
    render(
      <DeviceDialog
        openDeviceDialog={true}
        handleCloseDeviceDialog={() => {}}
        devices={mockDevices}
        rooms={mockRooms}
        editDevice={() => {}}
        {...props}
      />,
    );
  };

  it("should display devices in the list", () => {
    renderComponent();
    expect(screen.getByText("Device 1")).toBeInTheDocument();
    expect(screen.getByText("Device 2")).toBeInTheDocument();
  });

  it("should allow editing a device", () => {
    const editDeviceMock = vi.fn();
    renderComponent({ editDevice: editDeviceMock });

    fireEvent.click(screen.getAllByRole("button", { tabindex: 0 })[1]);
    expect(screen.getByLabelText("Device Name")).toHaveValue("Device 1");

    fireEvent.change(screen.getByLabelText("Device Name"), {
      target: { value: "Device 1 Edited" },
    });

    fireEvent.click(screen.getByText("Edit Device"));

    waitFor(() => {
      expect(editDeviceMock).toHaveBeenCalledWith(
        0,
        "Device 1 Edited",
        "Room 2",
      );
    });
  });

  it("should show error message if fields are not filled", async () => {
    renderComponent();

    fireEvent.click(screen.getAllByRole("button", { tabindex: 0 })[1]);

    fireEvent.change(screen.getByLabelText("Device Name"), {
      target: { value: "" },
    });

    fireEvent.click(screen.getByText("Edit Device"));

    await waitFor(() => {
      expect(
        screen.getByText("Please fill out all fields!"),
      ).toBeInTheDocument();
    });
  });

  it("should show success message when device is edited", async () => {
    const editDeviceMock = vi.fn();
    renderComponent({ editDevice: editDeviceMock });

    fireEvent.click(screen.getAllByRole("button", { tabindex: 0 })[1]);

    fireEvent.change(screen.getByLabelText("Device Name"), {
      target: { value: "Device 1 Edited" },
    });

    fireEvent.click(screen.getByText("Edit Device"));

    await waitFor(() => {
      expect(screen.getByText("Device edited!")).toBeInTheDocument();
    });
  });
});
