// Tag id must have at least 4 character and less than 50

export const isTagTitle = (value: string) => {
  if (!value || value.trim().length < 4 || value.trim().length > 50) {
    return false
  }

  return true
}
