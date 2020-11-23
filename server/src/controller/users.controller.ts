import { User } from './../models/user';
import { UsersService } from './../services/users.service';
import express, { Router, Request, Response, Application } from 'express';

/**
 * Ce controller vous servira de modèle pour construire vos différent controller
 * Le controller est la partie de l'application qui est en charge de la reception
 * des requetes http.
 *
 * @param app l'application express
 */
export const UsersController = (app: Application) => {

    const router: Router = express.Router();
    const userService = UsersService.getInstance();

    router.get('/me', userService.verifyToken, async (req: Request, res: Response) => {
      const user = req.user;
      res.send(user);
  });

    /**
     * Return all posts in JSON
     */
    router.get('/', (req: Request, res: Response) => {
      userService.getAll().then(result => {
          res.send(result);
      })
    });

    /**
     * Return only one post in JSON relative to its id
     */
    router.get('/:id', (req: Request, res: Response) => {
      const id = parseInt(req.params.id);
      userService.getById(id).then(result => {
            res.send(result);
        })
        .catch(err => {
          console.log(err);
        })
    });

    router.post('/register', (req: Request, res: Response) => {
      const user: User = req.body;

      userService.signup(user).then((registeredUser: User) => {
          res.send({
          ...registeredUser,
          password: ''
          });
      })
      .catch(err => {
          console.log(err);
      })
  });

  router.post('/login', (req: Request, res: Response) => {
    const user: User = req.body;
    userService.signin(user.email, user.password).then((results: any) => {
        res.send({
            token: results.token,
            id: results.id,
            email: results.email
        });
    })
    .catch(err => {
        console.log(err);
        res.sendStatus(401);
    })
});


  //Route for changing password

  router.put('/changePassword', (req: Request, res: Response) => {
    const user: User = req.body;
    userService.changePassword(user).then((registeredUser: User) => {
        res.send({
        ...registeredUser,
        password: ''
        });
    })
    .catch(err => {
        console.log(err);
    })
});
    /**
     * Create a new post from a JSON body and return the created post in JSON.
     */
    router.post('/', (req: Request, res: Response) => {
      const user: User = req.body; // Automatically transform in a Post object
      userService.create(user).then(result => {
            res.send(result);
        })
        .catch(err => {
          console.log(err);
        })
    });

    /**
     * Update a post relative to its id and return the updated post in JSON.
     */
    router.put('/:id', (req: Request, res: Response) => {
      const user: User = req.body; // req.params.id is automatically set into the body

      userService.update(user).then(result => {
            res.send(result);
        })
        .catch(err => {
          console.log(err);
        })
    });

    /**
     * Delete a post relative its id.
     */
    router.delete('/:id', (req: Request, res: Response) => {
      const id = parseInt(req.params.id);

      userService.delete(id).then(result => {
            res.send();
        })
        .catch(err => {
          console.log(err);
        })
    });

    app.use('/users', router);
};
