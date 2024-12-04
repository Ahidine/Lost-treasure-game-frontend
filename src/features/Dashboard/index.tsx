import React from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";
import { FaTrophy, FaCalendarAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user);

  const getLevel = (treasuresFound: number) => {
    if (treasuresFound <= 5) return "Novice 🥉";
    if (treasuresFound <= 15) return "Adepte 🥈";
    return "Maître 🥇";
  };

  const goToGame = () => {
    navigate("/play");
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Mon coffre aux trésors 🏰</h1>
        <p>Bienvenue, {user.name} ! 👋</p>
        <p>Email : {user.email}</p>
        <p>Niveau : {getLevel(user.treasures.length)}</p>
        <div className="level-progress">
          <div
            className="progress-bar"
            style={{ width: `${(user.treasures.length / 20) * 100}%` }}
          />
          <p>{user.treasures.length} / 20 Trésors Trouvés 🏅</p>
        </div>
      </header>

      {user.treasures.length === 0 && (
        <section className="motivational-message">
          <h2>Pas encore de trésor trouvé... 😔</h2>
          <p>
            Chaque grande aventure commence par un petit pas. Vous n'avez pas
            encore trouvé de trésor, mais chaque clic vous rapproche du vôtre.
            🏃‍♂️💨 Lancez-vous et découvrez ce qui se cache derrière les cartes !
            🎲
          </p>
          <p>
            Dans un royaume lointain, un aventurier inconnu se lance à la
            recherche du plus grand trésor jamais découvert. Pour ce héros,
            chaque carte retournée est une étape vers une découverte magique. ✨
            Vous êtes prêt pour votre aventure ? 🔍
          </p>
        </section>
      )}

      {user.treasures.length > 0 && (
        <section className="treasures-found">
          <h2>Trésors Gagnés 🏆</h2>
          <div className="treasure-list">
            {user.treasures.map((treasure, index) => (
              <div key={index} className="treasure-item">
                <div className="treasure-icon">
                  <FaTrophy size={30} />
                </div>
                <div className="treasure-info">
                  <h3>{treasure.name} 🎉</h3>
                  <p>
                    <FaCalendarAlt size={14} /> Trouvé le {treasure.date}
                  </p>
                  <p>Essais : {treasure.attempts} 💡</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
      <footer>
        <button onClick={goToGame} className="start-new-game">
          {user.treasures.length === 0
            ? "Commencer l'aventure 🎲"
            : "Chercher un nouveau trésor 🌟"}
        </button>
      </footer>
    </div>
  );
};

export default Dashboard;
