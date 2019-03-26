import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import mexp from 'math-expression-evaluator';

const Container = styled.div`
  align-items: center;
  display: flex;
  min-height: 100vh;
  justify-content: center;
  line-height: 150%;
`;

const Card = styled.div`
  box-shadow: 0px 2px 6px 2px hsl(0, 0%, 0%, 0.2);
  padding: 1rem 3rem;
`;

const Row = styled.div`
  display: flex;
`;

const Label = styled.div`
  font-weight: bold;
`;

const Value = styled.div`
  margin-left: auto;
`;

const taxTables = {
  2018: {
    top: {
      min: 180000,
      offset: 54232,
      rate: 0.45
    },
    upperMiddle: {
      min: 87000,
      offset: 19822,
      rate: 0.37
    },
    lowerMiddle: {
      min: 37000,
      offset: 3572,
      rate: 0.325
    },
    bottom: {
      min: 18200,
      offset: 0,
      rate: 0.19
    }
  },
  2019: {
    top: {
      min: 180000,
      offset: 54097,
      rate: 0.45
    },
    upperMiddle: {
      min: 90000,
      offset: 20797,
      rate: 0.37
    },
    lowerMiddle: {
      min: 37000,
      offset: 3572,
      rate: 0.325
    },
    bottom: {
      min: 18200,
      offset: 0,
      rate: 0.19
    }
  }
};

class App extends Component {
  state = {
    income: 90000,
    parsedIncome: 90000,
    rememberedFortnightlyAfterTax: null,
    taxYearEnding: 2019
  };

  calculateTax() {
    const { parsedIncome, taxYearEnding } = this.state;
    const taxTable = taxTables[taxYearEnding];

    if (parsedIncome > taxTable.top.min) {
      return (
        taxTable.top.offset +
        (parsedIncome - taxTable.top.min) * taxTable.top.rate
      );
    }

    if (
      parsedIncome > taxTable.upperMiddle.min &&
      parsedIncome < taxTable.top.min + 1
    ) {
      return (
        taxTable.upperMiddle.offset +
        (parsedIncome - taxTable.upperMiddle.min) * taxTable.upperMiddle.rate
      );
    }

    if (
      parsedIncome > taxTable.lowerMiddle.min &&
      parsedIncome < taxTable.upperMiddle.min + 1
    ) {
      return (
        taxTable.lowerMiddle.offset +
        (parsedIncome - taxTable.lowerMiddle.min) * taxTable.lowerMiddle.rate
      );
    }

    if (
      parsedIncome > taxTable.bottom.min &&
      parsedIncome < taxTable.lowerMiddle.min + 1
    ) {
      return (parsedIncome - taxTable.bottom.min) * taxTable.bottom.rate;
    }

    return 0;
  }

  handleIncomeChange = evt => {
    this.parseAndSetIncome(evt.target.value);
  };

  handleYearChange = evt => {
    this.setState({
      taxYearEnding: Number.parseInt(evt.target.value, 10)
    });
  };

  parseAndSetIncome = newIncome => {
    let parsedIncome;
    const cleanIncome = newIncome.replace(/[$,]*/g, '');
    try {
      parsedIncome = mexp.eval(cleanIncome);
    } catch (e) {
      this.setState({
        income: cleanIncome
      });
      return;
    }

    this.setState({
      income: cleanIncome,
      parsedIncome
    });
  };

  handleRemember = () => {
    this.setState(prevState => ({
      rememberedFortnightlyAfterTax:
        (prevState.parsedIncome - this.calculateTax()) / 26
    }));
  };

  handleIncomeTemplate = template => () => {
    if (!this.state.rememberedFortnightlyAfterTax) {
      this.handleRemember();
    }
    this.parseAndSetIncome(template);
  };

  formatCurrency(amount) {
    return Number(amount).toLocaleString('en-AU', {
      currency: 'AUD',
      style: 'currency'
    });
  }

  render() {
    const {
      income,
      parsedIncome,
      rememberedFortnightlyAfterTax,
      taxYearEnding
    } = this.state;
    const annualAfterTax = parsedIncome - this.calculateTax();
    return (
      <Container>
        <Card>
          <h1>Quick Tax Calc</h1>
          <p>
            This is a quick calculator for the{' '}
            <a href="https://www.ato.gov.au/Rates/Individual-income-tax-rates/">
              ATO Australian Individual Tax Rates
            </a>
          </p>
          <p>
            Type your annual pre-tax amount in the income section and see your
            after tax annual and fortnightly amounts.
          </p>
          <p>
            You can use the memory button (M) to remember a given fortnightly
            amount for comparison.
          </p>
          <p>
            The income section also allows for formulae so you can do things
            like:
          </p>
          <ul>
            <li>
              How might a 10% raise affect my income?{' '}
              <button onClick={this.handleIncomeTemplate(`90000 * 1.1`)}>
                Try it
              </button>
            </li>
            <li>
              What if I get an extra job paying 500 a week?{' '}
              <button onClick={this.handleIncomeTemplate(`90000 + 500 * 52`)}>
                Try it
              </button>
            </li>
            <li>
              If I go 3 days a week, how much will I get paid?{' '}
              <button onClick={this.handleIncomeTemplate(`90000 * 3 / 5`)}>
                Try it
              </button>
            </li>
            <li>
              What contractor daily rate is{' '}
              <span
                style={{ textDecoration: 'underline' }}
                title="4 weeks holiday, 2 weeks sick, 10 public holidays, 9.5% super"
              >
                comparable
              </span>{' '}
              with my full time salary?{' '}
              <button
                onClick={this.handleIncomeTemplate(
                  `(448 * 5 * (52 - 4 - 2 - 2)) / 1.095`
                )}
              >
                Try it
              </button>
            </li>
          </ul>
          <div
            style={{
              backgroundColor: '#eee',
              margin: '0 -3rem',
              padding: '1rem 3rem 2rem'
            }}
          >
            <Row>
              <Label>Tax Year:</Label>
              <Value>
                {Object.keys(taxTables).map(yearEnding => (
                  <label key={yearEnding}>
                    <input
                      type="radio"
                      value={yearEnding}
                      checked={
                        Number.parseInt(taxYearEnding, 10) ===
                        Number.parseInt(yearEnding, 10)
                      }
                      onChange={this.handleYearChange}
                    />
                    {`${yearEnding - 1} / ${yearEnding}`}{' '}
                  </label>
                ))}
              </Value>
            </Row>
            <Row style={{ margin: '1rem 0 2rem' }}>
              <Label>Income:</Label>{' '}
              <Value>
                <input
                  type="text"
                  value={income}
                  onChange={this.handleIncomeChange}
                  style={{
                    fontSize: '1.4em',
                    textAlign: 'right',
                    border: '1px solid #ccc'
                  }}
                />
                <small style={{ display: 'block', textAlign: 'right' }}>
                  Accepts formulas - eg 90000 * 1.1
                </small>
              </Value>
            </Row>
            <Row>
              <Label>Income:</Label>
              <Value>{this.formatCurrency(parsedIncome)}</Value>
            </Row>
            <Row>
              <Label>Tax:</Label>
              <Value>{this.formatCurrency(this.calculateTax())}</Value>
            </Row>
            <Row style={{ marginBottom: '2rem' }}>
              <Label>Annual Less Tax:</Label>
              <Value>{this.formatCurrency(annualAfterTax)}</Value>
            </Row>
            <Row>
              <Label>Fortnightly:</Label>
              <Value>{this.formatCurrency(parsedIncome / 26)}</Value>
            </Row>
            <Row>
              <Label>Fortnightly Tax:</Label>
              <Value>{this.formatCurrency(this.calculateTax() / 26)}</Value>
            </Row>
            <Row style={{ marginTop: '2rem' }}>
              <Label>Fortnightly Less Tax:</Label>
              <Value style={{ fontSize: '1.5em', marginRight: '-2.1rem' }}>
                {this.formatCurrency(annualAfterTax / 26)}
                <button
                  onClick={this.handleRemember}
                  style={{
                    height: '1.5rem',
                    verticalAlign: 'bottom',
                    marginLeft: '0.5rem'
                  }}
                >
                  M
                </button>
              </Value>
            </Row>
            {rememberedFortnightlyAfterTax ? (
              <Fragment>
                <Row>
                  <Label style={{ lineHeight: '2.5em' }}>Remembered:</Label>
                  <Value style={{ fontSize: '1.5em', lineHeight: '1.5em' }}>
                    {this.formatCurrency(rememberedFortnightlyAfterTax)}
                  </Value>
                </Row>
                <Row>
                  <Label>Fortnightly Difference:</Label>
                  <Value
                    style={{
                      fontSize: '1.5em',
                      color:
                        annualAfterTax / 26 - rememberedFortnightlyAfterTax < 0
                          ? '#f00'
                          : '#009e00'
                    }}
                  >
                    {this.formatCurrency(
                      annualAfterTax / 26 - rememberedFortnightlyAfterTax
                    )}
                  </Value>
                </Row>
              </Fragment>
            ) : null}
          </div>
          <p style={{ marginTop: '2rem', textAlign: 'center' }}>
            <a href="https://github.com/zorfling/quick-tax-calc">
              Check out the code on GitHub
            </a>
          </p>
          <p style={{ marginTop: '2rem', textAlign: 'center' }}>
            <a href="https://chriscolborne.com">Built by @zorfling</a>
          </p>
        </Card>
      </Container>
    );
  }
}

export default App;
