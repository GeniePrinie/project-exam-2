export const convertToIsoDate = (date) => {
  if (!date) return null;
  return date.toISOString().split("T")[0];
};
