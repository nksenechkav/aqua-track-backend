export const getMonthWaterByDays = (waterEntries) => {
  // Перевіряємо, чи є waterEntries масивом і чи він не порожній
  if (!Array.isArray(waterEntries) || waterEntries.length === 0) {
    throw new Error('Invalid input: waterEntries must be a non-empty array');
  }

  // Створюємо об'єкт для зберігання води за кожен день
  const waterPerDays = {};
  console.log('Input waterEntries:', waterEntries);

  // Функція для корекції формату дати
  const correctDateFormat = (dateStr) => {
    return dateStr.replace(
      /T(\d{1,2})(\d{2}):(\d{2}):(\d{2})Z$/,
      (match, p1, p2, p3) => {
        // Виправляємо формат годин і хвилин
        const correctedHour = p1.length === 1 ? '0' + p1 : p1;
        const correctedMinute = p2.length === 1 ? '0' + p2 : p2;
        return `T${correctedHour}:${correctedMinute}:${p3}Z`;
      },
    );
  };

  // Обробляємо кожен запис води
  for (const entry of waterEntries) {
    try {
      // Виправляємо формат дати, якщо необхідно
      let dateStr = entry.time;
      dateStr = correctDateFormat(dateStr);

      // Перетворюємо рядок часу у об'єкт Date
      const date = new Date(dateStr);
      console.log(`Processing entry date: ${date}`);

      // Перевіряємо, чи є час дійсним
      if (isNaN(date.getTime())) {
        console.error(`Invalid time value for entry: ${JSON.stringify(entry)}`);
        continue; // Пропускаємо цей запис
      }

      // Форматуємо дату у вигляді YYYY-MM-DD
      const formattedDate = `${date.getUTCFullYear()}-${String(
        date.getUTCMonth() + 1,
      ).padStart(2, '0')}-${String(date.getUTCDate()).padStart(2, '0')}`;
      console.log(`Formatted date: ${formattedDate}`);

      // Якщо дата ще не існує в об'єкті, створюємо новий запис
      if (!waterPerDays[formattedDate]) {
        waterPerDays[formattedDate] = {
          time: formattedDate,
          amount: 0,
          userId: entry.userId,
          _id: entry._id,
        };
      }

      // Додаємо кількість води до відповідного дня
      waterPerDays[formattedDate].amount += entry.amount;
    } catch (error) {
      // Виводимо помилку, якщо щось пішло не так при обробці запису
      console.error(
        `Error processing entry: ${JSON.stringify(entry)} - ${error.message}`,
      );
      continue; // Пропускаємо цей запис при помилці
    }
  }

  // Переконуємось, що всі дні місяця представлені
  // Отримуємо рік і місяць з першого запису
  const firstEntryDate = new Date(waterEntries[0].time);
  console.log(
    `Year: ${firstEntryDate.getUTCFullYear()} Month: ${firstEntryDate.getUTCMonth()}`,
  );

  const year = firstEntryDate.getUTCFullYear();
  const month = firstEntryDate.getUTCMonth();

  // Отримуємо кількість днів у місяці
  const daysInMonth = new Date(year, month + 1, 0).getUTCDate();
  console.log(`Days in month: ${daysInMonth}`);

  // Перебираємо всі дні місяця та додаємо їх до waterPerDays, якщо їх там ще немає
  for (let day = 1; day <= daysInMonth; day++) {
    const formattedDate = `${year}-${String(month + 1).padStart(
      2,
      '0',
    )}-${String(day).padStart(2, '0')}`;
    if (!waterPerDays[formattedDate]) {
      waterPerDays[formattedDate] = {
        time: formattedDate,
        amount: 0,
        userId: null,
        _id: null, // Якщо даних немає, залишаємо як null
      };
    }
  }

  // Перетворюємо об'єкт waterPerDays у масив і сортуємо його за датою
  const resultArray = Object.values(waterPerDays).sort(
    (a, b) => new Date(a.time) - new Date(b.time),
  );
  console.log('Sorted result array:', resultArray);

  return resultArray;
};
