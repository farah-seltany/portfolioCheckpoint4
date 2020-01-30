export class Skill {
    id!: number;
    title!: string;
    description!: string;
    user_id!: number;

  
    constructor(input: Skill) {
      Object.assign(this, input);
  }
  }