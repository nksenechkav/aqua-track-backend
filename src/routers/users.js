// src/routers/auth.js

import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

import { getAllUsersController } from '../controllers/users.js';
import { validateBody } from '../middlewares/validateBody.js';
import { authenticate } from '../middlewares/authenticate.js';

import {
  patchUserController,
  getUserByIdController,
} from '../controllers/users.js';
import { updateUserSchema } from '../validation/updateUserSchema.js';
import { upload } from '../middlewares/multer.js';

const router = Router();

router.get('/', ctrlWrapper(getAllUsersController));

router.use(authenticate);

router.get('/currentUser', ctrlWrapper(getUserByIdController));
router.patch(
  '/currentUser',
  validateBody(updateUserSchema),
  upload.single('photo'),
  ctrlWrapper(patchUserController),
);
export default router;
