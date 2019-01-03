import moment from 'moment-jalaali'

const MonthNameFa = [
  'فروردین',
  'اردیبهشت',
  'خرداد',
  'تیر',
  'مرداد',
  'شهریور',
  'مهر',
  'آبان',
  'آذر',
  'دی',
  'بهمن',
  'اسفند'
]

const MonthNameEn = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]

const WeekDayNameFa = [
  'شنبه',
  'یکشنبه',
  'دوشنبه',
  'سه شنبه',
  'چهارشنبه',
  'پنج شنبه',
  'جمعه'
]

const WeekDayNameEn = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday'
]

export function getPersionNumber (date) {
  let charCodeZero = '۰'.charCodeAt(0)
  return date.replace(/[0-9]/g, function (w) {
    return String.fromCharCode(parseInt(w) + charCodeZero)
  })
}

// example :
// formats
// mdw  ==>   بهمن ۱۲،شنبه
// ymd  ==>   ۱۳۹۷ بهمن ۱۲
// ymdFa  ==>   ۱۳۹۷.۸.۱۲

export function getGregorianToJalaliString (date, format) {
  if (date == 'today') {
    return 'امروز'
  }
  if (date == 'tomorrow') {
    return 'فردا'
  }
  if (date == undefined || date == '') {
    return ''
  }
  let jalali = gregorianToJalali(date)
  let result = (date = jalali.year + '/' + jalali.month + '/' + jalali.day)

  if (format == 'mdw') {
    result =
      getWeekDayJalali(date) + '، ' + jalali.day + ' ' + getMonthJalali(date)
  } else if (format == 'ymd') {
    result = jalali.day + ' ' + getMonthJalali(date) + ' ' + jalali.year
  } else if (format == 'ymdFa') {
    result = jalali.year + '.' + jalali.month + '.' + jalali.day
  }

  return result
}

export function getJalaliString (date, format) {
  if (date == 'today') {
    let now = getGregorianToJalaliString(
      moment(new Date()).format('YYYY/MM/DD')
    )
    return 'امروز' + '، ' + getJalaliString(now, format)
  }
  if (date == 'tomorrow') {
    let now = getGregorianToJalaliString(
      moment(new Date()).add(1, 'day').format('YYYY/MM/DD')
    )
    return 'فردا' + '، ' + getJalaliString(now, format)
  }
  if (date == undefined || date == '') {
    return ''
  }
  let dateArray = date.split('/')
  let jalali = {
    year: parseInt(dateArray[0]),
    month: (jm = parseInt(dateArray[1])),
    day: (jd = parseInt(dateArray[2]))
  }
  let result = date

  if (format == 'mdw') {
    result =
      getWeekDayJalali(date) +
      '، ' +
      jalali.day +
      ' ' +
      getMonthJalali(date) +
      ' ' +
      jalali.year
  } else if (format == 'ymd') {
    result = jalali.day + ' ' + getMonthJalali(date) + ' ' + jalali.year
  } else if (format == 'ymdFa') {
    result = jalali.year + '.' + jalali.month + '.' + jalali.day
  }

  return getPersionNumber(result)
}

export function getWeekDayJalali (date) {
  let dateG = jalaliToGregorian(date)
  return WeekDayNameFa[
    (new Date(dateG.year, dateG.month - 1, dateG.day).getDay() + 1) % 7
  ]
}

export function getWeekDayGregorian (date) {
  let dateArray = date.split('/')
  let gy = parseInt(dateArray[0]),
    gm = parseInt(dateArray[1]),
    gd = parseInt(dateArray[2])
  return WeekDayNameEn[(new Date(gy, gm - 1, gd).getDay() + 6) % 7]
}

export function getMonthJalali (date) {
  let dateArray = date.split('/')
  let gm = parseInt(dateArray[1])
  return MonthNameFa[gm - 1]
}

export function getMonthGregorian (date) {
  let dateArray = date.split('/')
  let gm = parseInt(dateArray[1])
  return MonthNameEn[gm - 1]
}

export function gregorianToJalali (date) {
  let dateArray = date.split('/')
  let gy = parseInt(dateArray[0]),
    gm = parseInt(dateArray[1]),
    gd = parseInt(dateArray[2])
  g_d_m = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334]
  if (gy > 1600) {
    jy = 979
    gy -= 1600
  } else {
    jy = 0
    gy -= 621
  }
  gy2 = gm > 2 ? gy + 1 : gy
  days =
    365 * gy +
    parseInt((gy2 + 3) / 4) -
    parseInt((gy2 + 99) / 100) +
    parseInt((gy2 + 399) / 400) -
    80 +
    gd +
    g_d_m[gm - 1]
  jy += 33 * parseInt(days / 12053)
  days %= 12053
  jy += 4 * parseInt(days / 1461)
  days %= 1461
  if (days > 365) {
    jy += parseInt((days - 1) / 365)
    days = (days - 1) % 365
  }
  jm = days < 186 ? 1 + parseInt(days / 31) : 7 + parseInt((days - 186) / 30)
  jd = 1 + (days < 186 ? days % 31 : (days - 186) % 30)
  return { year: jy, month: jm, day: jd }
}

export function jalaliToGregorian (date) {
  let dateArray = date.split('/')
  let jy = parseInt(dateArray[0]),
    jm = parseInt(dateArray[1]),
    jd = parseInt(dateArray[2])
  if (jy > 979) {
    gy = 1600
    jy -= 979
  } else {
    gy = 621
  }
  days =
    365 * jy +
    parseInt(jy / 33) * 8 +
    parseInt((jy % 33 + 3) / 4) +
    78 +
    jd +
    (jm < 7 ? (jm - 1) * 31 : (jm - 7) * 30 + 186)
  gy += 400 * parseInt(days / 146097)
  days %= 146097
  if (days > 36524) {
    gy += 100 * parseInt(--days / 36524)
    days %= 36524
    if (days >= 365) days++
  }
  gy += 4 * parseInt(days / 1461)
  days %= 1461
  if (days > 365) {
    gy += parseInt((days - 1) / 365)
    days = (days - 1) % 365
  }
  gd = days + 1
  sal_a = [
    0,
    31,
    (gy % 4 == 0 && gy % 100 != 0) || gy % 400 == 0 ? 29 : 28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31
  ]
  for (gm = 0; gm < 13; gm++) {
    v = sal_a[gm]
    if (gd <= v) break
    gd -= v
  }
  return { year: gy, month: gm, day: gd }
}

export default {
  MonthNameFa,
  MonthNameEn,
  WeekDayNameFa,
  WeekDayNameEn,

  jalaliToGregorian,
  gregorianToJalali,
  getMonthGregorian,
  getMonthJalali,
  getWeekDayGregorian,
  getWeekDayJalali,
  getJalaliString,
  getGregorianToJalaliString
}
