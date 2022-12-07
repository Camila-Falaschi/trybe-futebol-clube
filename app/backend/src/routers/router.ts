import { Router } from 'express';
import leaderboardRouter from './leaderboardRouter';
import loginRouter from './loginRouter';
import matchesRouter from './matchesRouter';
import teamsRouter from './teamsRouter';

const router = Router();

router.use('/login', loginRouter);
router.use('/teams', teamsRouter);
router.use('/matches', matchesRouter);
router.use('/leaderboard', leaderboardRouter);

export default router;
