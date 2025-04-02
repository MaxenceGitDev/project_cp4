import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

type Product = {
  id: number;
  name: string;
  description: string;
  quantity: string;
  price: number;
  stock: number;
  image_url: string;
};

class ProductRepository {
  async create(product: Omit<Product, "id">) {
    const [result] = await databaseClient.query<Result>(
      "INSERT INTO products (name, description, quantity, price, stock, image_url) VALUES (?, ?, ?, ?, ?, ?)",
      [product.name, product.description, product.quantity, product.price, product.stock, product.image_url]
    );
    return result.insertId;
  }

  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>("SELECT * FROM products WHERE id = ?", [id]);
    return rows[0] as Product;
  }

  async readAll() {
    const [rows] = await databaseClient.query<Rows>("SELECT * FROM products");
    return rows as Product[];
  }

  async update(product: Partial<Product> & { id: number }) {
    const [result] = await databaseClient.query<Result>(
      "UPDATE products SET name = ?, description = ?, quantity = ?, price = ?, stock = ?, image_url = ? WHERE id = ?",
      [
        product.name,
        product.description,
        product.quantity,
        product.price,
        product.stock,
        product.image_url,
        product.id,
      ]
    );
    return result.affectedRows;
  }

  async delete(id: number) {
    const [result] = await databaseClient.query<Result>("DELETE FROM products WHERE id = ?", [id]);
    return result.affectedRows;
  }
}

export default new ProductRepository();