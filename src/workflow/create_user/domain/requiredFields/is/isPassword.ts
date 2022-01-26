// Check a password between 8 to 15 
// characters which contain at least
// one numeric digit and a special character

export const isPassword = (value: string) => {
  const regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-_]).{7,15}$/

  if(!value.match(regex)) {
    return false
  }
    
  return true
}