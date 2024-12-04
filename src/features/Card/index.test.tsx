import { render, screen } from "@testing-library/react";
import Card from "./";

describe("Card Component", () => {
  it("affiche le numéro lorsque la carte n'est pas retournée", () => {
    render(<Card treasure={false} number={5} flipped={false} />);
    expect(screen.getByText("5")).toBeInTheDocument();
    expect(screen.queryByText("Trésor !")).not.toBeInTheDocument();
    expect(screen.queryByText("Raté !")).not.toBeInTheDocument();
  });

  it("affiche 'Trésor !' lorsque la carte est retournée et contient un trésor", () => {
    render(<Card treasure={true} number={5} flipped={true} />);
    expect(screen.getByText("Trésor !")).toBeInTheDocument();
    expect(screen.queryByText("5")).not.toBeInTheDocument();
    expect(screen.queryByText("Raté !")).not.toBeInTheDocument();
  });

  it("affiche 'Raté !' lorsque la carte est retournée et ne contient pas de trésor", () => {
    render(<Card treasure={false} number={5} flipped={true} />);
    expect(screen.getByText("Raté !")).toBeInTheDocument();
    expect(screen.queryByText("5")).not.toBeInTheDocument();
    expect(screen.queryByText("Trésor !")).not.toBeInTheDocument();
  });
});
