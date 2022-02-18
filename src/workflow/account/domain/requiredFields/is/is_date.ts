// A 4-digit year from 0000 to 9999
// Followed by a hyphen
// Followed by a 2 digit month from 01 to 12 (padded with leading zeros if necessary)
// Followed by a hyphen
// Followed by a 2 digit day from 01 to 31 (padded with leading zeros if necessary)

export const isDate = (value: string) => {
  const regex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/

  if (value.match(regex)) {
    return true
  }

  return false
}
