import { ApiCall } from '../../prolar/ApiCall'

export const VerificationApi = async (mobileNumber, code) => {
  const bodyParams = {
    code,
    emailOrMobile: mobileNumber
  }

  params = {
    apiName: 'verifyCode',
    bodyParams,
    token: 'null',
    urlParam: 'null'
  }
  res = await ApiCall(params)

  return res
}
