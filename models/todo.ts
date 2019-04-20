import { db } from '../config/knex';

// create ToDo model.
export interface ToDo {
  id: number;
  text: string;
  isDone: string;
  active: boolean;
  userId: number;
  createdAt: Date;
}

/**
 * Trình quản lý tài khoản người dùng
 */
export class ToDoManager {

  private tbName: string;

  constructor() {
    this.tbName = 'todos';
  }

  async findAll(userId: number) {
    if (!userId) {
      throw new Error('User id is required!');
    }
    return await db(this.tbName).where({ userId });
  }

  async findOne(userId: number, taskId: number) {
    return await db(this.tbName).where({ userId, id: taskId }).first();
  }

  /**
   * Create new user todo
   * @param userId
   * @param text
   * @param isDone
   */
  async create(userId: number, text: string, isDone: boolean) {
    const vResult = await db(this.tbName).insert({
      text,
      isDone,
      userId,
      createdAt: new Date(),
    });

    return vResult;
  }

  async update(userId: number, taskId: number, text: string, isDone: boolean) {
    const vResult = await db(this.tbName).update({
      text,
      isDone
    }).where({
      userId,
      id: taskId
    });

    return vResult;
  }

  /**
   * Lấy danh sách todo theo user
   * @param userId
   */
  async findByUserId(userId: number): Promise<ToDo> {
    return await db(this.tbName)
      .where({
        userId: userId
      });
  }

}

export const todoManager = new ToDoManager();
