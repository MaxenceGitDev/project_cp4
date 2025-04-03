import "../styles/SignupForm.css";
import { postLogin } from "../services/requests";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../services/AuthContext";


export default function LoginForm() {

    const navigate = useNavigate();
    const { setUser } = useAuth();
    const [credentials, setCredentials] = useState<CredentialsTypes>({
        email: "",
        password: "",
      });
    
    const handleChangeCredentials = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCredentials({
          ...credentials,
          [e.currentTarget.name]: e.currentTarget.value,
        });
      };

      const sendCredentials = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        try {
          const response = await postLogin(credentials);
          setUser({ id: response.user_id, username: response.username });
          navigate("/");
        } catch (error) {
          console.error(error);
        }
      };

    return(
        <>
    <div className="signup-container">
        <form className="signup-form" onSubmit={sendCredentials}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              value={credentials.email}
              onChange={handleChangeCredentials}
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
                value={credentials.password}
                onChange={handleChangeCredentials}
                placeholder="Veuillez entrer un mot de passe"
                required
              />
         
            </div>
          </div>
          <button type="submit" className="signup-button">
            Se connecter
          </button>
        </form>
      </div>
        </>
    )
}