import React from "react";
import "./index.css";

const Compass: React.FC = () => {
  return (
    <div className="compass">
      <div className="compass-north">N</div>
      <div className="compass-south">S</div>
      <div className="compass-east">E</div>
      <div className="compass-west">O</div>
    </div>
  );
};

export default Compass;
