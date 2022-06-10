import { Router } from 'express';

import { shortUrl } from '../controllers/urlController.js';
import {validateSchema} from '../middlewares/schemaMiddleware.js'
import urlSchema from '../schemas/urlSchema.js';
import validateToken from '../middlewares/tokenMiddleware.js';

const urlRouter = Router();

urlRouter.post('/urls/shorten', validateToken, validateSchema(urlSchema), shortUrl)

export default urlRouter;