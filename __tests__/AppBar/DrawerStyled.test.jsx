// DrawerStyled.test.jsx
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import "@testing-library/jest-dom"; // Importing jest-dom matchers
import DrawerStyled from "../../src/components/AppBar/DrawerStyled";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { getUser } from "../../src/components/API";

// Mock the navigate function from react-router-dom
vi.mock("react-router-dom", () => ({
  ...vi.importActual("react-router-dom"),
  useNavigate: () => vi.fn(),
}));

// Mock the getUser API function
vi.mock("../../src/components/API", () => ({
  getUser: vi.fn(),
}));

const mockGetUser = getUser;

const mockProps = {
  openDrawer: true,
  handleCloseDrawer: vi.fn(),
  navbar: "dashboard",
};

describe("DrawerStyled Component", () => {
  beforeEach(() => {
    // Mock the getUser API response
    mockGetUser.mockResolvedValue({ data: "John Doe" });

    render(
      <MemoryRouter>
        <DrawerStyled {...mockProps} />
      </MemoryRouter>,
    );
  });

  it("renders the drawer with navigation buttons and user information", async () => {
    // Wait for the API call to complete and update the state
    await waitFor(() =>
      expect(screen.getByText("John Doe")).toBeInTheDocument(),
    );

    expect(screen.getByText("Smartify")).toBeInTheDocument();
    expect(screen.getByText("DASHBOARD")).toBeInTheDocument();
    expect(screen.getByText("AUTOMATION")).toBeInTheDocument();
    expect(screen.getByText("BUILDING")).toBeInTheDocument();
    expect(screen.getByText("HISTORY")).toBeInTheDocument();
    expect(screen.getByText("ENERGY")).toBeInTheDocument();
    expect(screen.getByText("Logout")).toBeInTheDocument();
  });

  it("calls handleCloseDrawer when the menu icon is clicked", () => {
    fireEvent.click(screen.getByTestId("MenuIcon"));
    expect(mockProps.handleCloseDrawer).toHaveBeenCalled();
  });

  it("navigates to the correct page when a navigation button is clicked", () => {
    const navigate = require("react-router-dom").useNavigate();

    fireEvent.click(screen.getByText("DASHBOARD"));
    expect(navigate).toHaveBeenCalledWith("/dashboard");

    fireEvent.click(screen.getByText("AUTOMATION"));
    expect(navigate).toHaveBeenCalledWith("/automation");

    fireEvent.click(screen.getByText("BUILDING"));
    expect(navigate).toHaveBeenCalledWith("/building");

    fireEvent.click(screen.getByText("HISTORY"));
    expect(navigate).toHaveBeenCalledWith("/history");

    fireEvent.click(screen.getByText("ENERGY"));
    expect(navigate).toHaveBeenCalledWith("/energy");
  });

  it("logs out the user when the logout button is clicked", () => {
    const navigate = require("react-router-dom").useNavigate();

    fireEvent.click(screen.getByText("Logout"));
    expect(navigate).toHaveBeenCalledWith("/");
  });

  it("displays an error message when the getUser API call fails", async () => {
    mockGetUser.mockRejectedValue({ response: { status: 404 } });

    render(
      <MemoryRouter>
        <DrawerStyled {...mockProps} />
      </MemoryRouter>,
    );

    await waitFor(() =>
      expect(screen.getByText("Error 404")).toBeInTheDocument(),
    );
  });
});
