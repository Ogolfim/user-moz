// Check a password between 7 to 15 
// characters which contain at least
// one numeric digit and a special character

export default {
  validator(password: string) {
    const passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

    if(!password || password.match(passw)) {
      return false
    }
    
    return true
  },

  create(password: string) {
    if(!this.validator(password)) {
      const error = new Error(`The password ${password} is invalid.`);
      error.name = 'InvalidPasswordError';

      return error;
    }

    return password;
  }
}