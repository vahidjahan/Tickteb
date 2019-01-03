let defaultState = {};

export const AuthReducer = (state = defaultState, action) => {
  if (action.type == "ADD_MOBILENUMBER") {
    return {
      ...state,
      mobileNumber: action.mobileNumber,
      isUser: action.isUser
    };
  } else if (action.type == "ADD_USERINFO") {
    return {
      ...state,
      authData: action.authData
    };
  } else if (action.type == "REGISTER") {
    return {
      ...state,
      profile: action.profile
    };
  } else if (action.type == "VERIFYCODE") {
    return {
      ...state,
      code: action.code
    };
} else if (action.type == "SERVICENOTIFICATION") {
    return {
      ...state,
      serviceNotificationFlag: action.serviceNotificationFlag
    };
} else if (action.type == "OTHERNOTIFICATION") {
    return {
      ...state,
      otherNotificationFlag: action.otherNotificationFlag
    };
  } else {
    return {
      ...state
    };
  }
};
