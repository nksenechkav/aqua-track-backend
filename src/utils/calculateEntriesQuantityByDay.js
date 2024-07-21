export function countEntriesPerDay(waterEntries) {
    if (!Array.isArray(waterEntries) || waterEntries.length === 0) {
        throw new Error("Invalid input: waterEntries must be a non-empty array");
    }

    // Об'єкт для зберігання результатів
    const dailyCounts = {};

    waterEntries.forEach(entry => {
        // Отримуємо тільки дату (без часу) у форматі 'YYYY-MM-DD'
        const date = new Date(entry.time).toISOString().split('T')[0];

        // Ініціалізуємо лічильник для дати, якщо ще не існує
        if (!dailyCounts[date]) {
            dailyCounts[date] = 0;
        }

        // Оновлюємо лічильник записів для поточної дати
        dailyCounts[date] += 1;
    });

    // Перетворюємо об'єкт у масив з результатами
    return Object.entries(dailyCounts).map(([date, count]) => ({
        date: new Date(date).toLocaleDateString('en-US', { day: 'numeric', month: 'long' }),
        entriesQuantity: count,
    }));
}

