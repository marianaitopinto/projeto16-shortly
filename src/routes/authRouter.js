import { Router } from 'express';

import {signUp} from '../controllers/authController.js'
import {validateSchema} from '../middlewares/schemaMiddleware.js'
import signUpSchema from '../schemas/signUpSchema.js'

const authRouter = Router();

authRouter.post('/signup', validateSchema(signUpSchema), signUp);

export default authRouter;