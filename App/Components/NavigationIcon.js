import React from 'react'
import PropTypes from 'prop-types'
import { Image, ViewPropTypes, TouchableOpacity } from 'react-native'

import { ApplicationStyles, Colors } from '../Themes'

const NavigationIcon = ({ style, iconStyle, source, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={style}>
            <Image
                style={[ApplicationStyles.screen.navIcon, iconStyle]}
                source={source}
            />
        </TouchableOpacity>
    )
}

NavigationIcon.propTypes = {
    onPress: PropTypes.func,
    style: ViewPropTypes.style,
    iconStyle: PropTypes.object,
    source: PropTypes.number.isRequired
}

export default NavigationIcon
