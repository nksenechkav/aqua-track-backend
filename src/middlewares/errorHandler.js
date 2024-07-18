 // src/middlewares/errorHandler.js

 import { HttpError } from 'http-errors';
 import { MongooseError } from 'mongoose';

 export const errorHandler = (err, req, res, next) => {
    if (err instanceof HttpError) {
        res.status(err.status).json({
          status: err.status,
          message: err.name,
          data: err,
        });
        return;
      }

      if (err instanceof MongooseError) {
        res.status(404).json({
          status: 404,
          message: "NotFoundError",
          data: {
            message:"Contact not found"
          },
        });
        return;
      }

    res.json({
        status: 500,
        message: 'Something went wrong',
        error: err.message,
      });
    next(err);
  };
