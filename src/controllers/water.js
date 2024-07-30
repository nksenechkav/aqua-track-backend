// src/controllers/water.js

import {
  createWater,
  deleteWater,
  getUserWaterConsumptionByDay,
  getUserWaterConsumptionByMonth,
  updateWater,
} from '../services/water.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import createHttpError from 'http-errors';
import { calculateTotalWaterAmount } from '../utils/сalculateTotalWaterAmount.js';
import { getMonthWaterByDays } from '../utils/getMonthWaterByDays.js';
import { UsersCollection } from '../db/models/user.js';

export const getUserWaterConsumptionByDayController = async (
  req,
  res,
  next,
) => {
  const userId = req.user._id;

  const { sortBy, sortOrder } = parseSortParams(req.query);

  const { date } = req.query;

  if (!date) {
    return next(createHttpError(400, 'Date query parameter is required'));
  }

  const water = await getUserWaterConsumptionByDay({
    userId,
    date,
    sortBy,
    sortOrder,
  });

  if (water.data.length === 0) {
    res.status(200).json({
      status: 200,
      message: `Entries of water do not exist for the day ${date}`,
      water,
    });

    next(createHttpError(404, 'Entries of water not found'));
    return;
  }
  const totalWaterAmount = calculateTotalWaterAmount(water.data);

  res.status(200).json({
    status: 200,
    message: `Successfully fetched water consumption for the day ${date}`,
    totalWaterAmount,
    water,
  });
};

export const getUserWaterConsumptionByMonthController = async (
  req,
  res,
  next,
) => {
  const userId = req.user._id;

  const { sortBy, sortOrder } = parseSortParams(req.query);
  const { month } = req.query;

  if (!month) {
    return next(createHttpError(400, 'Month query parameter is required'));
  }

  const water = await getUserWaterConsumptionByMonth({
    userId,
    month,
    sortBy,
    sortOrder,
  });

  if (water.data.length === 0) {
    res.status(200).json({
      status: 200,
      message: `Entries of water do not exist for the month ${month}`,
      water,
    });
    next(createHttpError(404, 'Entries of water not found'));
    return;
  }

  // Отримуємо інформацію про користувача, щоб отримати waterAmount
  const user = await UsersCollection.findById(userId).exec();
  const userWaterAmount = user.waterAmount || 1.8; // Якщо немає значення, використовуємо 1.8 за замовчуванням

  const totalWaterAmount = calculateTotalWaterAmount(water.data);
  const monthWaterByDays = getMonthWaterByDays(water.data, userWaterAmount);

  res.status(200).json({
    status: 200,
    message: `Successfully fetched water consumption for the month ${month}`,
    totalWaterAmount,
    water: {
      data: monthWaterByDays,
    },
  });
};


export const createWaterController = async (req, res) => {
  const userId = req.user._id;

  const water = await createWater(
    {
      ...req.body,
    },
    userId,
  );

  res.status(201).json({
    status: 201,
    message: `Successfully created an entry of Water!`,
    data: water,
  });
};

export const patchWaterController = async (req, res, next) => {
  const { id } = req.params;
  const userId = req.user._id;

  const result = await updateWater(id, userId, {
    ...req.body,
  });

  if (!result) {
    next(createHttpError(404, 'Entry of Water not found'));
    return;
  }

  res.status(200).json({
    status: 200,
    message: `Successfully patched an entry of Water!`,
    data: result.water,
  });
};

export const deleteWaterController = async (req, res, next) => {
  const { id } = req.params;
  const userId = req.user._id;
  const water = await deleteWater(id, userId);

  if (!water) {
    next(createHttpError(404, 'Entry of Water not found'));
    return;
  }

  res.status(204).send();
};
