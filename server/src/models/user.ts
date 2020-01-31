export class User {
    id!: number;
    firstname!: string;
    lastname!: string;
    title!: string;
    description!: string;
    telephone!: string;
    email!: string;
    linkedin!: string;
    github!: string;
    twitter!: string;
    cv!: string;
    photo!: string;
    password!: string;


  
    constructor(input: User) {
      Object.assign(this, input);
  }
  }