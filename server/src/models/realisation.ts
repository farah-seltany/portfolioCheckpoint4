export class Realisation {
    id!: number;
    title!: string;
    subtitle!: string;
    image!: string;
    description!: string;
    lien!: string;
    user_id!: number;

  
    constructor(input: Realisation) {
      Object.assign(this, input);
  }
  }