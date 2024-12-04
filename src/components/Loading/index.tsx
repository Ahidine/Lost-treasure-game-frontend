import React from "react";
import "./index.css";

const LoadingPage: React.FC = () => {
  return (
    <div className="loading-modal">
      <div className="loading-content">
        <div className="spinner"></div>
        <h3>Chargement...</h3>
        <p>Veuillez patienter un instant.</p>
      </div>
    </div>
  );
};

export default LoadingPage;
