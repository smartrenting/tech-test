export const isNumber = (value: string) => {
  if (value === "") return true;
  return /[0-9]/g.test(value);
};
