export const isServiceId = (value: string) => {
  if (value === 'DOWNLOAD' ||
      value === 'API'
  ) {
    return true
  }

  return false
}
