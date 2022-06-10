import { Router } from 'express';

import usersRouter from './usersRouter.js';
import authRouter from './authRouter.js';

const routers = Router();

routers.use(authRouter);
routers.use(usersRouter);

export default routers;