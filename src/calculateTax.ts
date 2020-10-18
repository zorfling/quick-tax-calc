interface TaxFormulaCoefficient {
  weeklyEarningsMax: number;
  a: number;
  b: number;
}

interface TaxFormulaCoefficientsYear {
  [year: number]: TaxFormulaCoefficient[];
}

const coefficients: TaxFormulaCoefficientsYear = {
  2020: [
    { weeklyEarningsMax: 355, a: 0, b: 0 },
    { weeklyEarningsMax: 422, a: 0.19, b: 67.4635 },
    { weeklyEarningsMax: 528, a: 0.29, b: 109.7327 },
    { weeklyEarningsMax: 711, a: 0.21, b: 67.4635 },
    { weeklyEarningsMax: 1282, a: 0.3477, b: 165.4423 },
    { weeklyEarningsMax: 1730, a: 0.345, b: 161.9808 },
    { weeklyEarningsMax: 3461, a: 0.39, b: 239.8654 },
    { weeklyEarningsMax: 9999999, a: 0.47, b: 516.7885 }
  ],
  2021: [
    { weeklyEarningsMax: 359, a: 0, b: 0 },
    { weeklyEarningsMax: 438, a: 0.19, b: 68.3462 },
    { weeklyEarningsMax: 548, a: 0.29, b: 112.1942 },
    { weeklyEarningsMax: 721, a: 0.21, b: 68.3465 },
    { weeklyEarningsMax: 865, a: 0.219, b: 74.8369 },
    { weeklyEarningsMax: 1282, a: 0.3477, b: 186.2119 },
    { weeklyEarningsMax: 2307, a: 0.345, b: 182.7504 },
    { weeklyEarningsMax: 3461, a: 0.39, b: 286.5965 },
    { weeklyEarningsMax: 9999999, a: 0.47, b: 563.5196 }
  ]
};

export default (parsedIncome: number, taxYearEnding: number) => {
  const weeklyIncome = Math.trunc(parsedIncome / 52) + 0.99;
  const { a, b } = coefficients[taxYearEnding].find(
    (elem) => elem.weeklyEarningsMax > weeklyIncome
  ) || { a: 0, b: 0 };

  const weeklyResult = Math.round(a * weeklyIncome - b);

  return weeklyResult * 52;
};

const validYears = Object.keys(coefficients);
export { validYears };
