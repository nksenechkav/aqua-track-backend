//  // src/services/water.js

 import { WaterCollection } from '../db/models/water.js';
 import { calculatePaginationData } from '../utils/calculatePaginationData.js';
 import { SORT_ORDER } from '../constants/index.js';

 export const getUserWaterConsumptionByDay = async ({
      userId,
      date,
      page = 1,
      perPage = 10,
      sortOrder = SORT_ORDER.ASC,
      sortBy = '_id',
      filter = {},
    }) => {

    const limit = perPage;
    const skip = (page - 1) * perPage;

    const waterQuery = WaterCollection.find({
      userId,
      time: { $regex: `^${date}` } // assuming `time` is stored in 'YYYY-MM-DD' format
    });

    if (filter.time) {
      waterQuery.where('time').equals(filter.time);
    }

    const [waterCount, water] = await Promise.all([
      WaterCollection.find().merge(waterQuery).countDocuments(),
      waterQuery
        .skip(skip)
        .limit(limit)
        .sort({ [sortBy]: sortOrder })
        .exec(),
    ]);

    const paginationData = calculatePaginationData(waterCount, perPage, page);

    return {
      data: water,
      ...paginationData,
    };
  };

  export const getUserWaterConsumptionByMonth = async ({
    userId,
    month,
    page = 1,
    perPage = 10,
    sortOrder = SORT_ORDER.ASC,
    sortBy = '_id',
    filter = {},
  }) => {
    const limit = perPage;
    const skip = (page - 1) * perPage;

    const waterQuery = WaterCollection.find({
      userId,
      time: { $regex: `^${month}` } // assuming `time` is stored in 'YYYY-MM' format
    });

    if (filter.time) {
        waterQuery.where('time').equals(filter.time);
      }

    const [waterCount, water] = await Promise.all([
      WaterCollection.find().merge(waterQuery).countDocuments(),
      waterQuery
        .skip(skip)
        .limit(limit)
        .sort({ [sortBy]: sortOrder })
        .exec(),
    ]);

    const paginationData = calculatePaginationData(waterCount, perPage, page);

    return {
      data: water,
      ...paginationData,
    };
  };

//  export const getAllWater = async ({
//   page = 1,
//   perPage = 10,
//   sortOrder = SORT_ORDER.ASC,
//   sortBy = '_id',
//   filter = {},
//   userId,
// }) => {
//    const limit = perPage;
//    const skip = (page - 1) * perPage;

//    const waterQuery = WaterCollection.find({userId});

//    if (filter.time) {
//     waterQuery.where('time').equals(filter.time);
//   }

//   //  const waterCount = await WaterCollection.find()
//   //  .merge(contactsQuery)
//   //  .countDocuments();

//   //  const water = await waterQuery
//   //  .skip(skip)
//   //  .limit(limit)
//   //  .sort({ [sortBy]: sortOrder })
//   //  .exec();

//    const [waterCount, water] = await Promise.all([
//     WaterCollection.find().merge(waterQuery).countDocuments(),
//     waterQuery
//       .skip(skip)
//       .limit(limit)
//       .sort({ [sortBy]: sortOrder })
//       .exec(),
//   ]);

//     const paginationData = calculatePaginationData(waterCount, perPage, page);

//     return {
//       data: water,
//       ...paginationData,
//     };
//   };

//  export const getWaterById = async (id, userId) => {
//    const water = await WaterCollection.findOne({ _id: id, userId });
//    return water;
//  };

 export const createWater = async (payload, userId) => {
  const water = await WaterCollection.create({...payload, userId});
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
    _id: id, userId
  });

  return water;
};
