import { Name } from "../../register_user/domain/requiredFields/Name"

export type AccountHttpResponse = {
  statusCode: number
  body: any
}

export type LogUser = {
  name: Name
}

export function ok<T>(dto?: T): AccountHttpResponse {
  return {
    statusCode: 200,
    body: dto,
  }
}

export function created(dto?: LogUser): AccountHttpResponse {
  return {
    statusCode: 201,
    body: dto,
  }
}

export function clientError(error: Error): AccountHttpResponse {
  return {
    statusCode: 400,
    body: {
      error: error.message,
    },
  }
}

export function unauthorized(error: Error): AccountHttpResponse {
  return {
    statusCode: 401,
    body: {
      error: error.message,
    },
  }
}

export function forbidden(error: Error): AccountHttpResponse {
  return {
    statusCode: 403,
    body: {
      error: error.message,
    },
  }
}

export function notFound(error: Error): AccountHttpResponse {
  return {
    statusCode: 404,
    body: {
      error: error.message,
    },
  }
}

export function conflict(error: Error): AccountHttpResponse {
  return {
    statusCode: 409,
    body: {
      error: error.message,
    },
  }
}

export function tooMany(error: Error): AccountHttpResponse {
  return {
    statusCode: 429,
    body: {
      error: error.message,
    },
  }
}

export function fail(error: Error): AccountHttpResponse {
  console.log(error)

  return {
    statusCode: 500,
    body: {
      error: error.message,
    },
  }
}
