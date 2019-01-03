import React, { Component } from 'react'
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Easing,
  TouchableHighlight
} from 'react-native'
import Drawer from 'react-native-drawer-menu'

export default class drawer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      disabled: false
    }
    this.toggle = this.toggle.bind(this)
  }
  toggle () {
    this.setState({
      disabled: !this.state.disabled
    })
  }
  render () {
    // prepare your drawer content
    var drawerContent = (
      <View style={styles.drawerContent}>
        <View style={styles.leftTop} />
        <View style={styles.leftBottom}>
          <View>
            <Text>Drawer Content</Text>
          </View>
        </View>
      </View>
    )
    // customize drawer's style (Optional)
    var customStyles = {
      drawer: {
        shadowColor: '#000',
        shadowOpacity: 0.4,
        shadowRadius: 10
      },
      mask: {}, // style of mask if it is enabled
      main: {} // style of main board
    }
    return (
      <Drawer
        style={styles.container}
        openDrawer={this.state.disabled}
        drawerWidth={300}
        drawerContent={drawerContent}
        type={Drawer.types.Overlay}
        customStyles={{ drawer: styles.drawer }}
        drawerPosition={Drawer.positions.Right}
        onDrawerOpen={() => {}}
        onDrawerClose={() => {}}
        easingFunc={Easing.ease}
      >
        <View style={styles.content}>
          <Text>{Object.values(Drawer.positions).join(' ')}</Text>
          <Text>{Object.values(Drawer.types).join(' ')}</Text>
        </View>
      </Drawer>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  drawer: {
    shadowColor: '#000',
    shadowOpacity: 0.4,
    shadowRadius: 10
  },
  main: {
    position: 'absolute',
    backgroundColor: '#2ba'
  },
  head: {
    height: 60,
    marginBottom: 200,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    backgroundColor: '#6a0d45'
  },
  content: {
    flex: 1,
    alignItems: 'center',
    alignSelf: 'stretch',
    backgroundColor: '#e3b8cb'
  },
  drawerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  leftTop: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'stretch',
    alignSelf: 'stretch',
    backgroundColor: '#8ad8dd'
  },
  leftBottom: {
    flex: 2,
    justifyContent: 'space-around',
    alignItems: 'center',
    alignSelf: 'stretch',
    backgroundColor: '#f0f0f0'
  },
  leftDrawer: {
    borderRightWidth: 4,
    borderRightColor: '#5b585a'
  },
  rightDrawer: {
    borderLeftWidth: 4,
    borderLeftColor: '#5b585a'
  },
  btn1: {
    marginTop: 10,
    padding: 10,
    overflow: 'hidden',
    borderRadius: 5,
    backgroundColor: '#f06355'
  },
  btn2: {
    marginTop: 10,
    padding: 10,
    overflow: 'hidden',
    borderRadius: 5,
    backgroundColor: '#37b9d5'
  },
  btnText: {
    fontSize: 14,
    color: '#f0f0f0'
  }
})
