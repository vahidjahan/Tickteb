import React, { Component } from "react";
import { ScrollView, View, ActivityIndicator } from "react-native";
import Hr from "react-native-hr-component";

import Text from "../public/text/PrimaryText";
import CustomImage from "../public/image/CustomImage";
import { Prolar } from "../prolar/Prolar";

export const getVerified = item => {
  return (
    <View
      style={{
        flexDirection: "row-reverse",
        justifyContent: "flex-end",
        alignItems: "center"
      }}
    >
      {TimeLineImage(require("../../assets/icons/sitDone.png"))}

      <Text
        label={item.status}
        color={Prolar.color.gray6}
        fontSize={Prolar.size.font_md}
        style={[Prolar.style.spaceText]}
      />
      <Text
        viewStyle={{
          alignItems: "flex-start",
          flexGrow: 4
        }}
        label={Prolar.replaceNumberToPersion(item.dateShamsi.substring(13, 18))}
        color={Prolar.color.gray4}
        fontSize={Prolar.size.font_md}
      />
    </View>
  );
};

export const getCompeletePaied = item => {
  return (
    <View
      style={{
        flexDirection: "row-reverse",
        justifyContent: "flex-end",
        alignItems: "center"
      }}
    >
      {TimeLineImage(require("../../assets/icons/sitDone.png"))}

      <Text
        label={item.status}
        color={Prolar.color.success}
        fontSize={Prolar.size.font_md}
        style={[Prolar.style.spaceText]}
      />
      <Text
        viewStyle={{
          alignItems: "flex-start",
          flexGrow: 4
        }}
        label={Prolar.replaceNumberToPersion(item.dateShamsi.substring(13, 18))}
        color={Prolar.color.gray4}
        fontSize={Prolar.size.font_md}
      />
    </View>
  );
};

export const CompletedFactorSent = item => {
  return (
    <View
      style={{
        flexDirection: "row-reverse",
        justifyContent: "flex-end",
        alignItems: "center"
      }}
    >
      {TimeLineImage(require("../../assets/icons/sitDone.png"))}

      <Text
        label={item.status}
        color={Prolar.color.success}
        fontSize={Prolar.size.font_md}
        style={[Prolar.style.spaceText]}
      />
      <Text
        viewStyle={{
          alignItems: "flex-start",
          flexGrow: 4
        }}
        label={Prolar.replaceNumberToPersion(item.dateShamsi.substring(13, 18))}
        color={Prolar.color.gray4}
        fontSize={Prolar.size.font_md}
      />
    </View>
  );
};

export const CompletedReportRegistered = item => {
  return (
    <View
      style={{
        flexDirection: "row-reverse",
        justifyContent: "flex-end",
        alignItems: "center"
      }}
    >
      {TimeLineImage(require("../../assets/icons/sitDone.png"))}

      <Text
        label={item.status}
        color={Prolar.color.success}
        fontSize={Prolar.size.font_md}
        style={[Prolar.style.spaceText]}
      />
      <Text
        viewStyle={{
          alignItems: "flex-start",
          flexGrow: 4
        }}
        label={Prolar.replaceNumberToPersion(item.dateShamsi.substring(13, 18))}
        color={Prolar.color.gray4}
        fontSize={Prolar.size.font_md}
      />
    </View>
  );
};
export const DefualtItem = item => {
  return (
    <View
      style={{
        flexDirection: "row-reverse",
        justifyContent: "flex-end",
        alignItems: "center"
      }}
    >
      {TimeLineImage(require("../../assets/icons/sitDone.png"))}
      <Text
        label={item.status}
        color={Prolar.color.success}
        fontSize={Prolar.size.font_md}
        style={[Prolar.style.spaceText]}
      />
      <Text
        viewStyle={{
          alignItems: "flex-start",
          flexGrow: 4
        }}
        label={Prolar.replaceNumberToPersion(item.dateShamsi.substring(13, 18))}
        color={Prolar.color.gray4}
        fontSize={Prolar.size.font_md}
      />
    </View>
  );
};

export const cancelByCustomer = item => {
  return (
    <View
      style={{
        flexDirection: "row-reverse",
        justifyContent: "flex-end",
        alignItems: "center"
      }}
    >
      {TimeLineImage(require("../../assets/icons/sitCancel.png"))}

      <Text
        label={item.status}
        color={Prolar.color.gray6}
        fontSize={Prolar.size.font_md}
        style={[Prolar.style.spaceText]}
      />
      <Text
        viewStyle={{ alignItems: "flex-start", flexGrow: 4 }}
        label={Prolar.replaceNumberToPersion(item.dateShamsi.substring(13, 18))}
        color={Prolar.color.gray4}
        fontSize={Prolar.size.font_md}
      />
    </View>
  );
};

export const cancelByServiceProvider = item => {
  return (
    <View
      style={{
        flexDirection: "row-reverse",
        justifyContent: "flex-end",
        alignItems: "center"
      }}
    >
      {TimeLineImage(require("../../assets/icons/sitRedcancell.png"))}

      <Text
        label={item.status}
        color={Prolar.color.gray6}
        fontSize={Prolar.size.font_md}
        style={[Prolar.style.spaceText]}
      />
      <Text
        viewStyle={{ alignItems: "flex-start", flexGrow: 4 }}
        label={Prolar.replaceNumberToPersion(item.dateShamsi.substring(13, 18))}
        color={Prolar.color.gray4}
        fontSize={Prolar.size.font_md}
      />
    </View>
  );
};

export const noServiceProvider = item => {
  return (
    <View
      style={{
        flexDirection: "row-reverse",
        justifyContent: "flex-end",
        alignItems: "center"
      }}
    >
      {TimeLineImage(require("../../assets/icons/info.png"))}

      <Text
        label={item.status}
        color={Prolar.color.gray6}
        fontSize={Prolar.size.font_md}
        style={[Prolar.style.spaceText]}
      />
      <Text
        viewStyle={{
          alignItems: "flex-start",
          flexGrow: 4
        }}
        label={Prolar.replaceNumberToPersion(item.dateShamsi.substring(13, 18))}
        color={Prolar.color.gray4}
        fontSize={Prolar.size.font_md}
      />
    </View>
  );
};

export const accepted = (item, providerDate) => {
  return (
    <View
      style={{
        flexDirection: "row-reverse",
        justifyContent: "flex-end",
        alignItems: "center"
      }}
    >
      {TimeLineImage(
        providerDate
          ? providerDate.data.imageUrl !== null
            ? {
                uri: Prolar.api.domain + providerDate.data.imageUrl.trim()
              }
            : require("./../../assets/icons/profilePicEdit.png")
          : require("./../../assets/icons/profilePicEdit.png")
      )}

      <Text
        label={item.status}
        color={Prolar.color.gray6}
        fontSize={Prolar.size.font_md}
        style={[Prolar.style.spaceText]}
      />
      <Text
        viewStyle={{
          alignItems: "flex-start",
          flexGrow: 4
        }}
        label={Prolar.replaceNumberToPersion(item.dateShamsi.substring(13, 18))}
        color={Prolar.color.gray4}
        fontSize={Prolar.size.font_md}
      />
    </View>
  );
};
export const onTheWay = (item, providerDate) => {
  return (
    <View
      style={{
        flexDirection: "row-reverse",
        justifyContent: "flex-end",
        alignItems: "center"
      }}
    >
      {TimeLineImage(
        providerDate
          ? providerDate.data.imageUrl !== null
            ? {
                uri: Prolar.api.domain + providerDate.data.imageUrl
              }
            : require("./../../assets/icons/profilePicEdit.png")
          : require("./../../assets/icons/profilePicEdit.png")
      )}

      <Text
        label={item.status}
        color={Prolar.color.gray6}
        fontSize={Prolar.size.font_md}
        style={[Prolar.style.spaceText]}
      />
      <Text
        viewStyle={{
          alignItems: "flex-start",
          flexGrow: 4
        }}
        label={Prolar.replaceNumberToPersion(item.dateShamsi.substring(13, 18))}
        color={Prolar.color.gray4}
        fontSize={Prolar.size.font_md}
      />
    </View>
  );
};

export const waitingStartPermission = (item, providerDate) => {
  return (
    <View
      style={{
        flexDirection: "row-reverse",
        justifyContent: "flex-end",
        alignItems: "center"
      }}
    >
      {TimeLineImage(
        providerDate
          ? providerDate.data.imageUrl !== null
            ? {
                uri: Prolar.api.domain + providerDate.data.imageUrl
              }
            : require("./../../assets/icons/profilePicEdit.png")
          : require("./../../assets/icons/profilePicEdit.png")
      )}

      <Text
        label={item.status}
        color={Prolar.color.gray6}
        fontSize={Prolar.size.font_md}
        style={[Prolar.style.spaceText]}
      />
      <Text
        viewStyle={{
          alignItems: "flex-start",
          flexGrow: 4
        }}
        label={Prolar.replaceNumberToPersion(item.dateShamsi.substring(13, 18))}
        color={Prolar.color.gray4}
        fontSize={Prolar.size.font_md}
      />
    </View>
  );
};

export const startted = (item, providerDate) => {
  return (
    <View
      style={{
        flexDirection: "row-reverse",
        justifyContent: "flex-end",
        alignItems: "center"
      }}
    >
      {TimeLineImage(
        providerDate
          ? providerDate.data.imageUrl !== null
            ? {
                uri: Prolar.api.domain + providerDate.data.imageUrl
              }
            : require("./../../assets/icons/profilePicEdit.png")
          : require("./../../assets/icons/profilePicEdit.png")
      )}
      <Text
        label={item.status}
        color={Prolar.color.gray6}
        fontSize={Prolar.size.font_md}
        style={[Prolar.style.spaceText]}
      />
      <Text
        viewStyle={{
          alignItems: "flex-start",
          flexGrow: 4
        }}
        label={Prolar.replaceNumberToPersion(item.dateShamsi.substring(13, 18))}
        color={Prolar.color.gray4}
        fontSize={Prolar.size.font_md}
      />
    </View>
  );
};

{
  /* ----------------------------------Inner Components --------------------------- */
}

const TimeLineImage = address => {
  return (
    <CustomImage
      width={20}
      height={20}
      src={address}
      style={{
        borderRadius: 10 * Prolar.size.unit,
        marginRight: 6 * Prolar.size.unit
      }}
    />
  );
};
