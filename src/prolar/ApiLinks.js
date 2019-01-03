export const SourceData = {
  domain: "https://testapi.tickteb.com",
  android: {
    ClientId: "TikTeb.AndroidClient.Customer",
    Password: "android@cba"
  },
  ios: {
    ClientId: "TikTeb.IosClient.Customer",
    Password: "ios@rer"
  },
  persianSiteRules: "/assets/terms.html",
  questionsPage: "/assets/terms.html",
  aboutUs: "/aboutUs.html",

  mapApiKey:
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjViNmNiYjY5NGZkYjlhZjQ1MWI1MDY2MzMxYWFhNGMxYTQ4OWY4YzBmZWJlMDYzZjZiMjg4ZTdiMDYzMWY0NjNjYWU1ZmFkYTZiMTdjOGZmIn0.eyJhdWQiOiJteWF3ZXNvbWVhcHAiLCJqdGkiOiI1YjZjYmI2OTRmZGI5YWY0NTFiNTA2NjMzMWFhYTRjMWE0ODlmOGMwZmViZTA2M2Y2YjI4OGU3YjA2MzFmNDYzY2FlNWZhZGE2YjE3YzhmZiIsImlhdCI6MTUyOTkwNTgxMiwibmJmIjoxNTI5OTA1ODEyLCJleHAiOjE1Mjk5MDk0MTIsInN1YiI6IiIsInNjb3BlcyI6WyJiYXNpYyIsImVtYWlsIl19.HqyFkuEkldyQXBTxgVTa0-qdbA5caAbDaiyO3xWu2fQ8_ne5_AiL_yXQV-sFxrByOKiPRULBjFViRq1SjUmr24_Fw2hBuVDbZ4-bhSBHsSwivO5GyQlyZ7jIV4v5ieGyV7BHjYWuscDLLOm7WaOTVfSATTtxFO5NpPd3chUdUxtl4gnrbBom0guLee-G4eRQ_XGeUY86Jm2e6rAztyYr7fBeFvPoD3PV6nPZyE-auiwNZ4RNrZgsbi7DSa05hY86OzpvzkZ95GChrtl7evYr79pP4YEBJ7jrGoiP9WyYFTG_jUi6gkJVPZ-1F8cxRnwiVwhkJ855DvClzisw_5rQbA"
};
export const MapUrl = (lat, lon) => {
  return `https://map.ir/reverse?lat=${lat}&lon=${lon}`;
};
export const ApiList = {
  checkUser: {
    url: `${SourceData.domain}/api/Register/Customer/Submit/`,
    method: "Get",
    reqType: "json"
  },
  editProfile: {
    url: `${SourceData.domain}/api/Profile/Customer/Post`,
    method: "POST",
    reqType: "json"
  },
  getInvoice: {
    url: `${SourceData.domain}/api/Request/Customer/GetInvoice/`,
    method: "POST",
    reqType: "json"
  },
  GetRequestProvider: {
    url: `${SourceData.domain}/api/Request/Customer/GetRequestProvider/`,
    method: "Get",
    reqType: "json"
  },
  GetPatient: {
    url: `${SourceData.domain}/api/Patient/Get/`,
    method: "Get",
    reqType: "json"
  },
  GetListUserNotification: {
    url: `${SourceData.domain}/api/UserNotification/GetList/`,
    method: "Get",
    reqType: "json"
  },
  GetRequestServiceItem: {
    url: `${SourceData.domain}/api/Request/Customer/GetRequestServiceItem/`,
    method: "Get",
    reqType: "json"
  },
  GetTransactionUserReport: {
    url: `${SourceData.domain}/api/TransactionUserReport/GetAll`,
    method: "Get",
    reqType: "json"
  },
  GetRequestLocation: {
    url: `${SourceData.domain}/api/Request/Customer/GetRequestLocation/`,
    method: "Get",
    reqType: "json"
  },
  GetUserDefaultLocationDetailList: {
    url: `${
      SourceData.domain
    }/api/DefaultLocation/GetUserDefaultLocationDetailList`,
    method: "Get",
    reqType: "json"
  },
  verifyCode: {
    url: `${SourceData.domain}/api/Register/Customer/Verify`,
    method: "POST",
    reqType: "json"
  },
  addPatient: {
    url: `${SourceData.domain}/api/Patient/Post`,
    method: "POST",
    reqType: "form"
  },
  changeProfilePic: {
    url: `${SourceData.domain}/api/Profile/Customer/PostProfilePicture`,
    method: "POST",
    reqType: "form"
  },
  deletePatient: {
    url: `${SourceData.domain}/api/Patient/Delete/`,
    method: "Get",
    reqType: "json"
  },
  login: {
    url: `${SourceData.domain}/token`,
    method: "POST",
    reqType: "urlEncoded"
  },
  register: {
    url: `${SourceData.domain}/api/Register/Customer/SaveDetail/`,
    method: "POST",
    reqType: "json"
  },
  GetCurrentServiceList: {
    url: `${SourceData.domain}/api/Request/Customer/GetCurrentServiceList/`,
    method: "Get",
    reqType: "json"
  },
  Request: {
    url: `${SourceData.domain}/api/ServiceAction/Customer/Request/`,
    method: "POST",
    reqType: "json"
  },
  FavoriteLocation: {
    url: `${SourceData.domain}/api/DefaultLocation/Post/`,
    method: "POST",
    reqType: "json"
  },
  GetUserPatientList: {
    url: `${SourceData.domain}/api/Patient/GetUserPatientList/`,
    method: "Get",
    reqType: "json"
  },
  GetServiceItemList: {
    url: `${SourceData.domain}/api/Request/Customer/GetServiceItemList`,
    method: "Get",
    reqType: "json"
  },
  CancelRequest: {
    url: `${SourceData.domain}/api/ServiceAction/Customer/Cancel/`,
    method: "Get",
    reqType: "json"
  },
  GetRequestDetail: {
    url: `${SourceData.domain}/api/Request/Customer/GetRequestDetail/`,
    method: "Get",
    reqType: "json"
  },
  GetUserPatientListWithUser: {
    url: `${SourceData.domain}/api/Patient/GetUserPatientListWithUser/`,
    method: "Get",
    reqType: "json"
  },
  GetUserMedicalRecords: {
    url: `${SourceData.domain}/api/Profile/Customer/GetUserMedicalRecords/`,
    method: "Get",
    reqType: "json"
  },
  StartConfirm: {
    url: `${SourceData.domain}/api/ServiceAction/Customer/StartConfirm/`,
    method: "Get",
    reqType: "json"
  },
  DeleteLocation: {
    url: `${SourceData.domain}/api/DefaultLocation/Delete/`,
    method: "Get",
    reqType: "json"
  },
  GetProfile: {
    url: `${SourceData.domain}/api/Profile/Customer/Get/`,
    method: "Get",
    reqType: "json"
  },
  PayInvoice: {
    url: `${SourceData.domain}/api/ServiceAction/Customer/PayInvoice/`,
    method: "POST",
    reqType: "json"
  },
  GetCompleteServiceList: {
    url: `${SourceData.domain}/api/Request/Customer/GetCompleteServiceList/`,
    method: "Get",
    reqType: "json"
  },
  GetMasterInformation: {
    url: `${SourceData.domain}/api/Account/GetMasterInformation`,
    method: "Get",
    reqType: "json"
  },
  GetDefaultMedicalRecords: {
    url: `${SourceData.domain}/api/Profile/Customer/GetDefaultMedicalRecords`,
    method: "Get",
    reqType: "json"
  },
  PostUserMedicalRecords: {
    url: `${SourceData.domain}/api/Profile/Customer/PostUserMedicalRecords`,
    method: "POST",
    reqType: "json"
  },
  rate: {
    url: `${SourceData.domain}/api/ServiceAction/Customer/Rate`,
    method: "POST",
    reqType: "json"
  },
  GetRequestResult: {
    url: `${SourceData.domain}/api/Request/Customer/GetRequestResult/`,
    method: "Get",
    reqType: "json"
  },
  lookUp: {
    url: `${SourceData.domain}/api/Profile/Customer/GetLookUpRecords`,
    method: "Get",
    reqType: "json"
  },
  complete: {
    url: `${SourceData.domain}/api/Profile/Customer/Complete`,
    method: "POST",
    reqType: "json"
  },
  GetFinalInvoice: {
    url: `${SourceData.domain}/api/Request/Customer/GetFinalInvoice/`,
    method: "Get",
    reqType: "json"
  }
};
