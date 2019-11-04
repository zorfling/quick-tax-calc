interface TaxBracket {
  min: number;
  offset: number;
  rate: number;
}

interface TaxTable {
  top: TaxBracket;
  upperMiddle: TaxBracket;
  lowerMiddle: TaxBracket;
  bottom: TaxBracket;
}

export const taxTables: { [key: number]: TaxTable } = {
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
  },
  2020: {
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

export default (parsedIncome: number, taxYearEnding: number) => {
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
};
