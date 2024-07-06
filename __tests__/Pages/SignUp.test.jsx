import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import SignUp from "../../src/pages/SignUp";
import { signUp } from "../../src/components/API";
import * as router from "react-router-dom";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";

// Mock the signUp API and useNavigate
vi.mock("../../src/components/API");

// Mock useNavigate specifically
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

describe("SignUp Component", () => {
  beforeEach(() => {
    signUp.mockClear();
  });

  it("renders the sign-up form", () => {
    render(
      <MemoryRouter>
        <SignUp />
      </MemoryRouter>,
    );

    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Phone/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Confirm Password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Token/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Domain/i)).toBeInTheDocument();
  });

  it("shows error message if fields are not filled", async () => {
    render(
      <MemoryRouter>
        <SignUp />
      </MemoryRouter>,
    );

    fireEvent.click(screen.getAllByRole("button", { name: "Sign Up" })[0]);

    expect(
      await screen.findByText(/Please fill out all the fields!/i),
    ).toBeInTheDocument();
  });
});
