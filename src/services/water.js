//  // src/services/water.js

import { WaterCollection } from '../db/models/water.js';
import { SORT_ORDER } from '../constants/index.js';

export const getUserWaterConsumptionByDay = async ({
  userId,
  date,
  sortOrder = SORT_ORDER.ASC,
  sortBy = 'time',
}) => {
  const startDate = new Date(date);
  const endDate = new Date(date);
  endDate.setUTCDate(endDate.getUTCDate() + 1); // Наступний день для визначення кінця діапазону

  const waterQuery = WaterCollection.find({
    userId,
    time: {
      $gte: startDate.toISOString(),
      $lt: endDate.toISOString(),
    },
  });

  const [waterCount, water] = await Promise.all([
    WaterCollection.find().merge(waterQuery).countDocuments(),
    waterQuery
      .sort({ [sortBy]: sortOrder })
      .exec(),
  ]);

  return {
    data: water,
    waterCount
  };
};

export const getUserWaterConsumptionByMonth = async ({
  userId,
  month,
}) => {
  const startDate = new Date(`${month}-01T00:00:00Z`);
  const endDate = new Date(startDate);
  endDate.setUTCMonth(startDate.getUTCMonth() + 1);

  const waterQuery = WaterCollection.find({
    userId,
    time: {
      $gte: startDate.toISOString(),
      $lt: endDate.toISOString(),
    },
  });

  const [waterCount, water] = await Promise.all([
    WaterCollection.find().merge(waterQuery).countDocuments(),
  ]);

  return {
    data: water,
    waterCount
  };
};

export const createWater = async (payload, userId) => {
  const water = await WaterCollection.create({ ...payload, userId });
  return water;
};

export const updateWater = async (id, userId, payload, options = {}) => {
  const rawResult = await WaterCollection.findOneAndUpdate(
    { _id: id, userId },
    payload,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );

  if (!rawResult || !rawResult.value) return null;

  return {
    water: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};

export const deleteWater = async (id, userId) => {
  const water = await WaterCollection.findOneAndDelete({
    _id: id,
    userId,
  });

  return water;
};
