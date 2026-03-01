import calculateTax from '../calculateTax';
test.each([
  [18000, 0],
  [20000, 208],
  [90000, 19604],
  [120000, 29224],
  [185000, 53508]
])('calculates basic rates for 2025/2026 (%i)', (income, expected) => {
  const result = calculateTax(income, 2026);
  expect(result).toBe(expected);
});

test.each([
  [955.98, 38],
  [4615.38, 1124],
  [692.31, 0]
])(
  'should calculate same as witholding excel for 2025/2026 (%i)',
  (fortnightlyIncome, expected) => {
    const annualResult = calculateTax(fortnightlyIncome * 26, 2026);
    expect(annualResult / 26).toBe(expected);
  }
);
