import PropTypes from 'prop-types'
import React from 'react'
import {
    ActivityIndicator,
    TouchableHighlight,
    View,
    Text,
    ViewPropTypes
} from 'react-native'

import { Colors, Fonts } from '../Themes'

// NOTE
// button is flex so always full width

const Button = ({
    style,
    type,
    height,
    color,
    labelColor,
    borderRadius,
    label,
    disabled,
    isLoading,
    activeOpacity,
    onPress
}) => {
    const renderLabel = () => (
        <View style={{ flex: 1 }}>
            <Text
                style={[
                    styles.label,
                    { color: type === 'fill' ? labelColor || 'white' : color }
                ]}
            >
                {label}
            </Text>
        </View>
    )

    const renderLoading = () => (
        <ActivityIndicator
            color={type === 'fill' ? labelColor || 'white' : color}
            size="small"
        />
    )

    const Container = disabled ? View : TouchableHighlight

    return (
        <View style={style}>
            <Container
                style={[
                    {
                        opacity: disabled ? (isLoading ? 0.8 : 0.5) : 1,
                        height
                    }
                ]}
                activeOpacity={activeOpacity}
                underlayColor="transparent"
                onPress={onPress}
            >
                <View
                    style={[
                        styles.button,
                        {
                            backgroundColor:
                                type === 'fill' ? color : 'transparent',
                            borderWidth: type === 'outline' ? 1 : 0,
                            borderColor: color,
                            borderRadius
                        }
                    ]}
                >
                    {isLoading ? renderLoading() : label ? renderLabel() : null}
                </View>
            </Container>
        </View>
    )
}

Button.propTypes = {
    type: PropTypes.oneOf(['fill', 'outline']).isRequired,
    style: ViewPropTypes.style,
    height: PropTypes.number,
    color: PropTypes.string,
    labelColor: PropTypes.string,
    borderRadius: PropTypes.number,
    label: PropTypes.string,
    disabled: PropTypes.bool,
    isLoading: PropTypes.bool,
    activeOpacity: PropTypes.number,
    onPress: PropTypes.func
}

Button.defaultProps = {
    type: 'fill',
    style: null,
    height: 64,
    color: Colors.RED,
    labelColor: null,
    borderRadius: 5,
    label: null,
    disabled: false,
    isLoading: false,
    activeOpacity: 0.9
}

const styles = {
    button: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    label: {
        ...Fonts.style.h3,
        fontFamily: Fonts.type.bold,
        color: Colors.WHITE,
        textAlign: 'center',
        paddingLeft: 5,
        paddingRight: 5,
        paddingBottom: 2
    }
}

export default Button
