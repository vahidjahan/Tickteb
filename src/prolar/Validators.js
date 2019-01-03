export const MobileNumberCheck = mobNumber => {
  let re = new RegExp('^(09)(0[1-5]|1[0-9]|2[0-2]|3[0-9])[0-9]{7}$')
  return re.test(mobNumber)
}

export const NationalCodeCheck = val => {
  let valArray = val.split('')
  let sum = 0
  for (i = 0; i < val.length - 1; i++) {
    sum += parseInt(valArray[i]) * (10 - i)
  }
  let rem = sum % 11
  if (rem > 1) {
    rem = 11 - rem
  }
  let lastNum = parseInt(valArray[9])

  return lastNum == rem
}
export const PersianValueCheck = val => {
  var reg = new RegExp(
    /^[٫ءآ‌أؤإئ‌ا بت ثجحخدذرزسشصضطظعغفقلمنهوَُِّٕپچژکگھی‌]+$/
  )
  return val.length > 1 && reg.test(val)
}
export const AddressValueCheck = val => {
  var reg = new RegExp(/^[!@#$%^&*()?":{}|<>]+$/)
  let res = true
  let charList = val.split('')
  if (charList.length < 2) {
    res = false
  }
  charList.map(ch => {
    if (reg.test(ch)) {
      res = false
    }
  })
  return res
}

export const validateEmail = email => {
  var reg = new RegExp(
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  )
  return reg.test(String(email).toLowerCase())
}

export const validateTel = tel => {
  var reg = new RegExp(/^0[0-9]{5,10}$/)
  return reg.test(tel)
}
export const numberCheck = num => {
  var reg = new RegExp(/^[0-9.]{1,7}$/)
  return reg.test(num)
}
