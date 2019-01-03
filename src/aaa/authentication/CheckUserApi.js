import { ApiCall } from '../../prolar/ApiCall'

export const CheckUserApi = async mobileNumber => {
  params = {
    apiName: 'checkUser',
    bodyParams: 'null',
    token: 'null',
    urlParam: mobileNumber
  }
  res = await ApiCall(params)

  return res
}
