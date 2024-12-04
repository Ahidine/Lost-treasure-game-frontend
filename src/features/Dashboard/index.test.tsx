import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Dashboard from "./";

const mockStore = configureStore([]);

describe("Dashboard Component", () => {
  let store: any;

  beforeEach(() => {
    store = mockStore({
      user: {
        name: "Alice",
        email: "alice@example.com",
        treasures: [
          { name: "Trésor 1", date: "2024-01-01", attempts: 3 },
          { name: "Trésor 2", date: "2024-01-02", attempts: 5 },
        ],
      },
    });
  });

  it("affiche les informations utilisateur correctement", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Dashboard />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText("Bienvenue, Alice ! 👋")).toBeInTheDocument();
    expect(screen.getByText("Email : alice@example.com")).toBeInTheDocument();
    expect(screen.getByText("2 / 20 Trésors Trouvés 🏅")).toBeInTheDocument();
  });

  it("affiche les trésors trouvés", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Dashboard />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText("Trésors Gagnés 🏆")).toBeInTheDocument();
    expect(screen.getByText("Trésor 1 🎉")).toBeInTheDocument();
    expect(screen.getByText("Trouvé le 2024-01-01")).toBeInTheDocument();
    expect(screen.getByText("Essais : 3 💡")).toBeInTheDocument();
  });

  it("affiche un message de motivation si aucun trésor n'est trouvé", () => {
    store = mockStore({
      user: {
        name: "Bob",
        email: "bob@example.com",
        treasures: [],
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Dashboard />
        </MemoryRouter>
      </Provider>
    );

    expect(
      screen.getByText("Pas encore de trésor trouvé... 😔")
    ).toBeInTheDocument();
    expect(screen.getByText("Commencer l'aventure 🎲")).toBeInTheDocument();
  });
});
