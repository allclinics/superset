export const formatPhoneNumber = (phoneNumber: number): string => {
  const str = phoneNumber.toString().padStart(10, '0');
  const match = str.match(/^(\d{3})(\d{3})(\d{2})(\d{2})$/);
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}-${match[4]}`;
  }
  return str;
};
