import { Router } from 'express';

import { getUser, getRanking } from '../controllers/usersController.js'
import validateToken from '../middlewares/tokenMiddleware.js';

const usersRouter = Router();

usersRouter.get('/users/:id', validateToken, getUser);
usersRouter.get('/ranking', getRanking);

export default usersRouter;