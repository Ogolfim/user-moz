
export const isServerName = (value: string) => {
  if (!value || value.trim().length < 2 || value.trim().length > 50) {
    return false
  }

  if(
    value.match(/google/) ||
    value.match(/linkedin/)
  ) {
    return true
  }

  return false;
}