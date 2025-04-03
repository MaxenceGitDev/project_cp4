import { useState } from "react";
import { postCreateUser } from "../services/requests";
import { useNavigate } from "react-router-dom";

import "../styles/SignupForm.css";
import { useAuth } from "../services/AuthContext";


export default function SignupForm({ user, handleChangeForm}: propsFormTypes) {

    const navigate = useNavigate();
    const { setUser } = useAuth();
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
    
        try {
          const response = await postCreateUser(user);
          setUser({ id: response.id, username: response.username });
          navigate("/");
        } catch (error) {
          if (error instanceof Error) {
            setError(error.message);
          } else {
            setError("Une erreur est survenue lors de l'inscription");
          }
        }
      };
      
      const [checked, setChecked] = useState(false);
      const toggleCheck = () => {
        setChecked(!checked);
      };

    return(
        <>
              <div className="signup-container">
        <form onSubmit={handleSubmit} className="signup-form">
          {error && (
            <div className="error-container">
              <p className="error-message">{error}</p>
            </div>
          )}
          <div className="form-group">
            <label htmlFor="username">Nom d'utilisateur</label>
            <input
              type="text"
              name="username"
              value={user.username}
              onChange={handleChangeForm}
              placeholder="Entrez un nom d'utilisateur"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChangeForm}
              placeholder="Votre adresse mail"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Mot de passe</label>
            <div className="password-input-container">
              <input
                type="password"
                name="password"
                value={user.password}
                onChange={handleChangeForm}
                placeholder="Veuillez entrer un mot de passe"
                required
              />
          
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirmez le mot de passe</label>
            <div className="password-input-container">
              <input
                type="password"
                name="confirmPassword"
                value={user.confirmPassword}
                onChange={handleChangeForm}
                placeholder="Veuillez entrer un mot de passe"
                required
              />
          
            </div>
          </div>
          <div className="checkbox-container">
            <input type="checkbox" checked={checked} onChange={toggleCheck} />
            <p>En cochant cette case, j'accepte les CGU.</p>
          </div>
          <button type="submit" className="signup-button" disabled={!checked}>
            S'inscrire
          </button>
        </form>
      </div>
        </>
    )
}