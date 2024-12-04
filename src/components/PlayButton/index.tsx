import React from "react";
import "./index.css";

type ButtonProps = {
  text: string;
  action: () => void;
};
const PlayButton = ({ text, action }: ButtonProps) => {
  return (
    <div className="button-container">
      <button onClick={action} className="play-button">
        {text}
      </button>
    </div>
  );
};

export default PlayButton;
