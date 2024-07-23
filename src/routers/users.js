// src/routers/auth.js

import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  loginUserSchema,
  loginWithGoogleOAuthSchema,
  registerUserSchema,
  requestResetEmailSchema,
  resetPasswordSchema,
} from '../validation/auth.js';
import {
  getGoogleOAuthUrlController,
  loginUserController,
  loginWithGoogleController,
  logoutUserController,
  refreshUserSessionController,
  registerUserController,
  requestResetEmailController,
  resetPasswordController,
  getAllUsersController,
} from '../controllers/auth.js';
import { validateBody } from '../middlewares/validateBody.js';
import { authenticate } from '../middlewares/authenticate.js';
//import { isValidId } from '../middlewares/isValidId.js';

import {
  patchUserController,
  getUserByIdController,
} from '../controllers/auth.js';
import { updateUserSchema } from '../validation/updateUserSchema.js';
import { upload } from '../middlewares/multer.js';

const router = Router();

router.get('/get-oauth-url', ctrlWrapper(getGoogleOAuthUrlController));
//router.use('/:userId', isValidId('userId'));

router.get('/', ctrlWrapper(getAllUsersController));

router.post(
  '/confirm-oauth',
  validateBody(loginWithGoogleOAuthSchema),
  ctrlWrapper(loginWithGoogleController),
);
router.post(
  '/register',
  validateBody(registerUserSchema),
  ctrlWrapper(registerUserController),
);
router.post(
  '/login',
  validateBody(loginUserSchema),
  ctrlWrapper(loginUserController),
);

router.post(
  '/send-reset-email',
  validateBody(requestResetEmailSchema),
  ctrlWrapper(requestResetEmailController),
);
router.post(
  '/reset-pwd',
  validateBody(resetPasswordSchema),
  ctrlWrapper(resetPasswordController),
);

router.use(authenticate);

router.post('/refresh', ctrlWrapper(refreshUserSessionController));
router.post('/logout', ctrlWrapper(logoutUserController));
router.get('/:userId', ctrlWrapper(getUserByIdController));
router.patch(
  '/:userId',
  validateBody(updateUserSchema),
  upload.single('photo'),
  ctrlWrapper(patchUserController),
);
export default router;
