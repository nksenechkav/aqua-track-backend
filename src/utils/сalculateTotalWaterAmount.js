
export function calculateTotalWaterAmount(waterEntries) {
    if (!Array.isArray(waterEntries) || waterEntries.length === 0) {
        throw new Error("Invalid input: waterEntries must be a non-empty array");
    }

    // Return the sum of the amount of water consumed in a day
    return waterEntries.reduce((sum, entry) => sum + entry.amount, 0);
}

