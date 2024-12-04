import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import NotFound from "./";

describe("NotFound", () => {
  it("should render the 404 message and description", () => {
    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>
    );

    expect(screen.getByText("404")).toBeInTheDocument();

    expect(
      screen.getByText(/oops ! 😢 la page que vous cherchez n'existe pas\. 🗺️/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /pas de panique ! vous pouvez toujours retourner à l'accueil/i
      )
    ).toBeInTheDocument();
  });

  it("should render a link to the homepage", () => {
    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>
    );

    const link = screen.getByRole("link", { name: /retour à l'accueil/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/");
  });
});
