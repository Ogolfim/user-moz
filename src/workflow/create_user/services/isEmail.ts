
const isEmail = (email: string): boolean => {
  if(email.trim().toLowerCase() !== email) {
    return false;
  }

  if (!email || email.trim().length > 255) {
    return false
  }
  
  const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  
  if (!regex.test(email)) {
    return false
  }
  
  return true
}

export default isEmail;