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

export const validDate = (value: string | Date) => {
  const local = new Date(value);
  const yyyy = local.getFullYear();
  const mm = String(local.getMonth() + 1).padStart(2, '0');
  const dd = String(local.getDate()).padStart(2, '0');
  const formatted = `${yyyy}-${mm}-${dd}`;

  return new Date(formatted);
};

// -------------------------------------

export const fileSizes = () => {
  const max1mb = 1024 * 1024;
  const max2mb = 2 * max1mb;
  const max5mb = 5 * max1mb;
  const max10mb = 10 * max1mb;

  return { max1mb, max2mb, max5mb, max10mb };
};

// -------------------------------------

export const fileTypes = () => {
  const imageTypes = ['image/jpeg', 'image/png', 'image/gif'];
  const documentTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  ];

  return { imageTypes, documentTypes };
};
