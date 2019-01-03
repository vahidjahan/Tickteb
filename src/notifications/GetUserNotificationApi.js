import { Prolar } from "../prolar/Prolar";
import { ApiCall } from "../prolar/ApiCall";



export const GetUserNotificationApi = async () => {
  params = {
    apiName: "GetListUserNotification",
    urlParam: "null",
    bodyParams: "null",
    token: Prolar.data.authorization
  };
  res = await ApiCall(params);

  return res;
};
