import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'

import AccountActions from '../../Redux/AccountRedux'
import OrdersActions from '../../Redux/OrdersRedux'
import PositionsActions from '../../Redux/PositionsRedux'
import AssetsActions from '../../Redux/AssetsRedux'
import { ApplicationStyles, Images, Colors, Metrics, Fonts } from '../../Themes'
import {
    convert,
    formatValue,
    getTodayStart,
    getTodayEnd,
    size
} from '../../Util/Helper'
import NavigationIcon from '../../Components/NavigationIcon'
import Loading from '../../Components/Loading'

class OverviewScreen extends Component {
    state = {
        positionUpCount: 0,
        positionUpSum: 0,
        positionDownSum: 0,
        positionDownCount: 0,
        mergeOrders: []
    }

    componentDidMount() {
        this.props.navigation.setOptions({
            headerLeft: null,
            headerRight: () => (
                <NavigationIcon
                    onPress={() => this.props.navigation.navigate('Search')}
                    source={Images.search}
                />
            )
        })
        this.props.getAssets() // Get assets
        this.getData()
        this.timer = setInterval(() => this.getData(false), 10000) // Refresh data every 10 seconds
    }

    async getData(showLoading = true) {
        const { getAccount, getOrders, getPositions } = this.props

        getAccount() // Get account info
        getOrders('closed', `after=${getTodayStart()}&until=${getTodayEnd()}`) // Get closed orders of today
        getOrders('open', '') // Get all open orders regardless of when they were submitted
        getPositions(showLoading) // Get positions
    }

    componentWillReceiveProps(nextProps) {
        const { orders, positions } = nextProps
        if (orders) {
            this.mergeOrders(orders)
        }

        if (positions) {
            this.filterPositions(positions)
        }
    }

    filterPositions = (source) => {
        let positionUpCount = 0
        let positionUpSum = 0
        let positionDownSum = 0
        let positionDownCount = 0

        source.forEach(function (el) {
            if (el.unrealized_intraday_pl >= 0) {
                positionUpCount++
                positionUpSum += parseFloat(el.unrealized_intraday_pl)
            } else {
                positionDownCount++
                positionDownSum += parseFloat(el.unrealized_intraday_pl)
            }
        })

        this.setState({
            positionUpCount,
            positionUpSum,
            positionDownCount,
            positionDownSum
        })
    }

    renderEmptyOrder() {
        return (
            <View>
                <View style={styles.ordersRow}>
                    <Text style={[styles.h3, { color: Colors.COLOR_GREEN }]}>
                        Filled
                    </Text>
                    <Text style={styles.h3}>0</Text>
                </View>
                <View style={styles.ordersRow}>
                    <Text style={[styles.h3, { color: Colors.COLOR_DARK_RED }]}>
                        Cancelled
                    </Text>
                    <Text style={styles.h3}>0</Text>
                </View>
                <View style={styles.ordersRow}>
                    <Text style={[styles.h3, { color: Colors.COLOR_GOLD }]}>
                        Pending
                    </Text>
                    <Text style={styles.h3}>0</Text>
                </View>
            </View>
        )
    }

    render() {
        const { account, fetching, openOrders, closedOrders } = this.props
        const {
            positionUpCount,
            positionUpSum,
            positionDownSum,
            positionDownCount
        } = this.state
        const positionSum = (positionUpSum + positionDownSum).toFixed(2)
        const positionSumStyle =
            positionSum >= 0 ? styles.upText : styles.downText
        const portfolioSumColor =
            positionSum >= 0 ? Colors.COLOR_GREEN : Colors.COLOR_DARK_RED

        return (
            <View style={styles.container}>
                <View style={styles.mainContainer}>
                    <Text style={styles.label}>Equity</Text>
                    <Text style={styles.h1}>
                        $
                        {account &&
                            account.equity &&
                            formatValue(account.equity)}
                    </Text>
                    {/* <Text style={[styles.h3, { color: portfolioSumColor }]}>
                        {convert(positionSum)}
                    </Text> */}

                    <Text style={[styles.label, { marginTop: 8 }]}>
                        Buying Power
                    </Text>
                    <Text style={styles.h2}>
                        $
                        {account &&
                            account.buying_power &&
                            formatValue(account.buying_power)}
                    </Text>

                    <View style={styles.section}>
                        <Text style={styles.label}>Positions</Text>
                        <View style={styles.positionsRow}>
                            <Text style={styles.upText}>Up</Text>
                            <Text
                                style={[styles.upText, { textAlign: 'center' }]}
                            >
                                {positionUpCount}
                            </Text>
                            <Text
                                style={[styles.upText, { textAlign: 'right' }]}
                            >
                                {convert(positionUpSum)}
                            </Text>
                        </View>
                        <View style={styles.positionsRow}>
                            <Text style={styles.downText}>Down</Text>
                            <Text
                                style={[
                                    styles.downText,
                                    { textAlign: 'center' }
                                ]}
                            >
                                {positionDownCount}
                            </Text>
                            <Text
                                style={[
                                    styles.downText,
                                    { textAlign: 'right' }
                                ]}
                            >
                                {convert(positionDownSum)}
                            </Text>
                        </View>
                        <View style={styles.separator} />
                        <View style={styles.positionsRow}>
                            <Text style={styles.upText}></Text>
                            <Text style={[styles.h3, { textAlign: 'center' }]}>
                                {positionUpCount + positionDownCount}
                            </Text>
                            <Text
                                style={[
                                    positionSumStyle,
                                    { textAlign: 'right' }
                                ]}
                            >
                                {convert(positionSum)}
                            </Text>
                        </View>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.label}>Orders Today</Text>
                        <View style={styles.ordersRow}>
                            <Text style={styles.h3}>Open</Text>
                            <Text style={styles.h3}>
                                {openOrders.length.toLocaleString()}
                            </Text>
                        </View>
                        <View style={styles.ordersRow}>
                            <Text style={styles.h3}>Closed</Text>
                            <Text style={styles.h3}>
                                {closedOrders.length.toLocaleString()}
                            </Text>
                        </View>
                        <View style={styles.separator} />
                        <View style={styles.ordersRow}>
                            <Text style={styles.h3}></Text>
                            <Text style={styles.h3}>
                                {(
                                    openOrders.length + closedOrders.length
                                ).toLocaleString()}
                            </Text>
                        </View>
                    </View>
                    <Text
                        style={[styles.label, { marginTop: 10 }]}
                        onPress={() =>
                            this.props.navigation.navigate('Disclosure')
                        }
                    >
                        Disclosures
                    </Text>
                </View>
                {fetching && <Loading />}
            </View>
        )
    }
}

const styles = {
    ...ApplicationStyles.screen,
    h1: {
        ...Fonts.style.h1,
        color: Colors.COLOR_CORE_TEXT
    },
    h2: {
        ...Fonts.style.h2,
        color: Colors.COLOR_CORE_TEXT
    },
    h3: {
        ...Fonts.style.h3,
        color: Colors.COLOR_CORE_TEXT
    },
    section: {
        marginTop: size(40)
    },
    upText: {
        ...Fonts.style.h3,
        color: Colors.COLOR_GREEN,
        flex: 1
    },
    downText: {
        ...Fonts.style.h3,
        color: Colors.COLOR_DARK_RED,
        flex: 1
    },
    positionsRow: {
        marginLeft: Metrics.baseMargin,
        flexDirection: 'row'
    },
    ordersRow: {
        marginLeft: Metrics.baseMargin,
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
}

const mapStateToProps = (state) => {
    return {
        account: state.account.account,
        openOrders: state.orders.openOrders,
        closedOrders: state.orders.closedOrders,
        positions: state.positions.positions,
        fetching: state.assets.fetching
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAccount: () => dispatch(AccountActions.getAccountAttempt()),
        getOrders: (status, params) =>
            dispatch(OrdersActions.getOrdersAttempt(status, params)),
        getPositions: (showLoading) =>
            dispatch(PositionsActions.getPositionsAttempt(showLoading)),
        getAssets: () => dispatch(AssetsActions.getAssetsAttempt())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OverviewScreen)
