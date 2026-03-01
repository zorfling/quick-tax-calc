import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import App from '../App';

describe('App', () => {
  test('renders without crashing', () => {
    const container = render(<App taxYearEnding={2026} />);
    expect(container).toMatchSnapshot();
  });

  test.each([
    ['18000', '$692.31'],
    ['20000', '$761.23'],
    ['90000', '$2,707.54'],
    ['120000', '$3,491.38'],
    ['185000', '$5,057.38']
  ])('calculates basic rates (%i)', (income, expected) => {
    const { getByTestId } = render(<App taxYearEnding={2026} />);
    const incomeField = getByTestId('income');
    const fortnightlyField = getByTestId('fortnightly-less-tax');

    fireEvent.change(incomeField, { target: { value: income } });
    expect(fortnightlyField).toHaveTextContent(expected);
  });

  test('should work with templates', () => {
    const { getByTestId } = render(<App taxYearEnding={2026} />);
    const contractorTemplateButton = getByTestId('template-contractor');
    const partTimeTemplateButton = getByTestId('template-part-time');
    const incomeField = getByTestId('income');
    const fortnightlyField = getByTestId('fortnightly-less-tax');

    expect(incomeField).toHaveValue('90000');
    expect(fortnightlyField).toHaveTextContent('$2,707.54');

    fireEvent.click(contractorTemplateButton);
    expect(incomeField).toHaveValue('(448 * 5 * (52 - 4 - 2 - 2)) / 1.095');
    expect(fortnightlyField).toHaveTextContent('$2,707.89');

    fireEvent.click(partTimeTemplateButton);
    expect(incomeField).toHaveValue('90000 * 3 / 5');
    expect(fortnightlyField).toHaveTextContent('$1,766.92');
  });
});
