interface ProductTypes {
    id: number;
    name: string;
    description: string;
    quantity: string;
    price: number;
    stock: number;
    image_url: string;
    created_at: string;
}

interface ProductTypesProps {
    products: ProductTypes[];
}

interface UserTypes {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

interface UserData {
    id: number;
    username: string;
    email: string;
    password: string;
}

interface propsFormTypes {
    user: UserTypes;
    handleChangeForm: React.ChangeEventHandler<HTMLInputElement>;
  }

  interface CredentialsTypes {
    email: string;
    password: string;
  }
  
  interface AuthContextType {
    user: { id: number; username: string } | null;
    setUser: (user: { id: number; username: string } | null) => void;
    cartCount: number; 
    setCartCount: (count: number) => void;
    logout: () => Promise<void>;
  }

  interface CartItem  {
    id: number;
    cart_id: number;
    product_id: number;
    quantity: number;
    name: string;
    price: number;
    image_url: string;
}

interface CartTypes {
    id: number |  null;
    user_id: number;
    items: CartItem[];
}