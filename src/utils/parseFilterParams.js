// src/utils/parseFilterParams.js

  const parseTime = (time) => {
    if (!(typeof time === 'string')) return time;
  };

  export const parseFilterParams = (query) => {
    const { time } = query;

    const parsedTime = parseTime(time);
    return {
      time: parsedTime,
    };
  };
