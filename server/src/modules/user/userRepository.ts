import  databaseClient  from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

type User = {
    id: number;
    username: string;
    email: string;
    password: string;
}

class UserRepository {
    async create(user: Omit<User, "id">) {
        const [result] = await databaseClient.query<Result>(
            "insert into users (username, email, password) values (?, ?, ?)",
            [user.username, user.email, user.password],
        );
        return result.insertId;
    }

    async read(id: number) {
        const [rows] = await databaseClient.query<Rows>("select * from users where id = ?", [id]);
        return rows[0] as User;
    }

    async readAll() {
        const [rows] = await databaseClient.query<Rows>("select * from users");
        return rows as User[];
    }

    async readByEmailWithPassword(email: string) {
        const [rows] = await databaseClient.query<Rows>("select * from users where email = ?", [email]);
        return rows[0] as User;
    }

    async update(user: Omit<User, "email" | "password">) {
        const [result] = await databaseClient.query<Result>(
            "update users set username = ?",
            [user.username],
        );
        return result.affectedRows;
    }

    async delete(id: number){
        const [result] = await databaseClient.query<Result>("delete from users where id = ?", [id]);
        return result.affectedRows;
    }
}

export default new UserRepository();