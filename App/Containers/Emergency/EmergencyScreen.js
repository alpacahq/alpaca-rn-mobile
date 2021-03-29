import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import _ from 'lodash'
import AsyncStorage from '@react-native-async-storage/async-storage'

import OrdersActions from '../../Redux/OrdersRedux'
import AccountActions from '../../Redux/AccountRedux'
import { ApplicationStyles, Images, Colors, Fonts } from '../../Themes'
import { size } from '../../Util/Helper'
import Button from '../../Components/Button'
import NavigationIcon from '../../Components/NavigationIcon'

class EmergencyScreen extends Component {
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
    }

    logOut = async () => {
        await AsyncStorage.removeItem('accessToken')
        this.props.navigation.push('Setup', { operation: 'logout' })
    }

    render() {
        const { openOrders, positions, account } = this.props
        const suspendStatus = account.trade_suspended_by_user

        return (
            <View style={styles.container}>
                <View style={styles.mainContainer}>
                    <Button
                        style={styles.button}
                        color={suspendStatus ? Colors.COLOR_GREEN : Colors.RED}
                        label={suspendStatus ? 'RECOVER API' : 'SUSPEND API'}
                        onPress={() =>
                            this.props.navigation.navigate(
                                suspendStatus ? 'RecoverAPI' : 'SuspendAPI'
                            )
                        }
                    />
                    <Text style={styles.label}>
                        Open Positions: {positions.length}
                    </Text>
                    <Button
                        style={styles.button}
                        label="LIQUIDATE ALL"
                        disabled={positions.length === 0}
                        onPress={() =>
                            this.props.navigation.navigate('Liquidation')
                        }
                    />
                    <Text style={styles.label}>
                        Open Orders: {openOrders.length}
                    </Text>
                    <Button
                        style={styles.button}
                        label="CANCEL ALL"
                        disabled={openOrders.length === 0}
                        onPress={() =>
                            this.props.navigation.navigate('CancelOrder')
                        }
                    />
                    <Button
                        style={styles.button}
                        label="LOG OUT"
                        onPress={this.logOut}
                    />
                    <Text
                        style={[styles.label, { marginTop: size(30) }]}
                        onPress={() =>
                            this.props.navigation.navigate('Disclosure')
                        }
                    >
                        Disclosures
                    </Text>
                </View>
            </View>
        )
    }
}

const styles = {
    ...ApplicationStyles.screen,
    mainContainer: {
        flex: 1,
        padding: size(75)
    },
    label: {
        ...Fonts.style.h3,
        color: Colors.COLOR_GRAY,
        marginBottom: size(8)
    },
    button: {
        marginBottom: size(25)
    }
}

const mapStateToProps = (state) => {
    return {
        account: state.account.account,
        cancelingOrder: state.orders.cancelingOrder,
        postingOrder: state.orders.postingOrder,
        fetching: state.account.fetching,
        openOrders: state.orders.openOrders,
        positions: state.positions.positions
    }
}

const mapDispatchToProps = (dispatch) => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(EmergencyScreen)
