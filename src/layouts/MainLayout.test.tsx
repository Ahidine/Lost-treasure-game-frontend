import { render, screen } from "@testing-library/react";
import MainLayout from "./MainLayout";

describe("MainLayout", () => {
  it("should render the children correctly", () => {
    render(
      <MainLayout>
        <div>Test content</div>
      </MainLayout>
    );

    expect(screen.getByText("Test content")).toBeInTheDocument();
  });
});
