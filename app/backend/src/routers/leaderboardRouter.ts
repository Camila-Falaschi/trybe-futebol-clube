import { Router } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';

const leaderboardRouter = Router();
const leaderboardController = new LeaderboardController();

leaderboardRouter.get('/home', (req, res) =>
  leaderboardController.getLeaderboardHomeTeam(req, res));
leaderboardRouter.get('/away', (req, res) =>
  leaderboardController.getLeaderboardAwayTeam(req, res));
leaderboardRouter.get('/', (req, res) =>
  leaderboardController.getLeaderboardAllMatches(req, res));

export default leaderboardRouter;
