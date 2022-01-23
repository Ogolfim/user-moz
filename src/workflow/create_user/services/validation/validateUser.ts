import { User } from '../../domain/contracts/requiredField'
import { Either } from '../../domain/contracts/Result'
import isEmail from './isEmail'
import isName from './isName'
import isPassword from './isPassword'


const validateUser = ({name, email, password}: User): Either<User, Error> => {

  const nameResult = isName.create(name)
  if(nameResult instanceof Error) {
    return {
      _tag: 'Left',
      left: nameResult
    }
  }

  const emailResult = isEmail.create(email)
  if(emailResult instanceof Error) {
    return {
      _tag: 'Left',
      left: emailResult
    }
  }

  const passwordResult = isPassword.create(password)
  if(passwordResult instanceof Error) {
    return {
      _tag: 'Left',
      left: passwordResult
    }
  }


  return {
    _tag: 'Right',
    right: {
      name: nameResult, 
      email: emailResult, 
      password: passwordResult
    }
  }
}

export default validateUser