import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import InputMessage from "./InputMessage";

describe("InputMessage", () => {
  test("renders InputMessage component", () => {
    render(<InputMessage />);
    expect(screen.getByRole("textbox")).toBeDefined();
  });
});