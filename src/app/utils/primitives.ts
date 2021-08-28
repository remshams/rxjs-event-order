export const isEqualArray = <Value>(
  base: Array<Value>,
  compare: Array<Value>
): boolean => {
  if (base.length === compare.length) {
    for (let index = 0; index < base.length; index++) {
      if (base[index] !== compare[index]) {
        return false;
      }
    }
    return true;
  } else {
    return false;
  }
};
