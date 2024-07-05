// EditDialogAdd.test.jsx
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import EditDialogAdd from "../../src/components/AppBar/EditDialogAdd";
import React from "react";

describe("EditDialogAdd", () => {
  const renderComponent = (props) => {
    render(
      <EditDialogAdd
        openEditDialogAdd={true}
        handleCloseEditDialogAdd={() => {}}
        handleCardAdd={() => {}}
        device="pc"
        selectedTab={0}
        {...props}
      />,
    );
  };

  it('should render the EditDialogAdd with the title "Add Card"', () => {
    renderComponent();
    expect(screen.getByText("Add Card")).toBeInTheDocument();
  });

  it('should show an error message when "Apply" is clicked without selecting a type', async () => {
    renderComponent();

    fireEvent.click(screen.getByText("Apply"));
    await waitFor(() =>
      expect(screen.getByText("Select a Type!")).toBeInTheDocument(),
    );
  });

  it('should call handleCardAdd with correct parameters when a type is selected and "Apply" is clicked', () => {
    const handleCardAddMock = vi.fn();
    const handleCloseEditDialogAddMock = vi.fn();
    renderComponent({
      handleCardAdd: handleCardAddMock,
      handleCloseEditDialogAdd: handleCloseEditDialogAddMock,
    });

    fireEvent.mouseDown(screen.getByLabelText("Type"));
    fireEvent.click(screen.getByText("Light"));
    fireEvent.click(screen.getByText("Apply"));

    expect(handleCardAddMock).toHaveBeenCalledWith("pc", 0, "Light");
    expect(handleCloseEditDialogAddMock).toHaveBeenCalled();
  });

  it('should close the dialog when "Cancel" is clicked', () => {
    const handleCloseEditDialogAddMock = vi.fn();
    renderComponent({ handleCloseEditDialogAdd: handleCloseEditDialogAddMock });

    fireEvent.click(screen.getByText("Cancel"));
    expect(handleCloseEditDialogAddMock).toHaveBeenCalled();
  });

  it("should show a success message when a card is successfully added", async () => {
    const handleCardAddMock = vi.fn();
    const handleCloseEditDialogAddMock = vi.fn();
    renderComponent({
      handleCardAdd: handleCardAddMock,
      handleCloseEditDialogAdd: handleCloseEditDialogAddMock,
    });

    fireEvent.mouseDown(screen.getByLabelText("Type"));
    fireEvent.click(screen.getByText("Light"));
    fireEvent.click(screen.getByText("Apply"));

    await waitFor(() =>
      expect(screen.getByText("Card added!")).toBeInTheDocument(),
    );
  });
});
