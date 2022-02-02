export class User {
  public id: number;
  public userId: number;
  public firstName: string;
  public lastName: string;
  public username: string;
  public email: string;
  public password: string;
  public loginDateDisplay: Date;
  public joinDate: Date;
  public profileImageUrl: string
  public active: boolean;
  public notLocked: boolean;
  public role: string;
  public authorities: [];


  constructor(firstName: string, lastName: string, username: string, email: string, password: string, active: boolean, notLocked: boolean, role: string, authorities: []) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.username = username;
    this.email = email;
    this.password = password;
    this.active = active;
    this.notLocked = notLocked;
    this.role = role;
    this.authorities = authorities;
  }
}
