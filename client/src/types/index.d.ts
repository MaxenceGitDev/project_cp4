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