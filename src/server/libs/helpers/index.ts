import bcrypt from "bcrypt";
/**
 * This function use to hash plain text
 * @param plainText
 * @param saltRounds default is 10
 * @returns string
 */
export const hashPassword = async (
  plainText: string,
  saltRounds: number = 10
) => {
  const salt = await bcrypt.genSaltSync(saltRounds);
  const hash = await bcrypt.hashSync(plainText, salt);
  return hash;
};
/**
 * This function use to check hash password, if the plainText after hash is the same with hash in database
 * @param plainText
 * @param hash
 * @returns boolean
 */
export const checkHashPassword = async (plainText: string, hash: string) => {
  const isEqual = await bcrypt.compareSync(plainText, hash);
  return isEqual;
};
