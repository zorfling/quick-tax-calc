import React, { Component } from 'react';
import styled from 'styled-components';
import mexp from 'math-expression-evaluator';

const Container = styled.div`
  align-items: center;
  display: flex;
  height: 100vh;
  justify-content: center;
  line-height: 150%;
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

class App extends Component {
  state = {
    income: 90000,
    parsedIncome: 90000
  };

  calculateTax() {
    const { parsedIncome } = this.state;

    if (parsedIncome > 180000) {
      return 54232 + (parsedIncome - 180000) * 0.45;
    }

    if (parsedIncome > 87000 && parsedIncome < 180001) {
      return 19822 + (parsedIncome - 87000) * 0.37;
    }

    if (parsedIncome > 37000 && parsedIncome < 87001) {
      return 3572 + (parsedIncome - 37000) * 0.325;
    }

    if (parsedIncome > 18200 && parsedIncome < 37001) {
      return (parsedIncome - 18200) * 0.19;
    }

    return 0;
  }

  handleIncomeChange = evt => {
    const newIncome = evt.target.value;
    let parsedIncome;
    try {
      parsedIncome = mexp.eval(newIncome);
    } catch (e) {
      this.setState({
        income: newIncome
      });
      return;
    }

    this.setState({
      income: newIncome,
      parsedIncome
    });
  };

  formatCurrency(amount) {
    return Number(amount).toLocaleString(
      'en-AU',
      {
        currency: 'AUD',
        style: 'currency'
      }
    );
  }

  render() {
    const { income, parsedIncome } = this.state;
    return (
      <Container>
        <div>
          <Row style={{ marginBottom: '2rem' }}>
            <Label>Income:</Label>{' '}
            <Value>
              <input
                type="text"
                value={income}
                onChange={this.handleIncomeChange}
                style={{
                  fontSize: '1.4em',
                  textAlign: 'right',
                  border: 'none'
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
            <Label>Annual Less Tax:</Label>{' '}
            <Value>
              {this.formatCurrency(parsedIncome - this.calculateTax())}
            </Value>
          </Row>
          <Row>
            <Label>Fortnightly:</Label>{' '}
            <Value>{this.formatCurrency(parsedIncome / 26)}</Value>
          </Row>
          <Row>
            <Label>Fortnightly Tax:</Label>{' '}
            <Value>{this.formatCurrency(this.calculateTax() / 26)}</Value>
          </Row>
          <Row style={{ marginTop: '2rem' }}>
            <Label>Fortnightly Less Tax:</Label>{' '}
            <Value style={{ fontSize: '1.5em' }}>
              {this.formatCurrency((parsedIncome - this.calculateTax()) / 26)}
            </Value>
          </Row>
        </div>
      </Container>
    );
  }
}

export default App;
