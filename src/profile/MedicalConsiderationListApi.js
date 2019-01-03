import { Prolar } from '../prolar/Prolar'
import { ApiCall } from '../prolar/ApiCall'
import { log } from 'util'

export const MedicalConsiderationListApi = async id => {
  params = {
    apiName: 'GetUserMedicalRecords',
    bodyParams: 'null',
    token: Prolar.data.authorization,
    urlParam: id
  }
  res = await ApiCall(params)
  return res
}
