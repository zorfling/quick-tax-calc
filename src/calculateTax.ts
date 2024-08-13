interface TaxFormulaCoefficient {
  weeklyEarningsMax: number;
  a: number;
  b: number;
}

interface TaxFormulaCoefficientsYear {
  [year: number]: TaxFormulaCoefficient[];
}

const coefficients: TaxFormulaCoefficientsYear = {
  2024: [
    { weeklyEarningsMax: 359, a: 0, b: 0 },
    { weeklyEarningsMax: 438, a: 0.19, b: 68.3462 },
    { weeklyEarningsMax: 548, a: 0.29, b: 112.1942 },
    { weeklyEarningsMax: 721, a: 0.21, b: 68.3465 },
    { weeklyEarningsMax: 865, a: 0.219, b: 74.8369 },
    { weeklyEarningsMax: 1282, a: 0.3477, b: 186.2119 },
    { weeklyEarningsMax: 2307, a: 0.345, b: 182.7504 },
    { weeklyEarningsMax: 3461, a: 0.39, b: 286.5965 },
    { weeklyEarningsMax: 9999999, a: 0.47, b: 563.5196 },
  ],
  2025: [
    { weeklyEarningsMax: 361, a: 0, b: 0 },
    { weeklyEarningsMax: 500, a: 0.16, b: 57.8462 },
    { weeklyEarningsMax: 625, a: 0.26, b: 107.8462 },
    { weeklyEarningsMax: 721, a: 0.18, b: 57.8462 },
    { weeklyEarningsMax: 865, a: 0.189, b: 64.3365 },
    { weeklyEarningsMax: 1282, a: 0.3227, b: 180.0385 },
    { weeklyEarningsMax: 2596, a: 0.32, b: 176.5769 },
    { weeklyEarningsMax: 3653, a: 0.39, b: 358.3077 },
    { weeklyEarningsMax: 9999999, a: 0.47, b: 650.6154 },
  ],
};

const calculateTax = (parsedIncome: number, taxYearEnding: number) => {
  const weeklyIncome = Math.trunc(parsedIncome / 52) + 0.99;
  const { a, b } = coefficients[taxYearEnding].find(
    (elem) => elem.weeklyEarningsMax > weeklyIncome
  ) || { a: 0, b: 0 };

  const weeklyResult = Math.round(a * weeklyIncome - b);

  return weeklyResult * 52;
};

export default calculateTax;
const validYears = Object.keys(coefficients);
export { validYears };
