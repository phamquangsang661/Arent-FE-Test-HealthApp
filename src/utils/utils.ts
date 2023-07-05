/**
 * This function is check value if nullable and return true/false
 * @param value
 * @returns boolean
 */
export const isNullable = <T>(value: T) => {
  return !value || value == undefined;
};

/**
 * This function is check value if nullable of string and return true/false
 * @param value
 * @returns boolean
 */
export const isNullableString = <T>(value: T) => {
  return !value || value == "";
};

/**
 * This function return the error string from error instance or message
 * @param error instance
 * @returns string
 */
export const getError = (error: string | Error | any): string => {
  if (error instanceof Error) {
    return error.message;
  }
  return error.toString();
};

/**
 * This function use for waiting ms time. This is promise function
 * @param ms milliseconds
 * @param callback callback function, can be a promise 
 */
export const callbackWaiting = async (
  ms: number = 1000,
  callback: () => void | Promise<void> = () => {}
) => {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, ms);
  });
  await callback();
};
