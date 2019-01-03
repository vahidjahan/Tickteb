import { Prolar } from './../../prolar/Prolar'
import { ApiCall } from '../../prolar/ApiCall'

export const EditProfileAPI = async body => {
  params = {
    apiName: 'editProfile',
    urlParam: 'null',
    bodyParams: body,
    token: Prolar.data.authorization
  }
  res = await ApiCall(params)

  return res
}
export const ChangeProfilePicAPI = async body => {
  params = {
    apiName: 'changeProfilePic',
    urlParam: 'null',
    bodyParams: body,
    token: Prolar.data.authorization
  }
  res = await ApiCall(params)

  return res
}
