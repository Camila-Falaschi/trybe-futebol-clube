import { Router } from 'express';
import loginRouter from './loginRouter';
import teamsRouter from './teamsRouter';

const router = Router();

router.use('/login', loginRouter);
router.use('/teams', teamsRouter);

export default router;
