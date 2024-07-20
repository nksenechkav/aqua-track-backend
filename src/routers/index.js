// src/routers/index.js

import { Router } from 'express';
// import waterRouter from './water.js';
import usersRouter from './users.js';

const router = Router();

// router.use('/water', waterRouter);
router.use('/users', usersRouter);

export default router;
