export const validNumber = (
  value: string | number | undefined | null,
  length: number,
) => {
  if (value === null || value === undefined || value === '') return true;
  const str = String(value);
  const pattern = /^[0-9]+$/;
  return str.length === length && pattern.test(str);
};

// -------------------------------------

export const validEmail = (value: string) => {
  if (value === null || value === undefined || value === '') return true;
  const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return pattern.test(value);
};

// -------------------------------------

export const validDate = (value: string) => {
  const local = new Date(value);
  const yyyy = local.getFullYear();
  const mm = String(local.getMonth() + 1).padStart(2, '0');
  const dd = String(local.getDate()).padStart(2, '0');
  const formatted = `${yyyy}-${mm}-${dd}`;

  return new Date(formatted);
};
