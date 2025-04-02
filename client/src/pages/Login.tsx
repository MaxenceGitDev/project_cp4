import { useState } from "react";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";
import "../styles/Login.css";

export default function Login() {

   const [isSignup, setIsSignup] = useState(false);
   const toggleForm = () => {
    setIsSignup(!isSignup);
   };
   const [user, setUser] = useState({
    username : "",
    email: "",
    password: "",
    confirmPassword: "",
   } as UserTypes);

   const handleChangeForm = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

    return (
        <>
        <section className="signup-page-container">
    
      
        {!isSignup ? (
          <SignupForm user={user} handleChangeForm={handleChangeForm} />
        ) : (
          <LoginForm />
        )}
        <button type="button" className="login-link" onClick={toggleForm}>
          {!isSignup ? "Déjà un compte ?" : "Pas encore de compte ?"}
        </button>
     
      
    </section>
        </>
    )
}