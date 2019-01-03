import { Dimensions, Platform } from "react-native";
import { width } from "../public/style/Dimension";
import { DropdownAlert } from "react-native-dropdownalert";
import dateTools from "./../public/dateTools/DateTools";
import { StackActions, NavigationActions } from "react-navigation";

let screenWidth = Dimensions.get("window").width;
let screenHeight = Dimensions.get("window").height;

let unit = screenWidth / 360;
if (screenWidth >= 500) {
  unit = unit * 0.7;
}

let isIOS = Platform.OS === "ios";

let _Prolar = {
  dateTools,

  navigator(ctx, path, data) {
    return () => {
      if (path == -1) {
        ctx.props.navigation.pop();
      } else {
        ctx.props.navigation.navigate(path, data);
      }
    };
  },

  isIOS,

  api: {
    domain: "https://testapi.tickteb.com/",
    aboutUs_domain: "https://www.google.com/",
    rules_domain: "https://www.google.com/"
  },

  screen: {
    width: screenWidth,
    height: screenHeight
  },

  getStatusInfo(label) {
    let res = this.status.filter(item => {
      return item.label === label;
    });
    if (res.length == 0) {
      return {
        label: "وضعیت نامشخص",
        color: "#015784",
        iconUrl: require("./../../assets/icons/sitRedcancell.png")
      };
    }
    return res[0];
  },
  setToken(token) {
    this.data.authorization = token;
  },

  addCommas(str) {
    str = str.toString();
    str = str.replace(/\,/g, "");
    var objRegex = new RegExp("(-?[0-9]+)([0-9]{3})");
    while (objRegex.test(str)) {
      str = str.replace(objRegex, "$1,$2");
    }
    return str;
  },

  tomanLabel(toman, free = true) {
    if (free && toman == 0) {
      return "رایگان";
    }
    return _Prolar.replaceNumberToPersion(_Prolar.addCommas(toman)) + " تومان";
  },

  rialLabel(rial, free = true) {
    if (free && rial == 0) {
      return "رایگان";
    }
    return _Prolar.replaceNumberToPersion(_Prolar.addCommas(rial)) + " ریال";
  },
  convertNumbers2English: function(string) {
    return string
      .replace(/[٠١٢٣٤٥٦٧٨٩]/g, function(c) {
        return c.charCodeAt(0) - 1632;
      })
      .replace(/[۰۱۲۳۴۵۶۷۸۹]/g, function(c) {
        return c.charCodeAt(0) - 1776;
      });
  },

  replaceNumberToPersion(num) {
    num = num.toString();
    let charCodeZero = "۰".charCodeAt(0);
    return num.replace(/[0-9]|,/g, function(w) {
      if (w == ",") return "،";
      return String.fromCharCode(parseInt(w) + charCodeZero);
    });
  },
  navigateReset(routeName) {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: routeName })]
    });

    this.props.navigation.dispatch(resetAction);
  },

  status: [
    {
      label: "در راه",
      color: "#278931",
      iconUrl: require("./../../assets/icons/onGoingRequests.png")
    },

    {
      label: "ثبت شده",
      color: "#965478",
      iconUrl: require("./../../assets/icons/sitDone.png")
    },

    {
      label: "شروع شده",
      color: "#666666",
      iconUrl: require("./../../assets/icons/earned.png")
    },

    {
      label: "در انتظار اجازه شروع",
      color: "#888888",
      iconUrl: require("./../../assets/icons/littlePin.png")
    },
    {
      label: "پذیرفته شده",
      color: "#547217",
      iconUrl: require("./../../assets/icons/payed.png")
    },
    {
      label: "سرویس دهنده یافت نشد",
      color: "#487968",
      iconUrl: require("./../../assets/icons/info.png")
    },
    {
      label: "تکمیل - فاکتور صادر شده",
      color: "#875421",
      iconUrl: require("./../../assets/icons/sitDone.png")
    },
    {
      label: "تکمیل - پرداخت شده",
      color: "#963247",
      iconUrl: require("./../../assets/icons/sitDone.png")
    },
    {
      label: "تکمیل - ثبت گزارش",
      color: "#492147",
      iconUrl: require("./../../assets/icons/sitDone.png")
    },
    {
      label: "تکمیل - امتیاز داده شده",
      color: "#257984",
      iconUrl: require("./../../assets/icons/sitDone.png")
    },
    {
      label: "انصراف توسط کاربر",
      color: "#314598",
      iconUrl: require("./../../assets/icons/sitRedcancell.png")
    },
    {
      label: "انصراف توسط سرویس دهنده",
      color: "#015784",
      iconUrl: require("./../../assets/icons/sitRedcancell.png")
    },
    {
      label: "پذیرفته نشده",
      color: "#015784",
      iconUrl: require("./../../assets/icons/sitRedcancell.png")
    }
  ],

  size: {
    unit,

    headerHeight: 53 * unit,

    font_sm: unit * 12,
    font_md: unit * 15,
    font_lg: unit * 20,
    font_xl: unit * 24,
    font_xxl: unit * 32,

    radius: 25
  },

  color: {
    primary: "#3353f1",
    secondary: "#283946",
    success: "#32b67a",
    error: "#f67f88",
    yellow: "#fff59d",

    cardBorder: "#C0D4E3",
    cardDelete: "#FC8A92",
    serviceTitle: "#2F45B2",

    // gray
    gray0: "#fafafa",
    gray1: "#e7e7e7",
    gray2: "#f4f4f4",
    gray3: "#e3e6e8",
    gray4: "#97a2a7",
    gray5: "#9b9b9b",
    gray6: "#4f616e",
    gray7: "#283946",
    gray8: "#ACB1B6",
    gray9: "#E7ECF0",
    gray10: "#F7F7F7 ",
    gray11: "#191919",

    black: "#000000",
    white: "#FFFFFF"
  },
  fontFamily: "IRANSansMobile"
};

const style = {
  content: {
    backgroundColor: _Prolar.color.gray0
  },

  // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ header Style @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

  header: {
    title: {
      fontFamily: _Prolar.fontFamily,
      fontSize: _Prolar.font_md,
      color: isIOS ? _Prolar.color.gray6 : _Prolar.color.white
    },
    icon: {
      fontSize: unit * 25,
      color: isIOS ? _Prolar.color.gray6 : _Prolar.color.white
    },

    left_: {
      flex: isIOS ? 1 : 0,
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
      zIndex: 1001,
      height: "100%"
    },

    right_: {
      flex: isIOS ? 1 : 0,
      flexDirection: "row",
      justifyContent: "flex-end",
      alignItems: "center",
      zIndex: 1001,
      height: "100%"
    },

    body_: {
      flex: 2,
      alignItems: "center",
      flexDirection: "row",
      paddingLeft: 5 * _Prolar.size.unit,
      paddingRight: 5 * _Prolar.size.unit,
      justifyContent: isIOS ? "center" : "flex-start",
      position: isIOS ? "relative" : "relative",
      zIndex: 1000,
      top: 0,
      height: "100%",
      width: "50%"
    },

    container: {
      borderBottomColor: _Prolar.color.gray3,
      borderBottomWidth: isIOS ? 1 : 0,
      height: _Prolar.size.headerHeight,
      padding: 0,
      marginTop: isIOS ? 0 : 0,
      backgroundColor: isIOS ? _Prolar.color.white : _Prolar.color.primary
    },

    borderBottomColor: _Prolar.color.gray3,
    borderBottomWidth: 1,
    height: _Prolar.size.headerHeight,
    padding: 0,
    backgroundColor: isIOS ? _Prolar.color.white : _Prolar.color.primary
  },

  // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Grid Style @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

  rtlCol: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-end",
    width: "100%"
  },
  rtlRow: {
    width: "100%",
    flexDirection: "row-reverse",
    justifyContent: "flex-start",
    alignItems: "center"
  },

  // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ margin in  diffrent place @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

  row: {
    margin: 5 * _Prolar.size.unit,
    backgroundColor: "transparent"
  },
  spaceText: {
    marginRight: 8 * _Prolar.size.unit
  },

  spaceCard: {
    paddingHorizontal: 12 * _Prolar.size.unit,
    margin: 5 * _Prolar.size.unit
  },

  // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ tab style @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

  tab: {
    backgroundColor: _Prolar.color.gray0
  },
  tabHeading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: _Prolar.color.primary
  },
  tabSchroll: {
    backgroundColor:
      Platform.OS === "android" ? _Prolar.color.primary : _Prolar.color.white,
    height: 100
  },

  tabStyle: {
    backgroundColor: _Prolar.color.white
  },
  activeTabStyle: {
    backgroundColor: _Prolar.color.white
  },
  textStyle: {
    fontFamily: _Prolar.fontFamily,
    fontSize: 14,
    color: _Prolar.color.gray4,
    letterSpacing: 0,
    textAlign: "center"
  },
  activeText: {
    fontWeight: "normal",
    fontFamily: _Prolar.fontFamily,
    fontSize: 14,
    color: _Prolar.color.gray6
  },
  tabBarUnderlineStyle: {
    backgroundColor: _Prolar.color.gray6,
    marginBottom: 45,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10
  },

  // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ input style @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

  inputText: {
    textAlign: "right",
    color: _Prolar.color.gray7,
    fontFamily: _Prolar.fontFamily,
    fontSize: _Prolar.size.icon_md
  },
  labelStyle: {
    textAlign: "right",
    fontFamily: _Prolar.fontFamily,
    fontSize: _Prolar.size.font_sm,
    color: _Prolar.color.gray8
  },

  // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ card style @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
  card: {
    backgroundColor: _Prolar.color.white,
    borderWidth: 1,
    marginBottom: 10,
    borderColor: _Prolar.color.cardBorder,
    borderRadius: 10
  },
  cardItem: {
    borderRadius: unit * 15
  },

  // for example : see MyOngoingOrder.js
  card1: {
    width: "100%",
    padding: 10 * _Prolar.size.unit,
    borderTopWidth: 2 * _Prolar.size.unit,
    borderLeftWidth: 2 * _Prolar.size.unit,
    borderRightWidth: 2 * _Prolar.size.unit,
    borderBottomWidth: 2 * _Prolar.size.unit,
    borderTopLeftRadius: 10 * _Prolar.size.unit,
    borderTopRightRadius: 10 * _Prolar.size.unit,
    borderLeftColor: _Prolar.color.cardBorder,
    borderRightColor: _Prolar.color.cardBorder,
    borderBottomColor: _Prolar.color.cardBorder,
    borderTopColor: _Prolar.color.cardBorder
  },
  card2: {
    width: "100%",
    padding: 10 * _Prolar.size.unit,
    borderLeftWidth: 2 * _Prolar.size.unit,
    borderBottomWidth: 2 * _Prolar.size.unit,
    borderRightWidth: 2 * _Prolar.size.unit,
    borderLeftColor: _Prolar.color.cardBorder,
    borderRightColor: _Prolar.color.cardBorder,
    borderBottomColor: _Prolar.color.cardBorder,
    borderTopColor: _Prolar.color.cardBorder
  },
  card3: {
    width: "100%",
    padding: 10 * _Prolar.size.unit,
    borderLeftWidth: 2 * _Prolar.size.unit,
    borderBottomWidth: 2 * _Prolar.size.unit,
    borderRightWidth: 2 * _Prolar.size.unit,
    borderBottomLeftRadius: 10 * _Prolar.size.unit,
    borderBottomRightRadius: 10 * _Prolar.size.unit,
    borderLeftColor: _Prolar.color.cardBorder,
    borderRightColor: _Prolar.color.cardBorder,
    borderBottomColor: _Prolar.color.cardBorder,
    borderTopColor: _Prolar.color.cardBorder
  },
  seenMessage: {
    fontFamily: _Prolar.fontFamily,
    fontSize: _Prolar.size.font_md,
    color: _Prolar.color.gray6,
    letterSpacing: 0,
    textAlign: "right"
  },
  dropdownAlert: {
    warnColor: "#FFEFCB",
    errorColor: "#f67f88",
    containerStyle: {
      width: "100%",
      flexDirection: "row-reverse",
      justifyContent: "flex-start",
      alignItems: "center"
    }
  }
};

export const Prolar = {
  ..._Prolar,
  style,

  data: {
    authorization:
      "Bearer U-Q5D195-b5SFFRpUGxjzeQ2QAQHypW3zaqZn6jFT24b2uz9p46zhffPk29e9vfuoERNP8NHVDv8vFSVzfMG6IXujsUnTFIEJm8rKI3wdSLHbtLeWYGhd3dpMF95JqUp3d-UkiSjlDtdYCOI5WKp8cewm_4O3W-pfamyOz1-OOVlh71PBzbS6ZldiopUDk6ewb8b9oDkspTHU6Jz1l_aaqFhJ4iR_hqHi2PVYj7vmUaNE8aSnEAPIfP61NEzEKROFl23SmnMHvxxHyrdzzhrXJEUaq5l6rSmPjL-krq4pExhGLYZLfefd8_Dgv0SJ_kFxDvd29XXSendzSo6QP0ZzjMpnLHB8GB98Uf2fDmwo6cdB26Ye7nJuB1qZZkif9TD79sDJdSPvwEMO6DvHyBsZbgAtu9DQNr0g1qBUBzbel26ehIH",
    services: undefined
  }
};
