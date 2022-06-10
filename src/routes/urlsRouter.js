import { Router } from 'express';

import { shortUrl, getUrlById, operUrl, deleteUrl } from '../controllers/urlController.js';
import {validateSchema} from '../middlewares/schemaMiddleware.js'
import validateToken from '../middlewares/tokenMiddleware.js';
import urlSchema from '../schemas/urlSchema.js';

const urlRouter = Router();

urlRouter.post('/urls/shorten', validateToken, validateSchema(urlSchema), shortUrl)
urlRouter.get('/urls/:id', getUrlById)
urlRouter.get('/urls/open/:shortUrl', operUrl);
urlRouter.delete('/urls/:id', validateToken, deleteUrl);

export default urlRouter;