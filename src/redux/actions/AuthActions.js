import {
  ADD_USERINFO,
  ADD_MOBILENUMBER,
  REGISTER,
  VERIFYCODE,
  OTHERNOTIFICATION,
  SERVICENOTIFICATION
} from "./ActionMacros";
export const AddMobileNumber = (mobileNumber, isUser) => ({
  type: ADD_MOBILENUMBER,
  mobileNumber,
  isUser
});

export const AddUserInfo = (token, expires) => ({
  type: ADD_USERINFO,
  authData: {
    token,
    expires
  }
});
export const VerifyCode = code => ({ type: VERIFYCODE, code });

export const setServiceNotification = serviceNotificationFlag => ({
  type: SERVICENOTIFICATION,
  serviceNotificationFlag
});
export const setOtherNotification = otherNotificationFlag => ({
  type: OTHERNOTIFICATION,
  otherNotificationFlag
});


