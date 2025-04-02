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
        const response = await axios.post(`${baseUrl}/api/users`, userData);
        return response.data;
    } catch(error) {
        throw new Error("Failed to create new user");
    }
};

export { getAllProducts, postCreateUser}
