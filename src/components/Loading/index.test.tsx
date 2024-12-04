import { render, screen } from "@testing-library/react";
import LoadingPage from "./";

describe("LoadingPage", () => {
  it("should render the loading modal correctly", () => {
    render(<LoadingPage />);

    expect(screen.getByText("Chargement...")).toBeInTheDocument();

    expect(
      screen.getByText("Veuillez patienter un instant.")
    ).toBeInTheDocument();
  });
});
