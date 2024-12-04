import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { MemoryRouter } from "react-router-dom";
import ActionButtons from "./";
import { logout } from "../../store/slices/userSlice";

const mockDispatch = jest.fn();
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => mockDispatch,
}));

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

const mockOpenModal = jest.fn();
const mockCloseModal = jest.fn();
const mockShowHint = jest.fn();
const mockStartNewGame = jest.fn();

const mockStore = configureStore([]);

describe("ActionButtons Component", () => {
  let store: any;

  beforeEach(() => {
    store = mockStore({});
    mockDispatch.mockClear();
    mockNavigate.mockClear();
    mockOpenModal.mockClear();
    mockCloseModal.mockClear();
    mockShowHint.mockClear();
    mockStartNewGame.mockClear();
  });

  it("rend tous les boutons avec le texte et les icônes correspondants", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ActionButtons
            openModal={mockOpenModal}
            closeModal={mockCloseModal}
            showHint={mockShowHint}
            startNewGame={mockStartNewGame}
          />
        </MemoryRouter>
      </Provider>
    );

    const buttonTexts = [
      "Accueil",
      "Coffre aux Trésors",
      "Aide",
      "Indice",
      "Restaurer",
      "Se déconnecter",
    ];

    buttonTexts.forEach((text) => {
      expect(screen.getByText(text)).toBeInTheDocument();
    });
  });

  it("navigue vers la page Accueil lorsqu'on clique sur le bouton 'Accueil'", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ActionButtons
            openModal={mockOpenModal}
            closeModal={mockCloseModal}
            showHint={mockShowHint}
            startNewGame={mockStartNewGame}
          />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.click(screen.getByText("Accueil"));
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  it("navigue vers la page Coffre aux Trésors lorsqu'on clique sur 'Coffre aux Trésors'", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ActionButtons
            openModal={mockOpenModal}
            closeModal={mockCloseModal}
            showHint={mockShowHint}
            startNewGame={mockStartNewGame}
          />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.click(screen.getByText("Coffre aux Trésors"));
    expect(mockNavigate).toHaveBeenCalledWith("/dashboard");
  });

  it("ouvre une modal d'aide lorsqu'on clique sur 'Aide'", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ActionButtons
            openModal={mockOpenModal}
            closeModal={mockCloseModal}
            showHint={mockShowHint}
            startNewGame={mockStartNewGame}
          />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.click(screen.getByText("Aide"));
    expect(mockOpenModal).toHaveBeenCalled();
  });

  it("affiche un indice lorsqu'on clique sur 'Indice'", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ActionButtons
            openModal={mockOpenModal}
            closeModal={mockCloseModal}
            showHint={mockShowHint}
            startNewGame={mockStartNewGame}
          />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.click(screen.getByText("Indice"));
    expect(mockShowHint).toHaveBeenCalled();
  });

  it("ouvre une modal de restauration lorsqu'on clique sur 'Restaurer'", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ActionButtons
            openModal={mockOpenModal}
            closeModal={mockCloseModal}
            showHint={mockShowHint}
            startNewGame={mockStartNewGame}
          />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.click(screen.getByText("Restaurer"));
    expect(mockOpenModal).toHaveBeenCalled();
  });

  it("déconnecte l'utilisateur et navigue vers Accueil lorsqu'on clique sur 'Se déconnecter'", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ActionButtons
            openModal={mockOpenModal}
            closeModal={mockCloseModal}
            showHint={mockShowHint}
            startNewGame={mockStartNewGame}
          />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.click(screen.getByText("Se déconnecter"));
    expect(mockDispatch).toHaveBeenCalledWith(logout());
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });
});
