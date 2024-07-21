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

router.get('/daily', ctrlWrapper(getUserWaterConsumptionByDayController));
router.get('/monthly', ctrlWrapper(getUserWaterConsumptionByMonthController));
router.post('', validateBody(createWaterSchema), ctrlWrapper(createWaterController));
router.patch('/:id', isValidId, validateBody(updateWaterSchema), ctrlWrapper(patchWaterController));
router.delete('/:id', isValidId, ctrlWrapper(deleteWaterController));

export default router;
