import React, { Component } from "react";
import { View } from "react-native";
import { Picker, Label } from "native-base";

import Text from "./../text/PrimaryText";
import { width, height } from "./../style/Dimension";
import { Prolar } from "./../../prolar/Prolar";


export default class PickerExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    };
  }

  componentWillMount() {
    if (this.props.defaultValue) {
      let id = this.props.data.find(
        obj => obj[this.props.labelValue] === this.props.defaultValue
      )[this.props.keyValue];
      let label = this.props.data[0][this.props.labelValue];
      let pickerValue = { id, label };
      this.props.pickerValue(pickerValue);
    } else {
      let id = this.props.data[0][this.props.keyValue];
      let label = this.props.data[0][this.props.labelValue];
      let pickerValue = { id, label };
      this.props.pickerValue(pickerValue);
    }
  }

  handleChange = itemValue => {
    if (itemValue !== "-1") {
      this.setState({ value: itemValue }, () => {
        let id = this.props.data.find(
          obj => obj[this.props.keyValue] === this.state.value
        )[this.props.keyValue];
        let label = this.props.data.find(
          obj => obj[this.props.keyValue] === this.state.value
        )[this.props.labelValue];

        let pickerValue = { id, label };
        this.props.pickerValue(pickerValue);
      });
    }
  };

  render() {
    const {
      data,
      keyValue,
      label,
      labelValue,
      placeholder,
      height,
      width,
      viewStyle
    } = this.props;

    return (
      <View style={[viewStyle, { paddingBottom: 3 * Prolar.size.unit }]}>
        {label && <Label style={Prolar.style.labelStyle}>{label}</Label>}
        <View
          style={[
            {
              backgroundColor: Prolar.color.gray2,
              borderRadius: Prolar.size.unit * 50,
              height
            },
          ]}
        >
          <Picker
            style={{
              height: Prolar.size.unit * height,
              width: Prolar.size.unit * width,
              color: "#97A2A7"
            }}
            selectedValue={this.state.value}
            onValueChange={this.handleChange}
          >
            <Picker.Item
              key={-1}
              label={placeholder}
              value="-1"
              itemTextStyle={{ color: "#97A2A7" }}
              style={{ color: "#97A2A7" }}
            />
            {data.map((item, i) => (
              <Picker.Item
                key={i}
                label={item[labelValue]}
                value={item[keyValue]}
                style={{ color: "#97A2A7" }}
              />
            ))}
          </Picker>
        </View>
      </View>
    );
  }
}
