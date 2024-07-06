import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import NotFound from "../../src/pages/NotFound";
import "@testing-library/jest-dom";

// Mock useNavigate specifically
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

describe("NotFound Component", () => {
  it("renders the not found page", () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>,
    );

    expect(screen.getByText(/404/i)).toBeInTheDocument();
    expect(screen.getByText(/Page Not Found/i)).toBeInTheDocument();
    expect(screen.getByText(/Return Home/i)).toBeInTheDocument();
  });
});
