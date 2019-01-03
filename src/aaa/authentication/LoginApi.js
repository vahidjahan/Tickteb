import { ApiCall } from '../../prolar/ApiCall'
import { SourceData } from '../../prolar/ApiLinks'

export const LoginApi = async (mobileNumber, code) => {
  const bodyParams = {
    client_id: SourceData.android.ClientId,
    client_secret: SourceData.android.Password,
    grant_type: 'password',
    password: `code:${code}`,
    username: mobileNumber
  }

  params = {
    apiName: 'login',
    bodyParams,
    token: 'null',
    urlParam: 'null'
  }
  res = await ApiCall(params)

  return res
}
