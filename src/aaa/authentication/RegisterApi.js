import { ApiCall } from '../../prolar/ApiCall'
import { SourceData } from '../../prolar/ApiLinks'
import { AuthStore } from '../../redux/providers/AuthStore'
import { LoginApi } from './LoginApi'
import { AddUserInfo } from '../../redux/actions/AuthActions'

export const RegisterApi = async (profile, mobileNumber, code) => {
  profile = { ...profile, emailOrMobile: mobileNumber, code }

  let bodyParams = profile

  params = {
    apiName: 'register',
    bodyParams,
    token: 'null',
    urlParam: 'null'
  }
  res = await ApiCall(params)
  let res2 = res
  if (res.message == 200) {
    res2 = await LoginApi(mobileNumber, code)
    let token = `${res2.data.token_type} ${res2.data.access_token}`
    AuthStore.dispatch(AddUserInfo(token, res2.data.expires))
  }

  return res2
}
