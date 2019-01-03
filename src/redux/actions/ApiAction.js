import { API_CALL } from './ActionMacros'

export const apiCall = (url,method,header,body,response, error,response,payload ) => ({
    type: API_CALL,
  url,
  method,
  header,
  body,
  [payload]: response,
  error: {
    error
  }
})



