import { Prolar } from './../prolar/Prolar'

let errors = ''

// const mapDispatchToProps = dispatch => dispatch(addMobileNumber(mobileNumber))

export const ServicesAPI = async Authorization => {
  // return res =
  let requestUrl = `${Prolar.api.domain}/api/Request/Customer/GetServiceItemList`
  let res = ''
  try {
    let response = await fetch(requestUrl, {
      method: 'GET',
      headers: {
        Authorization
      }
    })
    if (response.status < 500 && response.status >= 400) {
      res = {
        data: [],
        errors: ['مشکلی در اتصال به سرور وجود دارد'],
        resultCode: response.status
      }
    } else if (response.status == 200) {
      res = 'ok'
    } else {
      let responseJson = await response.json()

      responseJson.errors.map(item => {
        errors = ` ${errors}${item}\n`
      })
      res = errors
    }
    return res
  } catch (error) {
    console.error(error)
  }
}
