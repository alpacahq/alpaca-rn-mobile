import React, { Component } from 'react'
import { View, Text } from 'react-native'
import PropTypes from 'prop-types'

import { ApplicationStyles, Colors, Fonts } from '../../Themes'
import { capitalize } from '../../Util/Helper'

const KeyValueItem = ({ keys, value }) => {
    return (
        <View style={styles.ordersRow}>
            <Text style={styles.h3}>{keys}</Text>
            <Text style={[styles.h3, { color: Colors.BLACK }]}>
                {value ? capitalize(value) : '-'}
            </Text>
        </View>
    )
}

KeyValueItem.propTypes = {
    keys: PropTypes.string,
    value: PropTypes.string
}

const styles = {
    ...ApplicationStyles.screen,
    h2: {
        ...Fonts.style.h2,
        color: Colors.BLACK
    },
    h3: {
        ...Fonts.style.h3,
        color: Colors.COLOR_CORE_TEXT
    },
    ordersRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5
    }
}

export default KeyValueItem
