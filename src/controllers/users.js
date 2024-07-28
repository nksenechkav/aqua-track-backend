import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { env } from '../utils/env.js';
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';
import { updateUser, getAllUsers } from '../services/users.js';
import createHttpError from 'http-errors';

export const patchUserController = async (req, res, next) => {
  const userId = req.user._id;
  const photo = req.file;
  const user = req.body;
  let photoUrl;

  if (photo) {
    if (env('ENABLE_CLOUDINARY') === 'true') {
      photoUrl = await saveFileToCloudinary(photo);
    } else {
      photoUrl = await saveFileToUploadDir(photo);
    }
  }

  const result = await updateUser({
    userId,
    user,
    photo: photoUrl,
  });

  if (!result) {
    next(createHttpError(404, 'User not found'));
    return;
  }

  res.json({
    status: 200,
    message: `Successfully updated user!`,
    data: result.user,
  });
};
export const getUserByIdController = async (req, res, next) => {
  const user = req.user;
  const userId = user._id;
  if (!user) {
    next(createHttpError(404, 'User not found'));
    return;
  }

  res.status(200).json({
    status: 200,
    message: `Successfully found user with id ${userId}!`,
    data: user,
  });
};

export const getAllUsersController = async (req, res) => {
  const usersCount = await getAllUsers();

  res.json({
    status: 200,
    message: 'Successfully found the amount of users!',
    usersAmount: usersCount,
  });
};
