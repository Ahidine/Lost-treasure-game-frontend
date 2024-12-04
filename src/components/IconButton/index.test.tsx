import { render, screen, fireEvent } from "@testing-library/react";
import IconButton from "./";

describe("IconButton", () => {
  it("should render the button with the correct icon and text", () => {
    const MockIcon = () => <svg data-testid="mock-icon" />;

    render(
      <IconButton icon={<MockIcon />} text="Click me" action={jest.fn()} />
    );

    expect(screen.getByTestId("mock-icon")).toBeInTheDocument();
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("should call the action function when clicked", () => {
    const actionMock = jest.fn();

    render(
      <IconButton
        icon={<svg data-testid="mock-icon" />}
        text="Click me"
        action={actionMock}
      />
    );

    const button = screen.getByRole("button", { name: /click me/i });
    fireEvent.click(button);

    expect(actionMock).toHaveBeenCalledTimes(1);
  });
});
