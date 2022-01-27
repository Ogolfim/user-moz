export const isValidPassword = async (password: Password, hash: string) => {
  const result = await bcrypt.compare(password, hash);
  return result;
}