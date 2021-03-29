import PropTypes from 'prop-types'
import React from 'react'
import { View, ViewPropTypes } from 'react-native'

import { Colors } from '../Themes'

var Spinner = require('react-native-spinkit')

const Loading = ({ color, style }) => {
    return (
        <View style={[styles.container, style]}>
            <Spinner color={color} isVisible={true} type={'Bounce'} />
        </View>
    )
}

Loading.propTypes = {
    style: ViewPropTypes.style,
    color: PropTypes.string
}

Loading.defaultProps = {
    style: null,
    color: Colors.COLOR_GOLD
}

const styles = {
    container: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.9)'
    }
}

export default Loading
