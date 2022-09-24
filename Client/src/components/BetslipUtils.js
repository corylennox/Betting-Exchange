/**
 * In order to prevent floating point errors, we want to store integers rather than floats.
 * So, any price like $53.48 is stored as an integer 5348.
 */
function wagerScale() {
  return 2;
}

export function isValidWagerOrWin(newVal) {
  let foundDecimal = false

  // Make sure each item is either a digit or a "."
  for (let i = 0; i < newVal.length; i++) {
    const c = newVal[i]
    if ((c < '0' || c > '9') && c != '.')
    {
      return false;
    }

    if (c == '.')
    {
      // If there's more than one '.', it's not valid
      if (foundDecimal)
      {
        return false
      }

      // It's not valid if there are more than 2 numbers after the decimal
      if (newVal.length - i > wagerScale() + 1)
      {
        return false;
      }

      foundDecimal = true
    }
  }
  
  return true;
}
  
// Assumes that the wagerOrWin is a string is already verified to be wagerScale() digits maximum
export function convertToIntegerScale(wagerOrWin) {
  console.assert(isValidWagerOrWin(wagerOrWin), "wagerOrWin '" + wagerOrWin + "' was not validated prior to calling convertToIntegerScale()");

  let retVal = 0;
  let decimalInd = -1;
  for(let i = 0; i < wagerOrWin.length; i++)
  {
    const c = wagerOrWin[i];
    if (c == '.')
    {
    decimalInd = i;
    continue;
    }

    retVal *= 10;
    retVal += c - '0';
  }

  // if the wagerOrWin is "43" or "43.4", we need to multiply the integer by 100 or 10, respectively to include final decimal
  if (decimalInd != -1)
    retVal *= Math.pow(10, wagerScale() - (wagerOrWin.length - 1 - decimalInd));
  else
    retVal *= Math.pow(10, wagerScale());
  return retVal;
}
  
export function convertToPriceString(wagerOrWin) {
  let result = wagerOrWin.toString();

  // Add decimal to the pennies
  if (result.length > wagerScale()) {
    return result.substring(0, result.length - wagerScale())
    + '.'
    + result.substring(result.length - wagerScale())
  }

  // Add on '0's to fill out any pennies that are not specified
  while (result.length < wagerScale())
    result = '0' + result;
  result = "0." + result;
  return result;
}
