import bcrypt from 'bcrypt';

/**
 * @description get bcrypt hash of password
 */
export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, 10);
};
