import { UsersRepository } from './../repository/users.repository';
import { User } from 'src/models/user';
import * as jwt from 'jsonwebtoken';
import * as argon2 from 'argon2';
import { Request, Response } from 'express';
/**
 * Cette classe est un service
 * C'est ici que l'ensemble de la logique consernant les post doit apparaitre.
 * Attention ! Mettez le moins possible d'element dans le controller
 */
export class UsersService {

    // Make service => singletonTransformation de notre service en singleton
    private static instance: UsersService;
    static getInstance() {
        if (!this.instance) {
            this.instance = new UsersService();
        }
        return this.instance;
    }

       // Un singleton est une class ayant une instance unique a travers toute l'app
       private repository: UsersRepository;
       private constructor() {
           this.repository = UsersRepository.getInstance();
       }

    async signup(user: User): Promise<User> {
      user.password = await argon2.hash(user.password);
      return this.repository.insert(user);
    }

    async signin(email: string, password: string) {
      const user = await this.repository.findByEmail(email);
      if (!user) {
          throw new Error('Les informations ne sont pas valide');
      }
      const isValid = await argon2.verify(user.password, password);
      if (!isValid) {
          throw new Error('Les informations ne sont pas valide');
      }
      const userToken = {
          email: user.email,
          id: user.id
      };
      const secret = process.env.JWT_SECRET;
      if (!secret) {
          throw new Error('Pas de secret setup');
      }

      const token = jwt.sign(userToken, secret);
      return {
          token,
          email: user.email,
          id: user.id,
      };
  }

    async changePassword(user: User): Promise<User> {
      user.password = await argon2.hash(user.password);
      return this.repository.changePassword(user);
    }

    async verifyToken(req: Request, res: Response, next: Function) {
      const authorization = req.headers.authorization;
      const bearerToken = authorization?.split(' ')[1];
      if (!bearerToken) {
          res.sendStatus(401);
      }
      else {
          try {
              const secret = process.env.JWT_SECRET ? process.env.JWT_SECRET : '';

              const results: any = await jwt.verify(bearerToken, secret);
              const user = await UsersRepository.getInstance().findByEmail(results.email);
              req.user = {
                  ...user,
                  password: undefined
              };
              next();
          } catch(e) {
              console.log(e);
              res.sendStatus(401);
          }
      }
  }



    // Business logic

    /**
     * Return a promise which contains an array of posts.
     */
    getAll(): Promise<User[]> {
        return this.repository.findAll();
    }

    /**
     * Return a promise which contains the post relative to the id in parameter.
     * @param id post id
     */
    getById(id: number): Promise<User> {
        return this.repository.findById(id);
    }

    /**
     * Create a new post and return a promise which contains the created post.
     * @param post post to create
     */
    create(user: any): Promise<User> {
      return this.repository.insert(user);
    }

    /**
     * Update the post in parameter and return a promise which contains the updated post.
     * @param post post to update
     */
    update(post: any): Promise<User> {
      return this.repository.update(post);
    }

    /**
     * Delete the post related to the id in parameter. Return an empty promise.
     * @param id post id
     */
    delete(id: number): Promise<any> {
      return this.repository.delete(id);
    }
}
