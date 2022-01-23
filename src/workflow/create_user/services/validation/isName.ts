export default {
  validator(name: string) {
    if (!name || name.trim().length < 2 || name.trim().length > 255) {
      return false
    }

    return true
  },

  create(name: string) {
    
    if(!this.validator(name)) {
      const error = new Error(`The name ${name} is invalid.`);
      error.name = 'InvalidNameError';

      return error;
    }


    return name;
  }
}