import * as bcrypt from 'bcryptjs';
import { db } from '../config/knex';

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
  async findByUserName(username: string): Promise<User> {
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
          username,
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

  /**
   * Kiểm tra tài khoản và mật khẩu người dùng
   * @param username
   * @param password
   */
  async verifyUsernameAndPassword(username: string, password: string): Promise<User> {
    const user: User = await db(this.tbName)
      .where({
        username: username
      })
      .first('username', 'password');

    if (user == null) {
      throw new Error('Tài khoản hoặc mật khẩu không đúng!');
    }

    // kiểm tra mật khẩu
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, (err: Error, success: boolean) => {
        if (err) {
          return reject(err);
        } else if (!success) {
          return reject('Tài khoản hoặc mật khẩu không đúng!');
        } else {
          return resolve(user);
        }
      });
    });
  }

}

export const userManager = new UserManager();
