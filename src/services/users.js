import { UsersCollection } from '../db/models/user.js';

export const updateUser = async (input) => {
  const updateData = { ...input.user };
  if (input.photo) {
    updateData.photo = input.photo;
  }
  try {
    const updateUser = await UsersCollection.findOneAndUpdate(
      { _id: input.userId },
      { $set: updateData },
      { new: true },
    );

    return {
      user: updateUser,
      isNew: Boolean(updateUser?.lastErrorObject?.upserted),
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

  // photo **************

  // const users = await usersQuery.exec();

  // let photos = [];
  // users.forEach((user) => {
  //   if (user.photo) {
  //     photos.push(user.photo);
  //   }
  // });

  return {
    usersAmount: usersCount,
    //usersPhotos: photos,
  };
};
