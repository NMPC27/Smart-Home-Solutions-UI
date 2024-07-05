// RoomDialog.test.jsx
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import RoomDialog from "../../src/components/AppBar/RoomDialog";

describe("RoomDialog", () => {
  const rooms = [
    { name: "Living Room" },
    { name: "Kitchen" },
    { name: "Bedroom" },
  ];

  const devices = [
    { room: "Living Room" },
    { room: "Kitchen" },
    { room: "Bedroom" },
  ];

  const handleCloseRoomDialogMock = vi.fn();
  const handleRoomAddMock = vi.fn();
  const handleDeleteRoomMock = vi.fn();
  const editRoomNameMock = vi.fn();

  const renderComponent = (props) => {
    render(
      <RoomDialog
        openRoomDialog={true}
        handleCloseRoomDialog={handleCloseRoomDialogMock}
        handleRoomAdd={handleRoomAddMock}
        rooms={rooms}
        handleDeleteRoom={handleDeleteRoomMock}
        editRoomName={editRoomNameMock}
        devices={devices}
        {...props}
      />,
    );
  };

  it("should render the RoomDialog with the correct title", () => {
    renderComponent();

    expect(screen.getByText("Rooms")).toBeInTheDocument();
  });

  it("should display existing rooms and allow editing/deleting", () => {
    renderComponent();

    expect(screen.getByText("Living Room")).toBeInTheDocument();
    expect(screen.getByText("Kitchen")).toBeInTheDocument();
    expect(screen.getByText("Bedroom")).toBeInTheDocument();

    fireEvent.click(screen.getAllByRole("button", { tabindex: 0 })[1]);

    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("should call handleRoomAdd when adding a new room", async () => {
    renderComponent();

    fireEvent.change(screen.getByLabelText("Room Name"), {
      target: { value: "New Room" },
    });

    fireEvent.click(screen.getByText("+ ADD"));

    await waitFor(() => {
      expect(handleRoomAddMock).toHaveBeenCalledWith("New Room");
    });
  });

  // Add more tests as needed
});
