import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import MessageReceive from "./MessageReceive";

describe("MessageReceive", () => {
  test("renders MessageReceive component", () => {
    render(<MessageReceive sender="testing" text="testing text" datetime={new Date()} />);
    expect(screen.getByText(/testing text/i)).toBeDefined();
  });
});