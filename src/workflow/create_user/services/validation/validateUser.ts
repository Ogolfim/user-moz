import { clientError, HttpResponse } from '../../../../core/infra/HttpResponse'
import { unValidatedUser, ValidatedUser } from '../../domain/contracts/requiredField'
import { Either } from '../../domain/contracts/Result'
import isEmail from './isEmail'
import isName from './isName'
import isPassword from './isPassword'



const validateUser = ({name, email, password}: unValidatedUser): Either<ValidatedUser, HttpResponse> => {

  const nameResult = isName.create(name)
  if(nameResult instanceof Error) {
    return {
      _tag: 'Left',
      left: clientError(nameResult)
    }
  }

  const emailResult = isEmail.create(email)
  if(emailResult instanceof Error) {
    return {
      _tag: 'Left',
      left: clientError(emailResult)
    }
  }

  const passwordResult = isPassword.create(password)
  if(passwordResult instanceof Error) {
    return {
      _tag: 'Left',
      left: clientError(passwordResult)
    }
  }


  return {
    _tag: 'Right',
    right: {
      validName: nameResult, 
      ValidEmail: emailResult, 
      validPassword: passwordResult
    }
  }
}

export default validateUser