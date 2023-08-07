import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import MessageSend from "./MessageSend";

describe("MessageSend", () => {
  test("renders MessageSend component", () => {
    render(<MessageSend text="testing" datetime={new Date()} />);
    expect(screen.getByText(/testing/i)).toBeDefined();
  });
});