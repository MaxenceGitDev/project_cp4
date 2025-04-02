import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

type Cart = {
  id: number;
  user_id: number;
};

class CartRepository {
  async create(userId: number) {
    const [result] = await databaseClient.query<Result>(
      "INSERT INTO carts (user_id) VALUES (?)",
      [userId]
    );
    return result.insertId;
  }

  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>("SELECT * FROM carts WHERE id = ?", [id]);
    return rows[0] as Cart;
  }

  async readByUserId(userId: number) {
    const [rows] = await databaseClient.query<Rows>("SELECT * FROM carts WHERE user_id = ?", [userId]);
    return rows[0] as Cart;
  }

  async readAll() {
    const [rows] = await databaseClient.query<Rows>("SELECT * FROM carts");
    return rows as Cart[];
  }

  async delete(id: number) {
    const [result] = await databaseClient.query<Result>("DELETE FROM carts WHERE id = ?", [id]);
    return result.affectedRows;
  }
}

export default new CartRepository();