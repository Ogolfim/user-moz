export const isAccountType = (value: string) => {
  if (value === 'UNIPERSONAL' ||
      value === 'COMPANY' ||
      value === 'STUDENT'
  ) {
    return true
  }

  return false
}
