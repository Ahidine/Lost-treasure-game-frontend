import React from "react";
import {
  FaHome,
  FaCoins,
  FaQuestionCircle,
  FaRedo,
  FaSignOutAlt,
  FaLightbulb,
} from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import IconButton from "../../components/IconButton";
import { ModalProps } from "../../components/Modal";
import { AppDispatch } from "../../store";
import { logout } from "../../store/slices/userSlice";
import { modalActions } from "../../utils/ModalAction";
import "./index.css";

interface ActionButtonsProps {
  openModal: (action: ModalProps) => void;
  closeModal: () => void;
  showHint: () => void;
  startNewGame: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  closeModal,
  openModal,
  showHint,
  startNewGame,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const actions = [
    {
      name: "Accueil",
      icon: <FaHome size={30} />,
      action: () => navigate("/"),
    },
    {
      name: "Coffre aux Trésors",
      icon: <FaCoins size={30} />,
      action: () => navigate("/dashboard"),
    },
    {
      name: "Aide",
      icon: <FaQuestionCircle size={30} />,
      action: () => openModal({ ...modalActions.help, action: closeModal }),
    },
    {
      name: "Indice",
      icon: <FaLightbulb size={30} />,
      action: showHint,
    },
    {
      name: "Restaurer",
      icon: <FaRedo size={30} />,
      action: () =>
        openModal({ ...modalActions.restart, action: startNewGame }),
    },
    {
      name: "Se déconnecter",
      icon: <FaSignOutAlt size={30} />,
      action: () => {
        dispatch(logout());
        navigate("/");
      },
    },
  ];

  return (
    <div className="buttons-container">
      {actions.map((action, index) => (
        <IconButton
          key={index}
          icon={action.icon}
          text={action.name}
          action={action.action}
        />
      ))}
    </div>
  );
};

export default ActionButtons;
