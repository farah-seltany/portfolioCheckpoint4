import express from 'express';
import loaders from './loaders';
import { UsersController } from './controller/users.controller';
import { SkillsController } from './controller/skills.controller';
import { CompetencesController } from './controller/competences.controller';
import { RealisationsController } from './controller/realisations.controller';

async function startServer() {
  // Récupération de l'application initiale
  const app = express();

  // Certificate
  
  // Chargement des différent loader
  await loaders(app);
  
  // Ajout des différentes route de votre application

  UsersController(app);
  SkillsController(app);
  CompetencesController(app);
  RealisationsController(app);

  
  // Démarrage du serveur une fois que tout est correctement init
  app.listen(3000, () => console.log('HTTP Express server  is running'));
}

startServer();
