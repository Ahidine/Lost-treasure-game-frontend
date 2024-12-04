import React from "react";
import { Link } from "react-router-dom";
import "./index.css";
const NotFound: React.FC = () => {
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>404</h1>
        <p>
          Oops ! 😢 La page que vous cherchez n'existe pas. 🗺️ <br />
          Pas de panique ! Vous pouvez toujours retourner à l'accueil. 🏡✨
        </p>
        <Link to="/" className="auth-button">
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
