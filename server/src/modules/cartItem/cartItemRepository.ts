import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

type CartItem = {
  id: number;
  cart_id: number;
  product_id: number;
  quantity: number;
};

class CartItemRepository {
  async create(cartItem: Omit<CartItem, "id">) {
    const [result] = await databaseClient.query<Result>(
      "INSERT INTO cart_items (cart_id, product_id, quantity) VALUES (?, ?, ?)",
      [cartItem.cart_id, cartItem.product_id, cartItem.quantity]
    );
    return result.insertId;
  }

  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>("SELECT * FROM cart_items WHERE id = ?", [id]);
    return rows[0] as CartItem;
  }

  async readByCartId(cartId: number) {
    const [rows] = await databaseClient.query<Rows>("SELECT * FROM cart_items WHERE cart_id = ?", [cartId]);
    return rows as CartItem[];
  }

  async updateQuantity(id: number, quantity: number) {
    const [result] = await databaseClient.query<Result>(
      "UPDATE cart_items SET quantity = ? WHERE id = ?",
      [quantity, id]
    );
    return result.affectedRows;
  }

  async delete(id: number) {
    const [result] = await databaseClient.query<Result>("DELETE FROM cart_items WHERE id = ?", [id]);
    return result.affectedRows;
  }

  async findByCartAndProduct(cartId: number, productId: number) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT * FROM cart_items WHERE cart_id = ? AND product_id = ?",
      [cartId, productId]
    );
    return rows[0] as CartItem;
  }
}

export default new CartItemRepository();