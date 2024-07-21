import { isValidObjectId } from "mongoose";

import createHttpError from 'http-errors';

export const isValidId = (req, res, next) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    next(createHttpError(404, "Not found entry of with invalid ID"));
  }

  next();
};
