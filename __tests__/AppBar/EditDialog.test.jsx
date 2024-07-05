// EditDialog.test.jsx
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter as Router } from "react-router-dom";
import EditDialog from "../../src/components/AppBar/EditDialog";
import React from "react";

describe("EditDialog", () => {
  const mockRooms = [{ name: "Room 1" }, { name: "Room 2" }];
  const mockCards = {
    pc: [[{ type: "Type 1", room: "Room 1", i: "0", x: 0, y: 0, w: 1, h: 1 }]],
    tablet: [[]],
    mobile: [[]],
  };

  const renderComponent = (props) => {
    render(
      <Router>
        <EditDialog
          openEditDialog={true}
          handleCloseEditDialog={() => {}}
          handleCardAdd={() => {}}
          handleCardDelete={() => {}}
          handleDeleteDashboard={() => {}}
          handleAddDashboard={() => {}}
          handleSetLayout={() => {}}
          cards={mockCards}
          rooms={mockRooms}
          {...props}
        />
      </Router>,
    );
  };

  it('should render the EditDialog with the title "Edit"', () => {
    renderComponent();
    expect(screen.getByText("Edit")).toBeInTheDocument();
  });

  it('should add a new dashboard when "+ Dashboard" button is clicked', () => {
    const handleAddDashboardMock = vi.fn();
    renderComponent({ handleAddDashboard: handleAddDashboardMock });

    fireEvent.click(screen.getByText("+ Dashboard"));
    expect(handleAddDashboardMock).toHaveBeenCalledWith("pc");
  });

  it('should open the EditDialogAdd when "+ Card" button is clicked', () => {
    renderComponent();

    fireEvent.click(screen.getByText("+ Card"));
    expect(screen.getByText("Add Card")).toBeInTheDocument();
  });

  it("should switch between device modes when the device buttons are clicked", () => {
    renderComponent();

    fireEvent.click(screen.getByText("Tablet"));
    expect(screen.getByRole("button", { name: /tablet/i })).toHaveClass(
      "MuiButton-contained",
    );

    fireEvent.click(screen.getByText("Mobile"));
    expect(screen.getByRole("button", { name: /mobile/i })).toHaveClass(
      "MuiButton-contained",
    );

    fireEvent.click(screen.getByText("PC"));
    expect(screen.getByRole("button", { name: /pc/i })).toHaveClass(
      "MuiButton-contained",
    );
  });
});
