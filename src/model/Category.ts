import { v4 as uuidv4 } from 'uuid';

export default class Category {
  private id: string;
  private created_at: Date;

  public name?: string;
  public description?: string;

  constructor() {
    this.id = uuidv4();
    this.created_at = new Date();
  }
}
