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