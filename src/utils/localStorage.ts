export const localStorageContainsField = (fieldName: string): boolean => {
  const fieldValue = localStorage.getItem(fieldName);
  return fieldValue === null ? false : true;
};
