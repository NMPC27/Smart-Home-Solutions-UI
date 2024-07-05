import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import dayjs from "dayjs";
import BasicDatePicker from "../../src/components/AppBar/BasicDatePicker";

describe("BasicDatePicker", () => {
  it("should display the current date as the label on initial render", () => {
    render(<BasicDatePicker handleDateChange={() => {}} />);

    const today = dayjs().format("DD/MM/YYYY");
    expect(screen.getByLabelText(today)).toBeInTheDocument();
  });

  it("should update the label and call handleDateChange on date selection", () => {
    const handleDateChangeMock = vi.fn();
    render(<BasicDatePicker handleDateChange={handleDateChangeMock} />);

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "01/01/2022" } });

    // Verify that handleDateChange was called with the correct date
    expect(handleDateChangeMock).toHaveBeenCalledWith("01/01/2022");
  });
});
