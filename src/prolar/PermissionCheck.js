import { PermissionsAndroid } from 'react-native'

let message
export const requestPermission = async permissionName => {
  if (permissionName == 'CAMERA') {
    message =
      'برای ثبت عکس پرسنلی خود و یا بستگان در سامانه به این دسترسی نیاز دارید'
    title = 'دسترسی به دوربین '
  } else if (permissionName == 'ACCESS_FINE_LOCATION') {
    message = 'برای استفاده از نقشه در نرم‌افزار به این  مجوز نیاز دارید'
    title = 'دسترسی به اطلاعات موقعیت جغرافیایی '
  } else if (permissionName == 'CALL_PHONE') {
    message = 'برای تماس با پشتیبانی و یا سرویس دهنده به این مجوز نیاز دارید'
    title = 'دسترسی به تماس تلفنی '
  } else if (permissionName == 'READ_SMS') {
    message = 'برای گرفتن خودکار کد شش رقمی احراز هویت به این دسترسی نیاز دارید'
    title = 'دسترسی به پیامک‌ها '
  } else if (permissionName == 'READ_EXTERNAL_STORAGE') {
    message =
      'برای خواندن اطلاعات مربوط به نرم‌افزار تیک‌طب به این دسترسی نیاز دارید'
    title = 'خواندن حافظه '
  } else if (permissionName == 'WRITE_EXTERNAL_STORAGE') {
    message =
      'برای نوشتن اطلاعات مربوط به نرم‌افزار تیک‌طب به این دسترسی نیاز دارید'
    title = 'نوشتن حافظه '
  }
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS[permissionName],
      {
        title,
        message
      }
    )
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      return true
    } else {
      return false
    }
  } catch (err) {
    return false
  }
}
