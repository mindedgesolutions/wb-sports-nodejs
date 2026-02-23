export const validNumber = (
  value: string | number | undefined | null,
  length: number,
) => {
  if (value === null || value === undefined || value === '') return true;
  const str = String(value);
  const pattern = /^[0-9]+$/;
  return str.length === length && pattern.test(str);
};
