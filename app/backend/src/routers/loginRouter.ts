import { Router } from 'express';
import { validateLogin, validateToken } from '../middlewares/validations';
import LoginController from '../controllers/LoginController';

const loginRouter = Router();
const loginController = new LoginController();

loginRouter.post('/', validateLogin, (req, res) => loginController.login(req, res));
loginRouter.get('/validate', validateToken, (req, res) => loginController.validate(req, res));

export default loginRouter;
