interface TaxFormulaCoefficient {
  weeklyEarningsMax: number;
  a: number;
  b: number;
}

const coefficients: TaxFormulaCoefficient[] = [
  { weeklyEarningsMax: 355, a: 0, b: 0 },
  { weeklyEarningsMax: 422, a: 0.19, b: 67.4635 },
  { weeklyEarningsMax: 528, a: 0.29, b: 109.7327 },
  { weeklyEarningsMax: 711, a: 0.21, b: 67.4635 },
  { weeklyEarningsMax: 1282, a: 0.3477, b: 165.4423 },
  { weeklyEarningsMax: 1730, a: 0.345, b: 161.9808 },
  { weeklyEarningsMax: 3461, a: 0.39, b: 239.8654 },
  { weeklyEarningsMax: 9999999, a: 0.47, b: 516.7885 }
];

export default (parsedIncome: number) => {
  const weeklyIncome = Math.trunc(parsedIncome / 52) + 0.99;
  const { a, b } = coefficients.find(
    elem => elem.weeklyEarningsMax > weeklyIncome
  ) || { a: 0, b: 0 };

  const weeklyResult = Math.round(a * weeklyIncome - b);

  return weeklyResult * 52;
};
