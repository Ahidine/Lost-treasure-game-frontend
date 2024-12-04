import React from "react";
import "./index.css";
import { useGameLogic } from "../../hooks/useGameLogic";
import Modal from "../../components/Modal";
import Compass from "../../components/Compass";
import Card from "../Card";
import ActionButtons from "../Actions";

const Play: React.FC = () => {
  const {
    gameState,
    handleCardClick,
    startNewGame,
    showHint,
    openModal,
    closeModal,
  } = useGameLogic();

  return (
    <div className="play-content">
      <Compass />

      <div className="riddle">
        <h2>Trésor : {gameState.riddle.name}</h2>
        <p>{gameState.riddle.riddle} Saurez-vous le trouver ?</p>
        {gameState.showHint && (
          <p className="hint">💡 Indice : {gameState.riddle.hint}</p>
        )}
      </div>

      <div className="cards-container">
        {Array.from({ length: 9 }).map((_, index) => (
          <div
            key={index}
            className="card"
            onClick={() => handleCardClick(index)}
          >
            <Card
              treasure={index === gameState.riddle.position - 1}
              number={index + 1}
              flipped={gameState.flippedCards[index]}
            />
          </div>
        ))}
      </div>

      <ActionButtons
        openModal={openModal}
        closeModal={closeModal}
        showHint={showHint}
        startNewGame={startNewGame}
      />

      {gameState.showModal && (
        <Modal
          title={gameState.selectedAction.title}
          description={gameState.selectedAction.description}
          action={gameState.selectedAction.action}
          textAction={gameState.selectedAction.textAction}
        />
      )}
    </div>
  );
};

export default Play;
