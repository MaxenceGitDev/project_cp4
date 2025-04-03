import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";
import { Logout, getCart } from "../services/requests"; 

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<{ id: number; username: string } | null>(null);
  const [cartCount, setCartCount] = useState<number>(0);
  const [loading, setLoading]= useState(true);

  useEffect(() => {
    const checkAuthAndCart = async () => {
      try {
        const authResponse = await axios.get(`${import.meta.env.VITE_API_URL}/api/check-auth`, {
          withCredentials: true,
        });
        
        const newUser = { id: authResponse.data.user_id, username: authResponse.data.username };
        setUser(newUser);

        const cartData = await getCart();
        
        const totalItems = cartData.items.reduce((sum: number, item: any) => sum + item.quantity, 0);
        setCartCount(totalItems);
      } catch (error) {
        console.error("Erreur dans checkAuthAndCart:", error);
        setUser(null);
        setCartCount(0);
      } finally {
        setLoading(false);
      }
    };
    checkAuthAndCart();
  }, []);

  const logout = async () => {
    try {
      await Logout(); 
      setUser(null);
      setCartCount(0); 
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
    }
  };

  if (loading) return <p>Loading auth...</p>;

  return (
    <AuthContext.Provider value={{ user, setUser, cartCount, setCartCount, logout }}>
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