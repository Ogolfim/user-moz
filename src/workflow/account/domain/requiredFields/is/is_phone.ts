// Check a password between 7 to 15
// characters which contain at least
// one numeric digit and a special character

export const isPhone = (value: string) => {
  const regex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/

  if (!value.match(regex)) {
    return false
  }

  return true
}
