import calculateTax from '../calculateTax';
test.each([
  [18000, 0],
  [20000, 312],
  [90000, 22620],
  [120000, 34320],
  [185000, 60060]
])('calculates basic rates for 2019/2020 (%i)', (income, expected) => {
  const result = calculateTax(income, 2020);
  expect(result).toBe(expected);
});

test.each([
  [955.98, 58],
  [4615.38, 1320],
  [692.31, 0]
])(
  'should calculate same as witholding excel for 2019/2020 (%i)',
  (fortnightlyIncome, expected) => {
    const annualResult = calculateTax(fortnightlyIncome * 26, 2020);
    expect(annualResult / 26).toBe(expected);
  }
);
