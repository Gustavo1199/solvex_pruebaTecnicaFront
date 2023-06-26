export class User
{
  userName!: string
  email!: string
  password: any
  rol: any
  roles!: string[]
  id?: string

  constructor(userName:string, email:string, password:any, rol:any, id?:string)
  {
    this.userName = userName;
    this.email = email;
    this.password = password;
    this.rol = rol;
    this.id =id;
  }

}
