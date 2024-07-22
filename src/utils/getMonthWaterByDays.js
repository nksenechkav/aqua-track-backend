export const getMonthWaterByDays = (waterEntries) => {
  //перевіряємо чи це масив і чи є записи
  if (!Array.isArray(waterEntries) || waterEntries.length === 0) {
    throw new Error('Invalid input: waterEntries must be a non-empty array');
  }

  //об"єкт ключами якого будуть числа місяця, а значеннями - одиничні записи про випиту воду
  //використовується для подальшого підрахунку
  const sortedEntries = {};

  //проходимо по масиву вхідних даних
  for (let i = 0; i < waterEntries.length; i += 1) {
    //конвертуємо стрінгову властивість time в об"єкт Date
    const time = new Date(waterEntries[i].time);

    //виділяємо з дати саме число місяця
    const day = time.getUTCDate();

    //якщо в об"єкті sortedEntries немає ключа таким число, то створюємо такий об"єкт
    if (!sortedEntries[day]) {
      sortedEntries[day] = [];
    }

    //зберігаємо в об"єкті sortedEntries з даним ключем day у масиві одиничний запис про випиту воду
    sortedEntries[day].push(waterEntries[i]);
  }

  //waterPerDaysArray міститиме масив об"єктів з сумарною випитою водою за день
  const waterPerDaysArray = [];

  //ключі sortedEntries, які є числами місяця
  const keys = Object.keys(sortedEntries);

  //проходимо по всім дням
  for (let i = 0; i < keys.length; i++) {
    //зберігаємо всю випиту воду за обраний день
    let allWaterPerDay = 0;

    //проходимо по всім записам випитої води за обраний день
    for (let j = 0; j < sortedEntries[keys[i]].length; j++) {
      //додаємо цю воду до загально випитої за день
      allWaterPerDay += sortedEntries[keys[i]][j]['amount'];

      //якщо останній запис за день, використаємо його як відповідь пититої води за обраний день
      if (j + 1 === sortedEntries[keys[i]].length) {
        waterPerDaysArray.push({
          //це по суті запис останньої випитої води
          ...sortedEntries[keys[i]][j].toObject(),
          //але значенням amount буде вся випита вода за день
          amount: allWaterPerDay,
        });
      }
    }
  }

  return waterPerDaysArray;
};
