export const isNullable = <T>(value: T) => {
  return !value || value == undefined;
};
export const isNullableString = <T>(value: T) => {
  return !value || value == "";
};

export const getError = (error: string | Error | any): string => {
  if (error instanceof Error) {
    return error.message;
  }
  return error.toString();
};
