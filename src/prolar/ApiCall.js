import { ApiList } from './ApiLinks'
import RNExitApp from 'react-native-exit-app'
import { AuthStore } from '../redux/providers/AuthStore'
import { AddUserInfo } from '../redux/actions/AuthActions'
import { Prolar } from './Prolar'

let headers = {}
let body = {}

// urlEncode format for body
let urlEncode = body2 => {
  var data = []
  for (var k in body2) {
    data.push(`${k}=${body2[k]}`)
  }
  body = data.join('&')
  headers = {
    Accept: 'application/x-www-form-urlencoded;charset=UTF-8',
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
  }
}
// json format for body and header
let jsonify = body2 => {
  body = JSON.stringify(body2)
  headers = {
    Accept: 'application/json;charset=UTF-8',
    'Content-Type': 'application/json;charset=UTF-8'
  }
}
// formData format for body and header
let formify = body2 => {
  var formData = new FormData()

  for (var k in body2) {
    formData.append(k, body2[k])
  }
  body = formData

  headers = {
    'Content-Type': 'multipart/form-data',
    Accept: 'application/json'
  }
}

onUnauthorized = () => {
  Prolar.setToken('null')
  AuthStore.dispatch(AddUserInfo('null', 'null'))
  RNExitApp.exitApp()
}

/***************************************
Main ApiCall Function
***************************************/

export const ApiCall = async params => {
  let { apiName, bodyParams, urlParam, token } = params
  reqType = ApiList[apiName].reqType
  if (reqType == 'json') {
    jsonify(bodyParams)
  } else if (reqType == 'form') {
    formify(bodyParams)
  } else if (reqType == 'urlEncoded') {
    urlEncode(bodyParams)
  }
  headers = token == 'null' ? headers : { ...headers, Authorization: token }
  // headers =
  //   apiName == "PayInvoice" ? { ...headers, "Content-Length": 121 } : headers;
  let requestUrl =
    urlParam == 'null'
      ? `${ApiList[apiName].url}`
      : `${ApiList[apiName].url}${urlParam}`
  let method = ApiList[apiName].method

  try {
    let reqParams =
      bodyParams == 'null'
        ? {
          method: method,
          headers: headers
        }
        : {
          method: method,
          headers: headers,
          body: body
        }
    let response = await fetch(requestUrl, reqParams)
    if (response.status < 500 && response.status > 400) {
      if (response.status == 401) {
        onUnauthorized()
      }
      res = {
        message: response.status,
        data: [],
        errors: ['مشکلی در اتصال به سرور وجود دارد']
      }
    } else if (response.status == 200) {
      if (response._bodyText.length > 0) {
        let responseJson = await response.json()

        let data2 = apiName == 'login' ? responseJson : responseJson.data
        res = { message: response.status, data: data2, errors: [] }
      } else {
        res = { message: response.status, data: [], errors: [] }
      }
    } else {
      let responseJson = await response.json()
      let error2 =
        apiName == 'login'
          ? responseJson.error_description
          : responseJson.errors
      res = { message: response.status, errors: error2, data: [] }
    }
    return res
  } catch (error) {
    res = {
      message: 1000,
      errors: [
        'خطا در ارسال اطلاعات! لطفا از دسترسی خود به اینترنت اطمینان حاصل فرمایید'
      ],
      data: []
    }
    return res
  }
}
