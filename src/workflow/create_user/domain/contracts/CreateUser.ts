import { clientError, unauthorized, HttpResponse } from '../../../../core/infra/HttpResponse'

import Email from './Email'


interface UncreatedUser {
  name: Name
  email: Email
  password: Password
}

interface createdUser {
  name: Name
  email: Email
}

type CreationError<Error = clientError> = HttpResponse


type CreateUser = (user: UncreatedUser) => Ether<createdUser, CreationError>

Type input
    UnvalidatedOrder

    type OrderTakingCommand =
    | Place of PlaceOrder
    | Change of ChangeOrder
    | Cancel of CancelOrder


Type output

    type PlaceOrderEvents = {
        AcknowledgmentSent : AcknowledgmentSent
        OrderPlaced : OrderPlaced
        BillableOrderPlaced : BillableOrderPlaced
    }

    type ValidateOrder =
        UnvalidatedOrder -> Result<ValidatedOrder,ValidationError list>