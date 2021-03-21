import React, { Component } from 'react'
import {
    View,
    Text,
    TextInput,
    ScrollView
} from 'react-native'
import { connect } from 'react-redux'

import {
    ApplicationStyles,
    Images,
    Colors,
    Fonts
} from '../../Themes'
import OrdersActions from '../../Redux/OrdersRedux'
import NavigationIcon from '../../Components/NavigationIcon'
import Button from '../../Components/Button'
import SearchItem from './SearchItem'
import KeyValueItem from './KeyValueItem'
import { formatValue, size } from '../../Util/Helper'

class TradeReviewScreen extends Component {

    state = {
        submitted: false,
    }

    componentDidMount() {
        const submitted = this.props.route.params?.submitted;
        this.props.navigation.setOptions({
            headerLeft: () => (
                submitted ?
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
        if (this.props.postingOrder && !nextProps.postingOrder && nextProps.orderResult) {
            this.setState({
                submitted: true,
            })
            this.props.navigation.setParams({ submitted: true })
        }
    }

    renderBody = (value, orderData) => {
        const { orderResult, postingOrder, postOrder } = this.props
        const { submitted } = this.state

        let limitPrice = orderData.limit_price ? `$${formatValue(orderData.limit_price)}` : '-'
        let stopPrice = orderData.stop_price ? `$${formatValue(orderData.stop_price)}` : '-'
        let content
        if (submitted) {
            content = (
                <View style={{ flex: 1 }}>
                    <Text style={styles.label}>
                        Order Submitted
                    </Text>
                    <ScrollView style={styles.jsonData}>
                        <Text style={{ color: 'white' }}>
                            {JSON.stringify(orderResult, undefined, 4)}
                        </Text>
                    </ScrollView>
                    <Button
                        style={styles.button}
                        label="Done"
                        color={Colors.COLOR_NAV_HEADER}
                        labelColor={Colors.BLACK}
                        height={50}
                        onPress={() => this.props.navigation.pop(3)}
                    />
                </View>
            )
        } else {
            content = (
                <View style={{ flex: 1 }}>
                    <SearchItem
                        style={{ marginBottom: size(45) }}
                        item={value}
                        isLargeStyle
                    />
                    <KeyValueItem keys='Side' value={orderData.side} />
                    <KeyValueItem keys='Shares' value={orderData.qty} />
                    <KeyValueItem keys='Type' value={orderData.type} />
                    <KeyValueItem keys='Time in Force' value={orderData.time_in_force} />
                    <KeyValueItem keys='Limit Price' value={limitPrice} />
                    <KeyValueItem keys='Stop Price' value={stopPrice} />
                    <KeyValueItem keys='Extended Hours' value={orderData.extended_hours.toString()} />
                    <Button
                        style={styles.button}
                        label="Click to Submit"
                        color={Colors.COLOR_NAV_HEADER}
                        labelColor={Colors.BLACK}
                        height={50}
                        isLoading={postingOrder}
                        onPress={() => postOrder(orderData)}
                    />
                </View>
            )
        }

        return content
    }

    render() {
        const { navigation } = this.props
        const value = navigation.getParam('value')
        const orderData = navigation.getParam('orderData')

        return (
            <View style={styles.mainContainer}>
                {this.renderBody(value, orderData)}
            </View>
        )
    }
}

const styles = {
    ...ApplicationStyles.screen,
    container: {
        ...ApplicationStyles.screen.container,
        marginTop: size(30)
    },
    h2: {
        ...Fonts.style.h2,
        color: Colors.BLACK
    },
    h3: {
        ...Fonts.style.h3,
        color: Colors.BLACK
    },
    button: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
    jsonData: {
        flex: 1,
        marginTop: size(20),
        marginBottom: size(70),
        paddingLeft: 5,
        backgroundColor: Colors.COLOR_CORE_TEXT
    },
    orderDone: {
        position: 'absolute',
        top: 0,
        bottom: size(50),
        left: 0,
        right: 0,
    },
}

const mapStateToProps = (state) => {
    return {
        postingOrder: state.orders.postingOrder,
        orderResult: state.orders.orderResult,
    }
}

const mapDispatchToProps = (dispatch) => ({
    postOrder: data => dispatch(OrdersActions.postOrderAttempt(data, 'single')),
})

export default connect(mapStateToProps, mapDispatchToProps)(TradeReviewScreen)
