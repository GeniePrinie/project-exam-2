export const convertToIso = (date) => {
  if (!date) return null;
  return date.toISOString().split("T")[0];
};
