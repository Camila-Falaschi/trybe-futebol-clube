import { Router } from 'express';
import { validateLogin } from '../middlewares/validations';
import LoginController from '../controllers/LoginController';

const loginRouter = Router();
const loginController = new LoginController();

loginRouter.post('/', validateLogin, (req, res) => loginController.login(req, res));

export default loginRouter;