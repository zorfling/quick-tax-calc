# Quick Tax Calc

This is a quick calculator for the [ATO Australian tax witholding formula](https://www.ato.gov.au/Rates/Schedule-1---Statement-of-formulas-for-calculating-amounts-to-be-withheld/).

It's based on Scale 2 - claiming the tax free threshold, no Medicare levy exemption.

## Usage

Type your annual pre-tax amount in the income section and see your after tax annual and fortnightly amounts.

You can use the "Save and compare" button to remember a given fortnightly amount for comparison.

The income section also allows for formulae so you can do things like:

- How might a 10% raise affect my income? - _90000 \* 1.1_
- What if I get an extra job paying 500 a week? - _90000 + 500 \* 52_
- If I go part time, how much will I get paid? - _90000 \* 3/5_
- What contractor daily rate is comparable (4 weeks holiday, 2 weeks sick, 10 public holidays, 9.5% super) with my full time salary? - _(448 \* 5 \* (52 - 4 - 2 - 2)) / 1.095_

## Run instructions

`yarn start`

## Demo

Try it out at https://quick-tax-calc.netlify.app/

## Roadmap

I might add the ability to work backwards - I want to earn 3000 a fortnight, how much do I need to earn?
