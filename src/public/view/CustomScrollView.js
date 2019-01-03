import React, { Component } from "react";
import {
    Animated,
    Dimensions,
    Keyboard,
    StyleSheet,
    TextInput,
    UIManager,
    ScrollView
} from "react-native";


const { State: TextInputState } = TextInput;

export default class CustomScrollView extends Component {


    state = {
        shift: new Animated.Value(0)
    };

    componentWillMount() {
        this.keyboardDidShowSub = Keyboard.addListener(
            "keyboardDidShow",
            this.handleKeyboardDidShow
        );
        this.keyboardDidHideSub = Keyboard.addListener(
            "keyboardDidHide",
            this.handleKeyboardDidHide
        );
    }

    componentWillUnmount() {
        this.keyboardDidShowSub.remove();
        this.keyboardDidHideSub.remove();
    }



    handleKeyboardDidShow = event => {
        const { height: windowHeight } = Dimensions.get("window");
        const keyboardHeight = event.endCoordinates.height;
        const currentlyFocusedField = TextInputState.currentlyFocusedField();
        UIManager.measure(
            currentlyFocusedField,
            (originX, originY, width, height, pageX, pageY) => {
                const fieldHeight = height;
                const fieldTop = pageY;
                const gap = windowHeight - keyboardHeight;

                if (gap >= 0) {
                    return;
                }
                Animated.timing(this.state.shift, {
                    toValue: gap,
                    duration: 1000,
                    useNativeDriver: true
                }).start();
            }
        );
    };

    handleKeyboardDidHide = () => {
        Animated.timing(this.state.shift, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true
        }).start();
    };


    render() {
        const { shift } = this.state;
        return (
            <Animated.View
                style={[styles.container, { transform: [{ translateY: shift }] }]}
            >
                <ScrollView>
                    {this.props.children}
                </ScrollView>
            </Animated.View>
        );
    }

}

CustomScrollView.defaultProps = {
    flex: 1,
    color: "white",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start"
};


const styles = StyleSheet.create({
    container: {
        // backgroundColor: "gray",
        flex: 1,

        // height: "100%",
        // justifyContent: "space-around"
        // left: 0,
        // position: "absolute",
        // top: 0,
        // width: "100%"
    }
});
