export class User {
  public id: number;
  public firstName: string;
  public lastName: string;
  public email: string;
  public password: string;
  public role: string;
  public enabled: boolean;
  public username: string;
  public accountNonExpired: boolean;
  public credentialsNonExpired: boolean;
  public accountNonLocked: boolean;
  public authorities: string[];
  public profileImageUrl: string;
  public active: boolean;
  public isNotLocked: boolean;
  public lastLoginDate: Date;
  public lastLoginDateDisplay: Date;
  public joinDate: Date;

  constructor() {
    this.id = 0;
    this.firstName = " ";
    this.lastName = " ";
    this.email = " ";
    this.password = " ";
    this.role = " ";
    this.enabled = true;
    this.username = " ";
    this.accountNonExpired = true;
    this.credentialsNonExpired = true;
    this.accountNonLocked = true;
    this.authorities = [];
    this.profileImageUrl = "";
    this.active = true;
    this.isNotLocked = true;
    this.lastLoginDate = new Date();
    this.lastLoginDateDisplay = new Date();
    this.joinDate = new Date();


  }
}
