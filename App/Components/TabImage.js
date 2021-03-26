import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Image, ViewPropTypes } from 'react-native'

import { Colors, Metrics } from '../Themes'

const TabImage = ({ style, source, isSelected }) => {
    const updatedStyle = {
        width: Metrics.images.medium,
        height: Metrics.images.medium,
        tintColor: isSelected ? Colors.COLOR_GOLD : Colors.COLOR_GRAY,
        ...style
    }
    // console.log('=======', updatedStyle)

    return <Image style={updatedStyle} source={source} />
}

TabImage.propTypes = {
    style: ViewPropTypes.style,
    source: PropTypes.number.isRequired,
    isSelected: PropTypes.bool
}

export default TabImage
