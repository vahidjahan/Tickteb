import { Prolar } from "../prolar/Prolar";
// import { connect } from "react-redux";
// import { addMobileNumber } from "../../redux/actions/AuthActions";
// import { Login } from "./Login";
import { ApiCall } from "../prolar/ApiCall";

export const CheckOrdersApi = async () => {
  params = {
    apiName: "GetCurrentServiceList",
    bodyParams: "null",
    token: Prolar.data.authorization,
    urlParam: "null"
  };
  res = await ApiCall(params);

  return res;
};
