export const castArray = (value: any) => {
  if (Array.isArray(value)) {
    return value;
  }
  return [value];
};