import { render, screen, fireEvent } from "@testing-library/react";
import Modal from "./";

describe("Modal", () => {
  it("should render the modal with the correct title and description", () => {
    render(
      <Modal
        title="Modal Title"
        description="This is the description of the modal"
        action={jest.fn()}
        textAction="Confirm"
      />
    );

    expect(screen.getByText("Modal Title")).toBeInTheDocument();
    expect(
      screen.getByText("This is the description of the modal")
    ).toBeInTheDocument();
  });

  it("should call the action function when the button is clicked", () => {
    const actionMock = jest.fn();

    render(
      <Modal
        title="Modal Title"
        description="This is the description of the modal"
        action={actionMock}
        textAction="Confirm"
      />
    );

    const button = screen.getByText("Confirm");
    fireEvent.click(button);

    expect(actionMock).toHaveBeenCalledTimes(1);
  });

  it("should display the correct button text", () => {
    render(
      <Modal
        title="Modal Title"
        description="This is the description of the modal"
        action={jest.fn()}
        textAction="Confirm"
      />
    );

    expect(screen.getByText("Confirm")).toBeInTheDocument();
  });
});
