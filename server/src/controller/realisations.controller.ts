import { Realisation } from './../models/realisation';
import { RealisationsService } from './../services/realisations.service';
import express, { Router, Request, Response, Application } from 'express';

/**
 * Ce controller vous servira de modèle pour construire vos différent controller
 * Le controller est la partie de l'application qui est en charge de la reception
 * des requetes http.
 *
 * @param app l'application express
 */
export const RealisationsController = (app: Application) => {

    const router: Router = express.Router();
    const realService = RealisationsService.getInstance();

    /**
     * Return all posts in JSON
     */

    router.post('/upload', async (req, res) => {
      try {
        if(!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {
            let image: any = req.files.image;

            image.mv('./uploads/' + image.name);

            res.send({
                status: true,
                message: 'File is uploaded',
                data: {
                    name: image.name,
                    mimetype: image.mimetype,
                    size: image.size
                }
            });
        }
    } catch (err) {
        res.status(500).send(err);
    }
  });

    router.get('/', (req: Request, res: Response) => {
        realService.getAll().then(result => {
          res.send(result);
      })
    });

    /**
     * Return only one post in JSON relative to its id
     */
    router.get('/:id', (req: Request, res: Response) => {
      const id = parseInt(req.params.id);
      realService.getById(id).then(result => {
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
      const real: Realisation = req.body; // Automatically transform in a Post object
      realService.create(real).then(result => {
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
      const real: Realisation = req.body; // req.params.id is automatically set into the body

      realService.update(real).then(result => {
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

      realService.delete(id).then(result => {
            res.send();
        })
        .catch(err => {
          console.log(err);
        })
    });

    app.use('/realisations', router);
};
