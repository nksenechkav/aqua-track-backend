import { UsersCollection } from '../db/models/user.js';

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

export const getAllUsers = async () => {
  const usersQuery = UsersCollection.find();

  const usersCount = await UsersCollection.find()
    .merge(usersQuery)
    .countDocuments();

  // const users = await usersQuery.exec();

  // let photos = [];
  // users.forEach((user) => {
  //   if (user.photo) {
  //     photos.push(user.photo);
  //   }
  // });

  return {
    usersCount: usersCount,
    //usersPhotos: photos,
  };
};
