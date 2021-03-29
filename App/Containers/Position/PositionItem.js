import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'

import { ApplicationStyles, Colors, Fonts } from '../../Themes'
import { convert, formatValue, size } from '../../Util/Helper'

class PositionItem extends Component {
    render() {
        const { position, onPress } = this.props
        // console.log('position item:', position)
        const mainValue = `${position.qty}@${formatValue(
            position.avg_entry_price
        )}`
        const plStyle =
            position.unrealized_intraday_pl >= 0
                ? styles.upText
                : styles.downText
        const percentValue = (position.unrealized_intraday_plpc * 100).toFixed(
            2
        )

        return (
            <TouchableOpacity
                style={{ marginBottom: size(10) }}
                activeOpacity={0.9}
                onPress={onPress}
            >
                <View style={styles.rowContainer}>
                    <Text style={styles.h2}>{position.symbol}</Text>
                    <Text style={plStyle}>
                        {convert(position.unrealized_intraday_pl)}
                    </Text>
                </View>
                <View style={styles.rowContainer}>
                    <Text style={styles.h3}>{mainValue}</Text>
                    <Text style={plStyle}>{convert(percentValue, true)}</Text>
                </View>
                <View style={styles.separator} />
            </TouchableOpacity>
        )
    }
}

PositionItem.propTypes = {
    position: PropTypes.object.isRequired
}

const styles = {
    ...ApplicationStyles.screen,
    h2: {
        ...Fonts.style.h2,
        color: Colors.BLACK
    },
    h3: {
        ...Fonts.style.h3,
        color: Colors.BLACK
    },
    upText: {
        ...Fonts.style.h3,
        color: Colors.COLOR_GREEN
    },
    downText: {
        ...Fonts.style.h3,
        color: Colors.COLOR_DARK_RED
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
}

export default PositionItem
