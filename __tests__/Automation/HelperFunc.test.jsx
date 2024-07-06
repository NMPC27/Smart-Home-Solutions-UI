// HelperFunc.test.jsx

import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import React from "react";
import HelperFunc from "../../src/components/Automation/HelperFunc";
import "@testing-library/jest-dom";

describe("HelperFunc Component", () => {
  const mockFunctions = {
    clearNodeData: vi.fn(),
    eventData: vi.fn(),
    deviceData: vi.fn(),
    timeData: vi.fn(),
    waitData: vi.fn(),
  };

  const defaultProps = {
    data: { some: "data" },
    target: "",
    ...mockFunctions,
    nodesData: { nodes: "data" },
  };

  it("calls clearNodeData when target is clearNodeData", () => {
    render(<HelperFunc {...defaultProps} target="clearNodeData" />);
    expect(mockFunctions.clearNodeData).toHaveBeenCalledWith(
      defaultProps.data,
      defaultProps.nodesData,
    );
  });

  it("calls eventData when target is eventData", () => {
    render(<HelperFunc {...defaultProps} target="eventData" />);
    expect(mockFunctions.eventData).toHaveBeenCalledWith(
      defaultProps.data,
      defaultProps.nodesData,
    );
  });

  it("calls deviceData when target is deviceData", () => {
    render(<HelperFunc {...defaultProps} target="deviceData" />);
    expect(mockFunctions.deviceData).toHaveBeenCalledWith(
      defaultProps.data,
      defaultProps.nodesData,
    );
  });

  it("calls timeData when target is timeData", () => {
    render(<HelperFunc {...defaultProps} target="timeData" />);
    expect(mockFunctions.timeData).toHaveBeenCalledWith(
      defaultProps.data,
      defaultProps.nodesData,
    );
  });

  it("calls waitData when target is waitData", () => {
    render(<HelperFunc {...defaultProps} target="waitData" />);
    expect(mockFunctions.waitData).toHaveBeenCalledWith(
      defaultProps.data,
      defaultProps.nodesData,
    );
  });

  it("does not call any function when data is null", () => {
    render(<HelperFunc {...defaultProps} data={null} target="eventData" />);
    expect(mockFunctions.eventData).not.toHaveBeenCalled();
    expect(mockFunctions.clearNodeData).not.toHaveBeenCalled();
    expect(mockFunctions.deviceData).not.toHaveBeenCalled();
    expect(mockFunctions.timeData).not.toHaveBeenCalled();
    expect(mockFunctions.waitData).not.toHaveBeenCalled();
  });

  it("does not call any function when target is null", () => {
    render(<HelperFunc {...defaultProps} target={null} />);
    expect(mockFunctions.eventData).not.toHaveBeenCalled();
    expect(mockFunctions.clearNodeData).not.toHaveBeenCalled();
    expect(mockFunctions.deviceData).not.toHaveBeenCalled();
    expect(mockFunctions.timeData).not.toHaveBeenCalled();
    expect(mockFunctions.waitData).not.toHaveBeenCalled();
  });
});
