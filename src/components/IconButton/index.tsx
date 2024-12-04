import React from "react";
import "./index.css";

type IconProps = {
  icon: React.ReactNode;
  text: string;
  action: () => void;
};
const IconButton = ({ icon, text, action }: IconProps) => {
  return (
    <button onClick={action} className="icon-button">
      {icon}
      <span>{text}</span>
    </button>
  );
};

export default IconButton;
