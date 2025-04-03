import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";
import { Logout } from "../services/requests"; 

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<{ id: number; username: string } | null>(null);
  const [loading, setLoading]= useState(true);

 
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/check-auth`, {
          withCredentials: true,
        });
        setUser({ id: response.data.user_id, username: response.data.username });
      } catch (error) {
        setUser(null); 
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);


  const logout = async () => {
    try {
      await Logout(); 
      setUser(null); 
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
    }
  };

  if (loading) return <p>Loading auth...</p>;

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth doit être utilisé dans un AuthProvider");
  }
  return context;
};