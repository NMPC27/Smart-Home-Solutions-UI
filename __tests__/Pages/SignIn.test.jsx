import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { doLogin } from "../../src/components/API";
import SignIn from "../../src/pages/SignIn";
import "@testing-library/jest-dom";

// Mock the doLogin API
vi.mock("../../src/components/API");

// Mock useNavigate specifically
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

describe("SignIn Component", () => {
  beforeEach(() => {
    doLogin.mockClear();
  });

  it("renders the sign-in form", () => {
    render(
      <MemoryRouter>
        <SignIn />
      </MemoryRouter>,
    );

    expect(screen.getByText(/Sign In/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
  });

  it("shows error message if fields are not filled", async () => {
    render(
      <MemoryRouter>
        <SignIn />
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByText(/Log In/i));

    expect(
      await screen.findByText(/Please fill out all the fields!/i),
    ).toBeInTheDocument();
  });

  it("shows error message on API error", async () => {
    doLogin.mockRejectedValue({ response: { status: 400 } });

    render(
      <MemoryRouter>
        <SignIn />
      </MemoryRouter>,
    );

    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "john.doe@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: "InvalidPassword1!" },
    });
    fireEvent.click(screen.getByText(/Log In/i));

    expect(await screen.findByText(/Error 400/i)).toBeInTheDocument();
  });
});
