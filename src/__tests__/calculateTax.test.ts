import calculateTax from '../calculateTax';
test.each([
  [18000, 0],
  [20000, 312],
  [90000, 22620],
  [120000, 34320],
  [185000, 60060]
])('calculates basic rates (%i)', (income, expected) => {
  const result = calculateTax(income);
  expect(result).toBe(expected);
});

test.each([[955.98, 58], [4615.38, 1320], [692.31, 0]])(
  'should calculate same as witholding excel (%i)',
  (fortnightlyIncome, expected) => {
    const annualResult = calculateTax(fortnightlyIncome * 26);
    expect(annualResult / 26).toBe(expected);
  }
);
