import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom'
import App from "./App";

test("renders the App component", () => {
  render(<App />);
  
  // Assert that the Vite logo is rendered
  const viteLogo = screen.getByAltText("Vite logo");
  expect(viteLogo).toBeInTheDocument();

  // Assert that the React logo is rendered
  const reactLogo = screen.getByAltText("React logo");
  expect(reactLogo).toBeInTheDocument();

  // Assert that the count is initially 0
  const countText = screen.getByText(/count is 0/i);
  expect(countText).toBeInTheDocument();

  // Simulate a click on the button and assert that the count is incremented
  const button = screen.getByText(/count is 0/i);
  fireEvent.click(button);
  expect(countText).toHaveTextContent(/count is 1/i);
});

