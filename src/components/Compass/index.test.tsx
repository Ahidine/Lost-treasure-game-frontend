import { render, screen } from "@testing-library/react";
import Compass from "./";

describe("Compass", () => {
  it("should render all directions correctly", () => {
    render(<Compass />);
    expect(screen.getByText("N")).toBeInTheDocument();
    expect(screen.getByText("S")).toBeInTheDocument();
    expect(screen.getByText("E")).toBeInTheDocument();
    expect(screen.getByText("O")).toBeInTheDocument();
  });
});
