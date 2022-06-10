import { Router } from 'express';

import {signUp, signIn} from '../controllers/authController.js'
import {validateSchema} from '../middlewares/schemaMiddleware.js'
import signUpSchema from '../schemas/signUpSchema.js'
import signInSchema from '../schemas/signInSchema.js'

const authRouter = Router();

authRouter.post('/signup', validateSchema(signUpSchema), signUp);
authRouter.post('/signin', validateSchema(signInSchema), signIn);

export default authRouter;