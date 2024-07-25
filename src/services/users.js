import { UsersCollection } from '../db/models/user.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

import { SORT_ORDER } from '../constants/index.js';

export const getUserById = async (userId) => {
  const user = await UsersCollection.findOne({ _id: userId });
  return user;
};

export const updateUser = async (userId, payload, options = {}) => {
  payload.photo = options.photo;
  try {
    const rawResult = await UsersCollection.findOneAndUpdate(
      { _id: userId },
      payload,
      {
        new: true,
        includeResultMetadata: true,
        ...options,
      },
    );

    if (!rawResult || !rawResult.value) {
      return null;
    }
    return {
      contact: rawResult.value,
      isNew: Boolean(rawResult?.lastErrorObject?.upserted),
    };
  } catch (error) {
    console.error('Error during update user:', error);
    throw error;
  }
};

export const getAllUsers = async ({
  page,
  perPage,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;
  const usersQuery = UsersCollection.find();

  const usersCount = await UsersCollection.find()
    .merge(usersQuery)
    .countDocuments();

  const users = await usersQuery
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder })
    .exec();

  const paginationData = calculatePaginationData(usersCount, perPage, page);

  return {
    data: users,
    ...paginationData,
  };
};
