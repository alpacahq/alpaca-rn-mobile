import React, { Component } from 'react'
import {
    View,
    Text,
    FlatList
} from 'react-native'
import { connect } from 'react-redux'
import _ from 'lodash'

import OrdersActions from '../../Redux/OrdersRedux'
import {
    ApplicationStyles,
    Images,
    Colors,
    Fonts
} from '../../Themes'
import { size } from '../../Util/Helper'
import Button from '../../Components/Button'
import NavigationIcon from '../../Components/NavigationIcon'

class CancelOrderScreen extends Component {

    state = {
        condition: 'CANCEL_ORDER',
        openOrders: []
    }

    componentDidMount() {
        this.setState({ openOrders: this.props.openOrders })

        const condition = this.props.route.params?.condition;
        this.props.navigation.setOptions({
            headerLeft: () => (
                condition === 'CANCEL_ORDER_SUCCESS' ?
                null :
                (
                    <NavigationIcon
                        onPress={() => this.props.navigation.pop()}
                        source={Images.back}
                    />
                )
            ),
        })
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.cancelingOrder && !nextProps.cancelingOrder) {
            this.setState({ condition: 'CANCEL_ORDER_SUCCESS' })
            this.props.navigation.setParams({ condition: 'CANCEL_ORDER_SUCCESS' })
        }
    }

    /**
     * Cancel open orders
     */
    cancelOrders = () => {
        const {
            openOrders,
            cancelOrder,
        } = this.props

        openOrders.map(item => {
            cancelOrder(item.id)
        })
    }

    renderContent = () => {
        const { condition, openOrders } = this.state
        const { cancelingOrder } = this.props

        let content
        if (condition === 'CANCEL_ORDER') {
            content = (
                <View style={styles.container}>
                    <Text style={styles.h1}>
                        Cancelling{"\n"}
                        All Open Orders
                    </Text>
                    <Text style={[styles.h3, { marginTop: size(20) }]}>
                        You are cancelling all open orders.{"\n\n"}
                        You currently have {openOrders.length} open orders.
                    </Text>
                    <Button
                        style={styles.button}
                        label="Click to Submit"
                        color={Colors.COLOR_NAV_HEADER}
                        labelColor={Colors.BLACK}
                        height={50}
                        isLoading={cancelingOrder}
                        onPress={this.cancelOrders}
                    />
                </View>
            )
        } else if (condition === 'CANCEL_ORDER_SUCCESS') {
            content = (
                <View style={styles.container}>
                    <Text style={styles.label}>
                        Order Cancellation Submitted
                    </Text>
                    <FlatList
                        style={styles.list}
                        data={openOrders}
                        keyExtractor={item => item.id}
                        renderItem={({ item, index }) => {
                            return (
                                <Text style={{ color: 'white' }}>
                                    {`DELETE/v1/orders/{${item.id}}`}
                                </Text>
                            )
                        }}
                    />
                    <Button
                        style={styles.button}
                        label="Done"
                        color={Colors.COLOR_NAV_HEADER}
                        labelColor={Colors.BLACK}
                        height={50}
                        onPress={() => this.props.navigation.pop()}
                    />
                </View>
            )
        }

        return content
    }

    render() {
        return (
            <View style={styles.mainContainer}>
                {this.renderContent()}
            </View>
        )
    }
}

const styles = {
    ...ApplicationStyles.screen,
    h1: {
        ...Fonts.style.h1,
        color: Colors.BLACK,
    },
    h3: {
        ...Fonts.style.h3,
        color: Colors.BLACK,
    },
    button: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
    list: {
        flex: 1,
        marginTop: size(20),
        marginBottom: size(70),
        paddingLeft: 5,
        paddingTop: 10,
        backgroundColor: Colors.COLOR_CORE_TEXT
    },
}

const mapStateToProps = (state) => {
    return {
        cancelingOrder: state.orders.cancelingOrder,
        openOrders: state.orders.openOrders,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        cancelOrder: order_id => dispatch(OrdersActions.cancelOrderAttempt(order_id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CancelOrderScreen)