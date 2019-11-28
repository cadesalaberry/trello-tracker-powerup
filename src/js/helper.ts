export const getColor = (a, b) => {
  if (a <= b)
    return 'green';

  if (b < a)
    return 'red';
}

export const parseFloatSafe = (str) => {
  var float;

  try {
    float = parseFloat(str);
  } catch (e) {
    float = null;
  }

  return float;
}
