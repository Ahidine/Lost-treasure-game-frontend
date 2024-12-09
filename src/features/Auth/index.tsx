import React, { useState } from "react";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import { login, register } from "../../store/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../store";
import LoadingPage from "../../components/Loading";

const Auth: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { isAuthenticated, loading, error } = useSelector(
    (state: RootState) => state.user
  );

  if (isAuthenticated) {
    navigate("/dashboard");
  }

  const toggleForm = (e: React.FormEvent) => {
    setIsLogin(!isLogin);
    e.preventDefault();
  };

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(login({ email, password }));
    navigate("/play");
  };

  const handleRegister = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(register({ email, password, name }));
    navigate("/play");
  };

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>{isLogin ? "Connexion" : "Enregistrement"}</h1>

        {isLogin ? (
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="email">Adresse e-mail</label>
              <input
                type="email"
                id="email"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Mot de passe</label>
              <input
                type="password"
                id="password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="auth-button">
              Se connecter
            </button>
          </form>
        ) : (
          <form onSubmit={handleRegister}>
            <div className="form-group">
              <label htmlFor="name">Nom d'utilisateur</label>
              <input
                type="text"
                id="name"
                required
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Adresse e-mail</label>
              <input
                type="email"
                id="email"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Mot de passe</label>
              <input
                type="password"
                id="password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="auth-button">
              S'enregistrer
            </button>
          </form>
        )}

        {error && isLogin && (
          <p className="error-message">Oops ! email ou password incorrect </p>
        )}

        <p className="toggle-text" onClick={toggleForm}>
          {isLogin
            ? "Pas encore inscrit ? Créez un compte"
            : "Déjà un compte ? Connectez-vous"}
        </p>
      </div>
    </div>
  );
};

export default Auth;
