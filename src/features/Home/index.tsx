import React from "react";
import PlayButton from "../../components/PlayButton";
import "./index.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user);

  const goPlayPage = () => {
    user.isAuthenticated ? navigate("/play") : navigate("/auth");
  };
  return (
    <div className="home-content">
      <div className="play-button-container">
        <PlayButton text="Commencer l'aventure" action={() => goPlayPage()} />
      </div>
    </div>
  );
};

export default Home;
