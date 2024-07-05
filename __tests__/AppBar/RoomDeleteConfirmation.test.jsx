// RoomDeleteConfirmation.test.jsx
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import RoomDeleteConfirmation from "../../src/components/AppBar/RoomDeleteConfirmation";

describe("RoomDeleteConfirmation", () => {
  const rooms = [
    { name: "Living Room" },
    { name: "Kitchen" },
    { name: "Bedroom" },
  ];

  const devices = [
    { name: "Light Bulb", room: "Living Room" },
    { name: "Thermostat", room: "Kitchen" },
    { name: "Security Camera", room: "Bedroom" },
    { name: "Smart Lock", room: "Living Room" },
  ];

  const renderComponent = (props) => {
    render(
      <RoomDeleteConfirmation
        openRoomDeleteConfirmation={true}
        handleCloseRoomDeleteConfirmation={() => {}}
        handleCloseRoomDeleteConfirmationOK={() => {}}
        rooms={rooms}
        deleteIdx={0} // Mocking the deleteIdx for testing purposes
        devices={devices}
        {...props}
      />,
    );
  };

  it("should render the RoomDeleteConfirmation with the correct title and room name", () => {
    renderComponent();

    expect(
      screen.getByText(`Delete Room? - ${rooms[0].name}`),
    ).toBeInTheDocument();
  });

  it("should display the correct devices associated with the room to be deleted", () => {
    renderComponent();

    expect(screen.getByText("• Light Bulb")).toBeInTheDocument();
    expect(screen.getByText("• Smart Lock")).toBeInTheDocument();
    expect(screen.queryByText("• Thermostat")).not.toBeInTheDocument(); // Check that other devices are not shown
  });

  it('should call handleCloseRoomDeleteConfirmation when "NO" button is clicked', () => {
    const handleCloseRoomDeleteConfirmationMock = vi.fn();
    renderComponent({
      handleCloseRoomDeleteConfirmation: handleCloseRoomDeleteConfirmationMock,
    });

    fireEvent.click(screen.getByText("NO"));
    expect(handleCloseRoomDeleteConfirmationMock).toHaveBeenCalled();
  });

  it('should call handleCloseRoomDeleteConfirmationOK when "YES" button is clicked', () => {
    const handleCloseRoomDeleteConfirmationOKMock = vi.fn();
    renderComponent({
      handleCloseRoomDeleteConfirmationOK:
        handleCloseRoomDeleteConfirmationOKMock,
    });

    fireEvent.click(screen.getByText("YES"));
    expect(handleCloseRoomDeleteConfirmationOKMock).toHaveBeenCalled();
  });

  // Add more tests as needed
});
