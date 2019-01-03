import { ApiCall } from './ApiCall'
import { Prolar } from './Prolar'

const LookUpApi = async () => {
  params = {
    apiName: 'lookUp',
    bodyParams: 'null',
    token: Prolar.data.authorization,
    urlParam: 'null'
  }
  res = await ApiCall(params)

  return res
}

export const GetSelectValue = async () => {
  let options = {
    insurances: [],
    supplementaryInsurances: [],
    educationalDegrees: [],
    bloodTypes: []
  }

  let res = await LookUpApi()
  if (res.message == 200) {
    res.data.insurances.map(it => options.insurances.push({ label: it }))
    res.data.supplementaryInsurances.map(it =>
      options.supplementaryInsurances.push({ label: it })
    )
    res.data.educationalDegrees.map(it =>
      options.educationalDegrees.push({ label: it })
    )
    res.data.bloodTypes.map(it => options.bloodTypes.push({ label: it }))
  }

  return options
}
