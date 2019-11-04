import calculateTax from '../calculateTax';
test.each([
  [18000, 0],
  [90000, 20797],
  [120000, 31897],
  [20000, 342],
  [185000, 56347]
])('calculates basic rates (%i)', (income, expected) => {
  const result = calculateTax(income, 2020);
  expect(result).toBe(expected);
});
