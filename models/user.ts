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

}

export const userManager = new UserManager();
