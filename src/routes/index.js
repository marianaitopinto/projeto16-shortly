import { Router } from 'express';

import usersRouter from './usersRouter.js';
import authRouter from './authRouter.js';
import urlRouter from './urlsRouter.js';

const routers = Router();

routers.use(authRouter);
routers.use(usersRouter);
routers.use(urlRouter);

export default routers;