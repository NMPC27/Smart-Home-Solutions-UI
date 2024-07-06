import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import {
  BaseEdge,
  EdgeLabelRenderer,
  getBezierPath,
  useReactFlow,
} from "reactflow";
import CustomEdge from "../../src/components/Automation/CustomEdge";
import "@testing-library/jest-dom";

vi.mock("reactflow", () => ({
  BaseEdge: ({ path, markerEnd, style }) => (
    <path d={path} markerEnd={markerEnd} style={style} />
  ),
  EdgeLabelRenderer: ({ children }) => <div>{children}</div>,
  getBezierPath: vi.fn(() => ["M0,0 C50,50 50,50 100,100", 50, 50]),
  useReactFlow: vi.fn(),
}));

describe("CustomEdge Component", () => {
  let setEdgesMock;

  beforeEach(() => {
    setEdgesMock = vi.fn();
    useReactFlow.mockReturnValue({
      setEdges: setEdgesMock,
    });
  });

  const defaultProps = {
    id: "1",
    sourceX: 0,
    sourceY: 0,
    targetX: 100,
    targetY: 100,
    sourcePosition: "bottom",
    targetPosition: "top",
    style: {},
    markerEnd: "arrow",
  };

  it("renders correctly", () => {
    render(<CustomEdge {...defaultProps} />);
    const button = screen.getByRole("button", { name: /×/i });
    expect(button).toBeInTheDocument();
  });

  it("removes the edge when the button is clicked", () => {
    render(<CustomEdge {...defaultProps} />);
    const button = screen.getByRole("button", { name: /×/i });
    fireEvent.click(button);
    expect(setEdgesMock).toHaveBeenCalled();
    expect(setEdgesMock).toHaveBeenCalledWith(expect.any(Function));
  });
});
