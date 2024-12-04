import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import Auth from "./";

const mockStore = configureStore();
const mockDispatch = jest.fn();

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => mockDispatch,
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
}));

describe("Auth Component", () => {
  let store: any;

  beforeEach(() => {
    store = mockStore({
      user: {
        isAuthenticated: false,
        loading: false,
      },
    });
  });

  it("renders the login form by default", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Auth />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText("Connexion")).toBeInTheDocument();
    expect(screen.getByLabelText("Adresse e-mail")).toBeInTheDocument();
    expect(screen.getByLabelText("Mot de passe")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /se connecter/i })
    ).toBeInTheDocument();
  });

  it("toggles to the registration form when clicking the toggle link", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Auth />
        </BrowserRouter>
      </Provider>
    );

    fireEvent.click(screen.getByText(/pas encore inscrit/i));

    expect(screen.getByText("Enregistrement")).toBeInTheDocument();
    expect(screen.getByLabelText("Nom d'utilisateur")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /s'enregistrer/i })
    ).toBeInTheDocument();
  });

  it("dispatches login action on form submission", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Auth />
        </BrowserRouter>
      </Provider>
    );

    fireEvent.change(screen.getByLabelText("Adresse e-mail"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Mot de passe"), {
      target: { value: "password123" },
    });
    fireEvent.click(screen.getByRole("button", { name: /se connecter/i }));

    expect(mockDispatch).toHaveBeenCalled();
  });

  it("dispatches register action on registration form submission", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Auth />
        </BrowserRouter>
      </Provider>
    );

    fireEvent.click(screen.getByText(/pas encore inscrit/i));

    fireEvent.change(screen.getByLabelText("Nom d'utilisateur"), {
      target: { value: "Test User" },
    });
    fireEvent.change(screen.getByLabelText("Adresse e-mail"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Mot de passe"), {
      target: { value: "password123" },
    });
    fireEvent.click(screen.getByRole("button", { name: /s'enregistrer/i }));

    expect(mockDispatch).toHaveBeenCalled();
  });

  it("renders the loading page when loading is true", () => {
    store = mockStore({
      user: {
        isAuthenticated: false,
        loading: true,
      },
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Auth />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText(/chargement/i)).toBeInTheDocument();
  });
});
