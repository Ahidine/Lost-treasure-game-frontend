import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Home from "./";

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

const mockStore = configureStore([]);

describe("Home Component", () => {
  let store: any;

  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it("navigue vers /play si l'utilisateur est authentifié", () => {
    store = mockStore({
      user: {
        isAuthenticated: true,
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </Provider>
    );

    const playButton = screen.getByText("Commencer l'aventure");
    expect(playButton).toBeInTheDocument();

    fireEvent.click(playButton);

    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith("/play");
  });

  it("navigue vers /auth si l'utilisateur n'est pas authentifié", () => {
    store = mockStore({
      user: {
        isAuthenticated: false,
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </Provider>
    );

    const playButton = screen.getByText("Commencer l'aventure");
    expect(playButton).toBeInTheDocument();

    fireEvent.click(playButton);

    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith("/auth");
  });

  it("rend correctement le bouton 'Commencer l'aventure'", () => {
    store = mockStore({
      user: {
        isAuthenticated: false,
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText("Commencer l'aventure")).toBeInTheDocument();
  });
});
