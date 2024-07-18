 // src/middlewares/notFoundHandler.js

 export const notFoundHandler = (req, res, next) => {
    res.json({
        status: 404,
        message: 'Route not found',
      });
    next();
  };
