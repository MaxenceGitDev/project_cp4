import axios from "axios";
const baseUrl = import.meta.env.VITE_API_URL;

const getAllProducts = async () => {
    try {
        const response = await axios.get(`${baseUrl}/api/products`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch products");
    }
};

const postCreateUser = async (userData: UserTypes) => {
    try {
        const response = await axios.post(`${baseUrl}/api/users`, userData, {
            withCredentials: true,
        });
        return response.data;
    } catch(error) {
        throw new Error("Failed to create new user");
    }
};

const postLogin = async (credentials: CredentialsTypes) => {
    try {
        const response = await axios.post(`${baseUrl}/api/login`, credentials, {
          withCredentials: true,
        });
        return response.data;
      } catch (error) {
        throw new Error("Failed to connect");
      }
}

const Logout = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/logout`, {
        withCredentials: true,
      });
  
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to logout");
    }
  };

  const addToCart = async (productId: number, quantity: number) => {
    try {
      const response = await axios.post(`${baseUrl}/api/cart-items/add`, { productId, quantity }, { withCredentials: true });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`Error: ${error.response?.data?.message}`);
      }
      throw new Error("Failed to add to cart");
    }
  }

  const getCart = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/cart`, { withCredentials: true });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`Error: ${error.response?.data?.message}`);
      }
      throw new Error("Failed to get cart")
    }
  }

  const removeCartItem = async (itemId: number) => {
    try {
      const response = await axios.delete(`${baseUrl}/api/cart-items/${itemId}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw new Error("failed to delete item");
    }
  };

  const createCart = async () => {
    try {
      const response = await axios.post(
        `${baseUrl}/api/carts`,
        {},
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      throw new Error("Failed to create cart");
    }
  };

export { getAllProducts, postCreateUser, postLogin, Logout, addToCart, getCart, removeCartItem, createCart}
