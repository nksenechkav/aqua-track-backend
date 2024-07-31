import mongoose from 'mongoose';

export const getMonthWaterByDays = (waterEntries, userWaterAmount) => {
  if (!Array.isArray(waterEntries) || waterEntries.length === 0) {
    throw new Error('Invalid input: waterEntries must be a non-empty array');
  }

  const waterPerDays = {};
  console.log('Input waterEntries:', waterEntries);

  // Функція для корекції формату дати
  const correctDateFormat = (dateStr) => {
    return dateStr.replace(
      /T(\d{1,2})(\d{2}):(\d{2}):(\d{2})Z$/,
      (match, p1, p2, p3) => {
        const correctedHour = p1.length === 1 ? '0' + p1 : p1;
        const correctedMinute = p2.length === 1 ? '0' + p2 : p2;
        return `T${correctedHour}:${correctedMinute}:${p3}Z`;
      },
    );
  };

  for (const entry of waterEntries) {
    try {
      let dateStr = entry.time;
      dateStr = correctDateFormat(dateStr);

      const date = new Date(dateStr);
      console.log(`Processing entry date: ${date}`);

      if (isNaN(date.getTime())) {
        console.error(`Invalid time value for entry: ${JSON.stringify(entry)}`);
        continue;
      }

      const formattedDate = `${date.getUTCFullYear()}-${String(
        date.getUTCMonth() + 1,
      ).padStart(2, '0')}-${String(date.getUTCDate()).padStart(2, '0')}`;
      console.log(`Formatted date: ${formattedDate}`);

      if (!waterPerDays[formattedDate]) {
        waterPerDays[formattedDate] = {
          time: formattedDate,
          amount: 0,
          userId: entry.userId,
          _id: new mongoose.Types.ObjectId(),
          daylyProgress: '0%',
          waterAmount: `${userWaterAmount}L`, // Додаємо waterAmount
        };
      }

      waterPerDays[formattedDate].amount += entry.amount;
      waterPerDays[formattedDate].daylyProgress = `${Math.round(
        (waterPerDays[formattedDate].amount / (userWaterAmount * 1000)) * 100
      )}%`; // Оновлюємо daylyProgress з %

    } catch (error) {
      console.error(
        `Error processing entry: ${JSON.stringify(entry)} - ${error.message}`,
      );
      continue;
    }
  }

  const firstEntryDate = new Date(waterEntries[0].time);
  console.log(
    `Year: ${firstEntryDate.getUTCFullYear()} Month: ${firstEntryDate.getUTCMonth()+1}`,
  );

  const year = firstEntryDate.getUTCFullYear();
  const month = firstEntryDate.getUTCMonth();

  const daysInMonth = new Date(year, month + 1, 0).getUTCDate();
  console.log(`Days in month: ${daysInMonth+1}`);

  for (let day = 1; day <= daysInMonth+1; day++) {
    const formattedDate = `${year}-${String(month + 1).padStart(
      2,
      '0',
    )}-${String(day).padStart(2, '0')}`;
    if (!waterPerDays[formattedDate]) {
      waterPerDays[formattedDate] = {
        time: formattedDate,
        amount: 0,
        userId: null,
        _id: null,
        daylyProgress: '0%',
        waterAmount: `${userWaterAmount}L`, // Додаємо waterAmount
      };
    }
  }

  const resultArray = Object.values(waterPerDays).sort(
    (a, b) => new Date(a.time) - new Date(b.time),
  );
  console.log('Sorted result array:', resultArray);

  return resultArray;
};
