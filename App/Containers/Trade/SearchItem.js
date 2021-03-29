import React, { Component } from 'react'
import { View, Text, TouchableOpacity, ViewPropTypes } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import AssetsActions from '../../Redux/AssetsRedux'
import { ApplicationStyles, Colors, Fonts } from '../../Themes'
import { convert, formatValue, size } from '../../Util/Helper'

class SearchItem extends Component {
    render() {
        const { item, isLargeStyle, style, onPress, assets } = this.props
        let currentStockPrice = 0,
            preClosePrice = 0
        let priceDif = 0,
            percentage = 0
        let plStyle = styles.upText
        const symbolStyle = isLargeStyle ? styles.h1 : styles.h2
        const stockPriceStyle = isLargeStyle ? styles.h2 : styles.h3

        try {
            if (assets) {
                assets.map((assetItem) => {
                    if (assetItem.symbol === item.symbol) {
                        currentStockPrice = assetItem.todayBar.o
                        preClosePrice = assetItem.preBar.c
                        priceDif = currentStockPrice - preClosePrice
                        percentage = convert(
                            ((priceDif / preClosePrice) * 100).toFixed(2),
                            true
                        )
                        plStyle =
                            priceDif >= 0 ? styles.upText : styles.downText
                    }
                })
            }

            return (
                <TouchableOpacity
                    style={style}
                    activeOpacity={0.9}
                    onPress={onPress}
                >
                    <View style={styles.rowContainer}>
                        <View style={{ alignSelf: 'center' }}>
                            <Text style={symbolStyle}>{item.symbol}</Text>
                        </View>
                        <View style={styles.valueContainer}>
                            <Text style={stockPriceStyle}>
                                ${formatValue(currentStockPrice)}
                            </Text>
                            <Text style={plStyle}>
                                {`${convert(priceDif)} (${percentage})`}
                            </Text>
                        </View>
                        <View style={styles.separator} />
                    </View>
                </TouchableOpacity>
            )
        } catch (e) {
            return null
        }
    }
}

SearchItem.propTypes = {
    style: ViewPropTypes.style,
    item: PropTypes.object.isRequired,
    symbolStyle: PropTypes.object,
    onPress: PropTypes.func,
    isLargeStyle: PropTypes.bool
}

const styles = {
    ...ApplicationStyles.screen,
    h1: {
        ...Fonts.style.h1,
        color: Colors.BLACK
    },
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
        height: size(50),
        marginBottom: 10
    },
    valueContainer: {
        position: 'absolute',
        right: 0,
        top: 0,
        alignItems: 'flex-end'
    }
}

const mapStateToProps = (state) => ({
    assets: state.assets.assets
})

const mapDispatchToProps = (dispatch) => {
    return {
        getBars: (timeframe, symbols, day) =>
            dispatch(AssetsActions.getBarsAttempt(timeframe, symbols, day))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchItem)
