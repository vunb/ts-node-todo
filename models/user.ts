import * as bcrypt from "bcryptjs";
import { db } from "../config/knex";

// create user model.
export interface User {
  id: number;
  username: string;
  password: string;
  active: boolean;
}

/**
 * Trình quản lý tài khoản người dùng
 */
export class UserManager {

  private tbName: string;

  constructor() {
    this.tbName = 'users';
  }

  async findAll() {
    return await db(this.tbName);
  }

  /**
   * Tìm thông tin tài khoản theo username
   * @param username
   */
  async findByUserName(username: string) {
    const result = await db(this.tbName)
      .where({
        username: username
      })
      .select('username', 'password');

      // get first result
      return result.find(() => true);
  }

  createUser(username: string, password: string) {

    return new Promise((resolve, reject) => {
      bcrypt.hash(password, 10, async (err, hash) => {
        const vResult = await db(this.tbName).insert({
          username: username,
          password: hash,
          active: 1
        });

        if (err) {
          reject(err);
        } else {
          resolve(vResult);
        }
      });
    });
  }

}

export const userManager = new UserManager();
