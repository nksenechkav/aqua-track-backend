 // src/controllers/water.js

 import { createWater, deleteWater, getUserWaterConsumptionByDay, getUserWaterConsumptionByMonth, updateWater } from '../services/water.js';
 import { parsePaginationParams } from '../utils/parsePaginationParams.js';
 import { parseSortParams } from '../utils/parseSortParams.js';
 import { parseFilterParams } from '../utils/parseFilterParams.js';

 import createHttpError from 'http-errors';

 export const getUserWaterConsumptionByDayController = async (req, res, next) => {
    const userId = req.user._id;
    const { date, page, perPage, sortBy, sortOrder } = req.query;

    const paginationParams = parsePaginationParams({ page, perPage });
    const sortParams = parseSortParams({ sortBy, sortOrder });
    const filterParams = parseFilterParams(req.query);

    try {
      const data = await getUserWaterConsumptionByDay(userId, date, paginationParams, sortParams, filterParams);
      res.status(200).json({
        status: 200,
        message: `Successfully fetched water consumption for the day ${date}`,
        data,
      });
    } catch (error) {
      next(createHttpError(400, error.message));
    }
  };

  export const getUserWaterConsumptionByMonthController = async (req, res, next) => {
    const userId = req.user._id;
    const { month, page, perPage, sortBy, sortOrder } = req.query;

    const paginationParams = parsePaginationParams({ page, perPage });
    const sortParams = parseSortParams({ sortBy, sortOrder });
    const filterParams = parseFilterParams(req.query);

    try {
      const data = await getUserWaterConsumptionByMonth(userId, month, paginationParams, sortParams, filterParams);
      res.status(200).json({
        status: 200,
        message: `Successfully fetched water consumption for the month ${month}`,
        data,
      });
    } catch (error) {
      next(createHttpError(400, error.message));
    }
  };
//  export const getWaterController = async (req, res, next) => {
//     const { page, perPage } = parsePaginationParams(req.query);
//     const { sortBy, sortOrder } = parseSortParams(req.query);
//     const filter = parseFilterParams(req.query);
//     const userId = req.user._id;

//     const water = await getAllWater({
//       page,
//       perPage,
//       sortBy,
//       sortOrder,
//       filter,
//       userId,
//   });

//   if (water.data.length === 0) {
//     next(createHttpError(404, 'Entries of water not found'));
//     return;
//   }

//     res.status(200).json({
//       status: 200,
//       message: 'Successfully found entries of water!',
//       data: water,
//     });
//  };

//  export const getWaterByIdController = async (req, res, next) => {
//     const { id } = req.params;
//     const userId = req.user._id;

//     const water = await getWaterById(id, userId);
//     if (!water) {
//       next(createHttpError(404, `Entry of Water not found`));
//       return;
//     }

//     res.status(200).json({
//       status: 200,
//       message: `Successfully found entry of Water with id ${id}!`,
//       data: water,
//     });
//  };

 export const createWaterController = async (req, res) => {
  const userId  = req.user._id;

  const water = await createWater({
    ...req.body,
  }, userId);

  res.status(201).json({
    status: 201,
    message: `Successfully created an entry of Water!`,
    data: water,
  });
};

export const patchWaterController = async (req, res, next) => {
  const { id } = req.params;
  const userId  = req.user._id;

  const result = await updateWater(id, userId, {
    ...req.body
  });

  if (!result) {
    next(createHttpError(404, 'Entry of Water not found'));
    return;
  }

  res.status(200).json({
    status: 200,
    message: `Successfully patched an entry of entry of Water!`,
    data: result.water,
  });
};

export const deleteWaterController = async (req, res, next) => {
  const { id } = req.params;
  const  userId  = req.user._id;
  const water = await deleteWater(id, userId);

  if (!water) {
    next(createHttpError(404, 'Entry of Water not found'));
    return;
  }

  res.status(204).send();
};
