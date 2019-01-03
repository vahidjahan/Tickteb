import { Prolar } from "../prolar/Prolar";
// import { connect } from "react-redux";
// import { addMobileNumber } from "../../redux/actions/AuthActions";
// import { Login } from "./Login";
import { ApiCall } from "../prolar/ApiCall";

export const StartConfirmApi = async urlParam => {
  params = {
    apiName: "StartConfirm",
    bodyParams: "null",
    token: Prolar.data.authorization,
    urlParam: urlParam
  };
  res = await ApiCall(params);

  return res;
};
