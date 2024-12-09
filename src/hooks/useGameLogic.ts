import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { modalActions } from "../utils/ModalAction";
import { addRewards } from "../store/slices/userSlice";
import { useNavigate } from "react-router-dom";

interface Riddle {
  name: string;
  riddle: string;
  position: number;

  hint: string | null;
  id?: string;
}

interface GameState {
  riddle: Riddle;
  tries: number;
  flippedCards: boolean[];
  showModal: boolean;
  showHint: boolean;
  selectedAction: {
    title: string;
    description: string;
    textAction: string;
    action: () => void;
  };
  treasuresFound: number;
}

export const useGameLogic = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user);
  const treasures = useSelector(
    (state: RootState) => state.treasures.treasures
  );
  const treasuresFoundedNames = useSelector((state: RootState) =>
    state.user.treasures.map((t) => t.name)
  );

  const selectedTreasures = treasures.filter(
    (treasure) => !treasuresFoundedNames.includes(treasure.name)
  );

  const getRandomRiddle = (): Riddle => {
    const index = Math.floor(Math.random() * selectedTreasures.length);
    return selectedTreasures[index];
  };
  const goToDashboard = () => {
    dispatch(
      addRewards({
        id: user.id ?? "",
        treasure: {
          id: gameState.riddle.id,
          name: gameState.riddle.name,
          attempts: gameState.tries + 1,
          date: new Date().toLocaleDateString("fr-FR"),
        },
      })
    );
    navigate("/dashboard");
  };
  const [gameState, setGameState] = useState<GameState>({
    riddle: getRandomRiddle(),
    tries: 0,
    flippedCards: Array(9).fill(false),
    showModal: false,
    showHint: false,
    selectedAction: {
      title: "",
      description: "",
      textAction: "",
      action: () => {},
    },
    treasuresFound: 0,
  });

  const startNewGame = () => {
    setGameState({
      riddle: getRandomRiddle(),
      tries: 0,
      flippedCards: Array(9).fill(false),
      showModal: false,
      showHint: false,
      selectedAction: {
        title: "",
        description: "",
        textAction: "",
        action: () => {},
      },
      treasuresFound: gameState.treasuresFound,
    });
  };

  const handleCardClick = (index: number) => {
    if (gameState.tries >= 3 || gameState.flippedCards[index]) return;

    const updatedFlippedCards = [...gameState.flippedCards];
    updatedFlippedCards[index] = true;
    if (index === gameState.riddle.position - 1) {
      setGameState((prev) => ({
        ...prev,
        flippedCards: updatedFlippedCards,
        tries: prev.tries + 1,
        treasuresFound: prev.treasuresFound + 1,
        showModal: true,
        selectedAction: { ...modalActions.win, action: goToDashboard },
      }));
    } else {
      const newTries = gameState.tries + 1;

      setGameState((prev) => ({
        ...prev,
        flippedCards: updatedFlippedCards,
        tries: newTries,
        ...(newTries >= 3 && {
          showModal: true,
          selectedAction: { ...modalActions.lost, action: startNewGame },
        }),
      }));
    }
  };

  const openModal = (
    action: (typeof modalActions)[keyof typeof modalActions]
  ) => {
    setGameState((prev) => ({
      ...prev,
      showModal: true,
      selectedAction: action,
    }));
  };

  const closeModal = () => {
    setGameState((prev) => ({
      ...prev,
      showModal: false,
      selectedAction: {
        title: "",
        description: "",
        textAction: "",
        action: () => {},
      },
    }));
  };

  const showHint = () => {
    setGameState((prev) => ({
      ...prev,
      showHint: true,
    }));
  };

  return {
    gameState,
    handleCardClick,
    startNewGame,
    openModal,
    closeModal,
    showHint,
  };
};
