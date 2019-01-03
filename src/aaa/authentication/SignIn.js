import { LoginApi } from './LoginApi'
import { AuthStore } from '../../redux/providers/AuthStore'
import { AddUserInfo } from '../../redux/actions/AuthActions'
import { Prolar } from '../../prolar/Prolar'

export const SignIn = async (mobileNumber, code) => {
  let res = await LoginApi(mobileNumber, code)
  if (res.message == 200) {
    let token = `${res.data.token_type} ${res.data.access_token}`
    AuthStore.dispatch(AddUserInfo(token, res.data.expires))
    Prolar.setToken(token)

    return '200'
  } else {
    return res.errors
  }
}
