// Tag id must have at least 4 character and less than 50
// Must be all lowercas
// Must not have spaces

export const isTagId = (value: string) => {
  if (!value ||value.trim().length < 4 || value.trim().length > 50) {
    return false
  }

  const regex = /[A-Z ]/

  if (regex.test(value)) {
    return false
  }

  return true
}