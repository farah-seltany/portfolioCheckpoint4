export class Competence {
    id!: number;
    title!: string;
    image!: string;
    rating!: number;
    user_id!: number;

  
    constructor(input: Competence) {
      Object.assign(this, input);
  }
  }