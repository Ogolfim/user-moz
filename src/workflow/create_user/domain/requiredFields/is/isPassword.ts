// Check a password between 7 to 15 
// characters which contain at least
// one numeric digit and a special character

export const isPassword = (value: string) => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&_?]).{8,10}$/g

  if(!value.match(regex)) {
    return false
  }
    
  return true
}