import { Router } from 'express';
import { validateToken } from '../middlewares/validations';
import MatchesController from '../controllers/MatchesController';

const matchesRouter = Router();
const matchesController = new MatchesController();

matchesRouter.get('/', (req, res) => matchesController.getMatches(req, res));
matchesRouter.post('/', validateToken, (req, res) => matchesController.createNewMatch(req, res));
matchesRouter.patch('/:id/finish', (req, res) => matchesController.updateMatchToFinished(req, res));
matchesRouter.patch('/:id', (req, res) => matchesController.updateMatchGoals(req, res));

export default matchesRouter;
