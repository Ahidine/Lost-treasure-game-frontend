import { render, screen, fireEvent } from "@testing-library/react";
import Play from "./";
import { useGameLogic } from "../../hooks/useGameLogic";

jest.mock("../../hooks/useGameLogic", () => ({
  useGameLogic: jest.fn(),
}));

jest.mock("../../components/Compass", () => {
  return {
    __esModule: true,
    default: () => <div data-testid="compass">Compass</div>,
  };
});

jest.mock("../Card", () => {
  return {
    __esModule: true,
    default: ({
      treasure,
      number,
      flipped,
    }: {
      treasure: boolean;
      number: number;
      flipped: boolean;
    }) => (
      <div data-testid={`card-${number}`}>
        Card {number} {treasure ? "Treasure" : ""} {flipped ? "Flipped" : ""}
      </div>
    ),
  };
});

jest.mock("../Actions", () => {
  return {
    __esModule: true,
    default: ({ openModal, showHint, startNewGame }: any) => (
      <div data-testid="action-buttons">
        <button onClick={openModal}>Open Modal</button>
        <button onClick={showHint}>Show Hint</button>
        <button onClick={startNewGame}>New Game</button>
      </div>
    ),
  };
});

jest.mock("../../components/Modal", () => {
  return {
    __esModule: true,
    default: ({ title, description, action, textAction }: any) => (
      <div data-testid="modal">
        <h2>{title}</h2>
        <p>{description}</p>
        <button onClick={action}>{textAction}</button>
      </div>
    ),
  };
});

describe("Play Component", () => {
  const mockGameState = {
    riddle: {
      name: "Test Treasure",
      riddle: "Find me!",
      hint: "Some hint",
      position: 5,
    },
    showHint: false,
    flippedCards: [
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
    ],
    showModal: false,
    selectedAction: {
      title: "Test Modal",
      description: "Test Description",
      action: jest.fn(),
      textAction: "Test Action",
    },
  };

  const mockHandlers = {
    handleCardClick: jest.fn(),
    startNewGame: jest.fn(),
    showHint: jest.fn(),
    openModal: jest.fn(),
    closeModal: jest.fn(),
  };

  beforeEach(() => {
    (useGameLogic as jest.Mock).mockReturnValue({
      gameState: mockGameState,
      ...mockHandlers,
    });
  });

  it("renders the play component with all elements", () => {
    render(<Play />);

    expect(screen.getByTestId("compass")).toBeInTheDocument();
    expect(screen.getByText("Trésor : Test Treasure")).toBeInTheDocument();
    expect(
      screen.getByText("Find me! Saurez-vous le trouver ?")
    ).toBeInTheDocument();

    for (let i = 1; i <= 9; i++) {
      expect(screen.getByTestId(`card-${i}`)).toBeInTheDocument();
    }

    expect(screen.getByTestId("action-buttons")).toBeInTheDocument();
  });

  it("handles card clicks", () => {
    render(<Play />);

    const card5 = screen.getByTestId("card-5");
    fireEvent.click(card5);

    expect(mockHandlers.handleCardClick).toHaveBeenCalledWith(4);
  });

  it("shows action buttons with correct interactions", () => {
    render(<Play />);

    const openModalButton = screen.getByText("Open Modal");
    fireEvent.click(openModalButton);
    expect(mockHandlers.openModal).toHaveBeenCalled();

    const showHintButton = screen.getByText("Show Hint");
    fireEvent.click(showHintButton);
    expect(mockHandlers.showHint).toHaveBeenCalled();

    const newGameButton = screen.getByText("New Game");
    fireEvent.click(newGameButton);
    expect(mockHandlers.startNewGame).toHaveBeenCalled();
  });

  it("renders modal when showModal is true", () => {
    const gameStateWithModal = {
      ...mockGameState,
      showModal: true,
    };

    (useGameLogic as jest.Mock).mockReturnValue({
      gameState: gameStateWithModal,
      ...mockHandlers,
    });

    render(<Play />);

    expect(screen.getByTestId("modal")).toBeInTheDocument();
    expect(screen.getByText("Test Modal")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
  });
});
