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

/**
 * This function return random in range a and b
 * @param a number
 * @param b number
 * @returns number
 */
export const randomInRange = (a: number, b: number) => {
  if (a > b) {
    [a, b] = [b, a]; // Đảo giá trị nếu a lớn hơn b
  }

  return Math.floor(Math.random() * (b - a + 1)) + a;
};
