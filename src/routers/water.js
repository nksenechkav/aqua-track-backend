// src/routers/water.js

import { Router } from 'express';

import {
  createWaterController,
  patchWaterController,
  deleteWaterController,
  getUserWaterConsumptionByMonthController,
  getUserWaterConsumptionByDayController
} from '../controllers/water.js';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { isValidId } from '../middlewares/isValidId.js';
import { createWaterSchema, updateWaterSchema } from '../validation/water.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = Router();

router.use(authenticate);
router.use('/:id', isValidId);

router.get('/daily', authenticate, ctrlWrapper(getUserWaterConsumptionByDayController));
router.get('/monthly', authenticate, ctrlWrapper(getUserWaterConsumptionByMonthController));
// router.get('/', ctrlWrapper (getWaterController));
// router.get('/:id', ctrlWrapper(getWaterByIdController));
router.post('', validateBody(createWaterSchema), ctrlWrapper(createWaterController));
router.patch('/:id', validateBody(updateWaterSchema), ctrlWrapper(patchWaterController));
router.delete('/:id', ctrlWrapper(deleteWaterController));

export default router;
