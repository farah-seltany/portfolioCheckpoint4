import { Skill } from './../models/skill';
import { SkillsService } from './../services/skills.service';
import express, { Router, Request, Response, Application } from 'express';

/**
 * Ce controller vous servira de modèle pour construire vos différent controller
 * Le controller est la partie de l'application qui est en charge de la reception
 * des requetes http.
 *
 * @param app l'application express
 */
export const SkillsController = (app: Application) => {

    const router: Router = express.Router();
    const skillsService = SkillsService.getInstance();

    /**
     * Return all posts in JSON
     */
    router.get('/', (req: Request, res: Response) => {
        skillsService.getAll().then(result => {
          res.send(result);
      })
    });

    /**
     * Return only one post in JSON relative to its id
     */
    router.get('/:id', (req: Request, res: Response) => {
      const id = parseInt(req.params.id);
      skillsService.getById(id).then(result => {
            res.send(result);
        })
        .catch(err => {
          console.log(err);
        })
    });

    /**
     * Create a new post from a JSON body and return the created post in JSON.
     */
    router.post('/', (req: Request, res: Response) => {
      const skill: Skill = req.body; // Automatically transform in a Post object
      skillsService.create(skill).then(result => {
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
      const skill: Skill = req.body; // req.params.id is automatically set into the body

      skillsService.update(skill).then(result => {
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

      skillsService.delete(id).then(result => {
            res.send();
        })
        .catch(err => {
          console.log(err);
        })
    });

    app.use('/skills', router);
};
