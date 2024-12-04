import { renderHook, act } from "@testing-library/react";
import { useGameLogic } from "./useGameLogic";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { modalActions } from "../utils/ModalAction";

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));
jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

describe("useGameLogic", () => {
  const mockDispatch = jest.fn();
  const mockNavigate = jest.fn();

  const mockTreasures = [
    {
      id: "1",
      name: "Ruby",
      position: 1,
      riddle: "I shine red",
      hint: "Red gem",
    },
    {
      id: "2",
      name: "Emerald",
      position: 3,
      riddle: "I am green",
      hint: "Green gem",
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();

    (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);

    (useSelector as unknown as jest.Mock).mockImplementation((selector) => {
      if (selector.name === "userSelector") {
        return { id: "user123", treasures: [] };
      }
      if (selector.name === "treasuresSelector") {
        return { treasures: mockTreasures };
      }
      return [];
    });
  });

  it("init the game", () => {
    const { result } = renderHook(() => useGameLogic());
    const { gameState } = result.current;

    expect(gameState.flippedCards).toHaveLength(9);
    expect(gameState.tries).toBe(0);
  });

  it("displays a hint when showHint is called", () => {
    const { result } = renderHook(() => useGameLogic());

    act(() => {
      result.current.showHint();
    });

    expect(result.current.gameState.showHint).toBe(true);
  });

  it("opens and closes the modal correctly", () => {
    const { result } = renderHook(() => useGameLogic());

    act(() => {
      result.current.openModal(modalActions.help);
    });
    expect(result.current.gameState.showModal).toBe(true);
    expect(result.current.gameState.selectedAction).toEqual(modalActions.help);

    act(() => {
      result.current.closeModal();
    });
    expect(result.current.gameState.showModal).toBe(false);
    expect(result.current.gameState.selectedAction.title).toBe("");
  });

  it("starts a new game with startNewGame", () => {
    const { result } = renderHook(() => useGameLogic());

    act(() => {
      result.current.startNewGame();
    });

    expect(result.current.gameState.tries).toBe(0);
    expect(result.current.gameState.flippedCards).toEqual(Array(9).fill(false));
  });
});
