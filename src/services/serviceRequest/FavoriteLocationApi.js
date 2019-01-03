import { ApiCall } from '../../prolar/ApiCall'
import { Prolar } from '../../prolar/Prolar'

export const FavoriteLocationApi = async location => {
  locData = {
    lat: location.latitude,
    title: location.title,
    lng: location.longitude,
    description: location.description,
    detail: location.detail
  }
  params = {
    apiName: 'FavoriteLocation',
    bodyParams: locData,
    token: Prolar.data.authorization,
    urlParam: 'null'
  }
  res = await ApiCall(params)

  return res
}
