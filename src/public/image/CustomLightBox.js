import React from 'react'
import { Image, ScrollView } from 'react-native'
import { Prolar } from '../../prolar/Prolar'

import Lightbox from 'react-native-lightbox'

export class CustomLightBox extends React.Component {
  render () {
    return (
      <ScrollView style={styles.container}>
        <Lightbox underlayColor='white'>
          <Image
            style={styles.contain}
            resizeMode='contain'
            source={{
              uri: this.props.imageUrl
            }}
          />
        </Lightbox>
      </ScrollView>
    )
  }
}

const styles = {
  container: {
    paddingHorizontal: Prolar.size.unit * 10,
    width: '100%',
    height: '100%'
  },
  contain: {
    flex: 1,
    height: 150
  }
}

export default CustomLightBox
