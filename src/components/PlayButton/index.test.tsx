import { render, screen, fireEvent } from "@testing-library/react";
import PlayButton from "./";

describe("PlayButton", () => {
  it("should render the button with the correct text", () => {
    render(<PlayButton text="Play" action={jest.fn()} />);

    expect(screen.getByText("Play")).toBeInTheDocument();
  });

  it("should call the action function when clicked", () => {
    const actionMock = jest.fn();

    render(<PlayButton text="Play" action={actionMock} />);

    const button = screen.getByText("Play");
    fireEvent.click(button);

    expect(actionMock).toHaveBeenCalledTimes(1);
  });
});
