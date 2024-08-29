/// AppBarStyled.test.jsx
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import AppBarStyled from "../../src/components/AppBar/AppBarStyled";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

describe("AppBarStyled", () => {
  const mockNotifications = [
    { msg: "Notification 1" },
    { msg: "Notification 2" },
  ];
  const mockRooms = [{ name: "Room 1" }, { name: "Room 2" }];
  const mockDevices = [{ name: "Device 1", type: "Type 1", room: "Room 1" }];
  const mockCards = {
    pc: [[{ i: "0", type: "Light", x: 0, y: 3, w: 1, h: 2 }], []],
  };

  const renderComponent = (props) => {
    render(
      <Router>
        <AppBarStyled
          navbar="dashboard"
          devices={mockDevices}
          rooms={mockRooms}
          cards={mockCards}
          notifications={mockNotifications}
          handleDateChange={() => {}}
          handleDeleteNotification={() => {}}
          handleRoomAdd={() => {}}
          handleDeleteRoom={() => {}}
          editRoomName={() => {}}
          editDevice={() => {}}
          handleCardAdd={() => {}}
          handleCardDelete={() => {}}
          handleSetLayout={() => {}}
          handleAddDashboard={() => {}}
          handleDeleteDashboard={() => {}}
          {...props}
        />
      </Router>,
    );
  };

  it('should render the AppBar with the title "Smartify"', () => {
    renderComponent();
    expect(screen.getByText("Smartify")).toBeInTheDocument();
  });

  it('should open the room dialog when the "ROOMS" button is clicked', () => {
    renderComponent();

    fireEvent.click(screen.getByText("ROOMS"));
    expect(screen.getByRole("dialog", { name: /rooms/i })).toBeInTheDocument();
  });

  it('should open the device dialog when the "DEVICES" button is clicked', () => {
    renderComponent();

    fireEvent.click(screen.getByText("DEVICES"));
    expect(
      screen.getByRole("dialog", { name: /devices/i }),
    ).toBeInTheDocument();
  });

  it("should show notifications when the notifications icon is clicked", async () => {
    const handleDeleteNotificationMock = vi.fn();
    renderComponent({ handleDeleteNotification: handleDeleteNotificationMock });

    fireEvent.click(screen.getAllByRole("button", { tabindex: "0" })[4]);
    await waitFor(() =>
      expect(screen.getByText("Notification 1")).toBeInTheDocument(),
    );
    await waitFor(() =>
      expect(screen.getByText("Notification 2")).toBeInTheDocument(),
    );
  });

  it("should delete a notification when the delete icon is clicked", async () => {
    const handleDeleteNotificationMock = vi.fn();
    renderComponent({ handleDeleteNotification: handleDeleteNotificationMock });

    fireEvent.click(screen.getAllByRole("button", { tabindex: "0" })[4]);
    await waitFor(() =>
      expect(screen.getByText("Notification 1")).toBeInTheDocument(),
    );

    fireEvent.click(screen.getAllByRole("button", { tabindex: "0" })[0]);
    expect(handleDeleteNotificationMock).toHaveBeenCalledWith(1); // length -1
  });
});
