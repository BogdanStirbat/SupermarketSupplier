export class User {
  public id: number;
  public username: string;
  public role: string;

  constructor(id: number, username: string, role: string) {
    this.id = id;
    this.username = username;
    this.role = role;
  }
}