export const formatResistance = (res: number): string => {
    if (res >= 1_000_000) return `${(res / 1_000_000).toFixed(2)} MΩ`;
    if (res >= 1_000) return `${(res / 1_000).toFixed(2)} kΩ`;
    return `${res} Ω`;
};

export const calculateResistance = (
    bandColors: string[],
    bandCount: number,
    colorDigitMap: Record<string, number>,
    multiplierMap: Record<string, number>,
    toleranceMap: Record<string, string>,
    tempCoefficientMap: Record<string, string>
): string => {
    const colors = bandColors;
    if (colors.includes('none')) return "Incomplete";

    let digits = "";
    let multiplier = 1;
    let tolerance = "";
    let tempCoeff = "";

    if (bandCount === 3 || bandCount === 4) {
        digits += colorDigitMap[colors[0]]?.toString() ?? "";
        digits += colorDigitMap[colors[1]]?.toString() ?? "";
        multiplier = multiplierMap[colors[2]] ?? 1;
        if (bandCount === 4) {
            tolerance = toleranceMap[colors[3]] ?? "";
        }
    } else if (bandCount === 5 || bandCount === 6) {
        digits += colorDigitMap[colors[0]]?.toString() ?? "";
        digits += colorDigitMap[colors[1]]?.toString() ?? "";
        digits += colorDigitMap[colors[2]]?.toString() ?? "";
        multiplier = multiplierMap[colors[3]] ?? 1;
        tolerance = toleranceMap[colors[4]] ?? "";
        if (bandCount === 6) {
            tempCoeff = tempCoefficientMap[colors[5]] ?? "";
        }
    } else {
        return "Invalid Band Count";
    }

    const resistance = parseInt(digits) * multiplier;
    const formatted = formatResistance(resistance);
    return `${formatted} ${tolerance}${tempCoeff ? `, ${tempCoeff}` : ""}`;
};
