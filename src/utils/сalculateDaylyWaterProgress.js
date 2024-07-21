/**
 * Розрахунок денного прогресу випитої води у відсотках.
 * @param {Object[]} waterEntries - Массив записів про випиту воду за день.
 * @param {string} waterEntries[].time - Час запису.
 * @param {number} waterEntries[].amount - Кількість випитої води у мл.
 * @param {number} waterEntries[].dailyWaterRequirement - Денна норма води у літрах.
 * @returns {number} - Денний прогрес у відсотках.
 */
export function calculateDailyWaterProgress(waterEntries) {
    if (!Array.isArray(waterEntries) || waterEntries.length === 0) {
        throw new Error("Invalid input: waterEntries must be a non-empty array");
    }

    // Сума випитої води за день в мл
    const totalAmount = waterEntries.reduce((sum, entry) => sum + entry.amount, 0);

    // Всі записи мають однакову dennu normu води, беремо перший запис
    const dailyWaterRequirement = waterEntries[0].dailyWaterRequirement * 1000; // Переводимо в мл

    // Розраховуємо прогрес у відсотках
    const progress = (totalAmount / dailyWaterRequirement) * 100;

    // Обмежуємо прогрес до 100%
    return Math.min(progress, 100).toFixed(2);
}

// Приклад даних з бази
const waterEntries = [
    {
        time: "2024-07-21T10:30:00Z",
        amount: 200,
        dailyWaterRequirement: 2,
        userId: "669d149a9ab78958deddbb55",
        createdAt: "2024-07-21T14:04:15.661+00:00",
        updatedAt: "2024-07-21T14:04:15.661+00:00"
    },
    // Додаткові записи за цей день
    {
        time: "2024-07-21T12:30:00Z",
        amount: 300,
        dailyWaterRequirement: 2,
        userId: "669d149a9ab78958deddbb55",
        createdAt: "2024-07-21T14:05:15.661+00:00",
        updatedAt: "2024-07-21T14:05:15.661+00:00"
    }
];

// Виклик функції
const dailyProgress = calculateDailyWaterProgress(waterEntries);
console.log(`Daily Water Progress: ${dailyProgress}%`);
