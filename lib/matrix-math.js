/**
 * Reduces a number to the range 1-22 using either digit summation or subtraction.
 * 
 * @param {number} num - The number to reduce.
 * @param {string} [method='digit-sum'] - The reduction method ('digit-sum' or 'subtraction').
 * @returns {number} The reduced number in the range 1-22.
 */
export function reduceTo22(num, method = 'digit-sum') {
  if (typeof num !== 'number' || isNaN(num)) {
    throw new Error('Input must be a valid number');
  }

  if (num <= 0) {
    throw new Error('Number must be greater than 0 for Destiny Matrix reduction');
  }

  if (num <= 22) {
    return num;
  }

  if (method === 'digit-sum') {
    let current = num;
    while (current > 22) {
      let sum = 0;
      const str = current.toString();
      for (let i = 0; i < str.length; i++) {
        sum += parseInt(str[i], 10);
      }
      current = sum;
    }
    return current;
  } else if (method === 'subtraction') {
    let current = num;
    while (current > 22) {
      current -= 22;
    }
    return current;
  } else {
    throw new Error(`Unknown reduction method: ${method}`);
  }
}

/**
 * Parses a birth date input into numerical day, month, and year.
 * Supporting YYYY-MM-DD, DD.MM.YYYY, and other standard formats.
 * 
 * @param {string|Date} dobInput - The date of birth input.
 * @returns {{day: number, month: number, year: number}} The parsed date parts.
 */
export function parseDate(dobInput) {
  if (dobInput instanceof Date) {
    return {
      day: dobInput.getDate(),
      month: dobInput.getMonth() + 1,
      year: dobInput.getFullYear(),
    };
  }

  if (typeof dobInput !== 'string') {
    throw new Error('Invalid date input: must be a string or Date object');
  }

  const trimmed = dobInput.trim();

  // Try parsing YYYY-MM-DD, YYYY/MM/DD, YYYY.MM.DD
  let match = trimmed.match(/^(\d{4})[-/.](\d{1,2})[-/.](\d{1,2})$/);
  if (match) {
    return {
      year: parseInt(match[1], 10),
      month: parseInt(match[2], 10),
      day: parseInt(match[3], 10),
    };
  }

  // Try parsing DD.MM.YYYY, DD/MM/YYYY, DD-MM-YYYY
  match = trimmed.match(/^(\d{1,2})[-/.](\d{1,2})[-/.](\d{4})$/);
  if (match) {
    return {
      day: parseInt(match[1], 10),
      month: parseInt(match[2], 10),
      year: parseInt(match[3], 10),
    };
  }

  // Fallback to JS standard Date parsing (using UTC to prevent timezone offsets)
  const date = new Date(trimmed);
  if (isNaN(date.getTime())) {
    throw new Error(`Unable to parse date: ${dobInput}`);
  }
  return {
    day: date.getUTCDate(),
    month: date.getUTCMonth() + 1,
    year: date.getUTCFullYear(),
  };
}

/**
 * Calculates the 5 primary nodes of the Destiny Matrix.
 * 
 * @param {string|Date} dob - The date of birth.
 * @param {string} [method='digit-sum'] - The reduction method ('digit-sum' or 'subtraction').
 * @returns {{left: number, top: number, right: number, bottom: number, center: number}}
 */
export function calculateMatrixNodes(dob, method = 'digit-sum') {
  const { day, month, year } = parseDate(dob);

  // Validate values
  if (day < 1 || day > 31 || month < 1 || month > 12 || year < 1) {
    throw new Error(`Invalid date parts parsed: Day=${day}, Month=${month}, Year=${year}`);
  }

  // 1. Left Node (Soul / Day of birth)
  const left = reduceTo22(day, method);

  // 2. Top Node (Spiritual / Month of birth)
  const top = reduceTo22(month, method); // Month is 1-12, so always <= 22

  // 3. Right Node (Material / Year of birth)
  // The year of birth is reduced by summing all its digits first
  const yearDigitsSum = year
    .toString()
    .split('')
    .reduce((acc, char) => acc + parseInt(char, 10), 0);
  const right = reduceTo22(yearDigitsSum, method);

  // 4. Bottom Node (Karmic Tail anchor)
  // Left + Top + Right
  const bottom = reduceTo22(left + top + right, method);

  // 5. Center Node (Comfort Zone / Core Essence)
  // Left + Top + Right + Bottom
  const center = reduceTo22(left + top + right + bottom, method);

  return {
    left,
    top,
    right,
    bottom,
    center,
  };
}
