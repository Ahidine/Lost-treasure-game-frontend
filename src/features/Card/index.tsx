import React from "react";
import "./index.css";

type CardProps = {
  treasure: boolean;
  number: number;
  flipped: boolean;
};

const Card: React.FC<CardProps> = ({ treasure, number, flipped }) => {
  return (
    <div className="card">
      {!flipped ? (
        <div className="card-front">
          <span>{number}</span>
        </div>
      ) : (
        <div
          className={`card-back ${
            treasure ? "reveal-treasure" : "reveal-fail"
          }`}
        >
          {treasure ? <span>Trésor !</span> : <span>Raté !</span>}
        </div>
      )}
    </div>
  );
};

export default Card;
