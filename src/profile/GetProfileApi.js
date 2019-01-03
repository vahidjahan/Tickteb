import { Prolar } from '../prolar/Prolar'
// import { connect } from "react-redux";
// import { addMobileNumber } from "../../redux/actions/AuthActions";
// import { Login } from "./Login";
import { ApiCall } from '../prolar/ApiCall'

export const GetProfileApi = async () => {
  params = {
    apiName: 'GetProfile',
    bodyParams: 'null',
    token: Prolar.data.authorization,
    urlParam: 'null'
  }
  res = await ApiCall(params)

  return res
}
