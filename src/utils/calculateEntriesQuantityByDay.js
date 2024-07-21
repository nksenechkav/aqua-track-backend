/**
 * Підрахунок кількості записів за один конкретний день.
 * @param {Object[]} waterEntries - Масив записів про випиту воду.
 * @param {string} waterEntries[].time - Час запису у форматі ISO.
 * @returns {Object} - Об'єкт з підрахованими записами для кожного дня.
 */
export function countEntriesByDay(waterEntries) {
    if (!Array.isArray(waterEntries) || waterEntries.length === 0) {
        throw new Error("Invalid input: waterEntries must be a non-empty array");
    }

    return waterEntries.reduce((acc, entry) => {
        const date = new Date(entry.time);

        if (isNaN(date.getTime())) {
            console.error(`Invalid date value: ${entry.time}`);
            return acc; // Пропустіть некоректні записи
        }

        const dateKey = date.toISOString().split('T')[0]; // Формат YYYY-MM-DD
        if (!acc[dateKey]) {
            acc[dateKey] = 0;
        }
        acc[dateKey] += 1;
        return acc;
    }, {});
}
