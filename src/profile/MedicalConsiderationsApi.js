import { Prolar } from '../prolar/Prolar'
import { ApiCall } from '../prolar/ApiCall'

export const MedicalConsiderationsApi = async () => {
  params = {
    apiName: 'GetUserPatientListWithUser',
    bodyParams: 'null',
    token: Prolar.data.authorization,
    urlParam: 'null'
  }
  res = await ApiCall(params)
  return res
}

export const MedicalConsiderationsAddApi = async () => {
  params = {
    apiName: 'GetDefaultMedicalRecords',
    bodyParams: 'null',
    token: Prolar.data.authorization,
    urlParam: 'null'
  }
  res = await ApiCall(params)

  return res
}

export const MedicalConsiderationsAddPostApi = async bodyParams => {
  params = {
    apiName: 'PostUserMedicalRecords',
    bodyParams: bodyParams,
    token: Prolar.data.authorization,
    urlParam: 'null'
  }
  res = await ApiCall(params)
  return res
}
