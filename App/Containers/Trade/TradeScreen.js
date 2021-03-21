import React, { Component } from 'react'
import {
    View,
    Text,
    TextInput,
    ScrollView,
    TouchableWithoutFeedback,
} from 'react-native'
import { connect } from 'react-redux'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import dismissKeyboard from 'react-native-dismiss-keyboard'
import CheckBox from 'react-native-check-box'

import {
    ApplicationStyles,
    Images,
    Colors,
    Fonts
} from '../../Themes'
import { size, showAlertMessage } from '../../Util/Helper'
import OrdersActions from '../../Redux/OrdersRedux'
import NavigationIcon from '../../Components/NavigationIcon'
import Button from '../../Components/Button'
import SearchItem from './SearchItem';
import TradeItem from './TradeItem';

class TradeScreen extends Component {

    state = {
        shares: '',
        limitPrice: '',
        stopPrice: '',
        side: '',
        type: '',
        timeInForce: '',
        submitted: false,
        stopPriceEditable: false,
        limitPriceEditable: false,
        isChecked: false,
        sideItems: [
            {
                label: 'Buy',
                value: 'buy',
            },
            {
                label: 'Sell',
                value: 'sell',
            },
        ],
        typeItems: [
            {
                label: 'Market',
                value: 'market',
            },
            {
                label: 'Limit',
                value: 'limit',
            },
            {
                label: 'Stop',
                value: 'stop',
            },
            {
                label: 'Stop limit',
                value: 'stop_limit',
            },
        ],
        timeInForceItems: [
            {
                label: 'Day',
                value: 'day',
            },
            {
                label: 'Gtc',
                value: 'gtc',
            },
            {
                label: 'Opg',
                value: 'opg',
            },
        ]
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

    reviewOrder = (value) => {
        const { shares, limitPrice, stopPrice, side, type, timeInForce } = this.state
        const isExtenedHoursEnabled = type === 'limit' && timeInForce === 'day';

        let orderData = {
            symbol: value.symbol,
            qty: shares,
            type,
            time_in_force: timeInForce,
            side,
            extended_hours: isExtenedHoursEnabled
        }

        if (limitPrice) {
            orderData = {
                ...orderData,
                limit_price: limitPrice,
            }
        }
        if (stopPrice) {
            orderData = {
                ...orderData,
                stop_price: stopPrice
            }
        }
        console.log('updated value:', orderData)
        this.props.navigation.navigate('TradeReview', {
            value,
            orderData
        })
    }

    onTypeChanged = (value) => {
        this.setState({
            type: value,
            limitPrice: '',
            stopPrice: ''
        })
    }

    updateExtendedHours = () => {
        if (this.state.type === 'limit' && this.state.timeInForce === 'day') {
            this.setState({ type: '', timeInForce: '' });
        } else {
            this.setState({ type: 'limit', timeInForce: 'day' });
        }
    }

    renderBody = (value) => {
        const { postingOrder } = this.props
        const {
            type, side, timeInForce,
            shares, limitPrice, stopPrice,
            sideItems, typeItems, timeInForceItems,
            stopPriceEditable, limitPriceEditable,
            submitted
        } = this.state
        let _stopPriceEditable = stopPriceEditable
        let _limitPriceEditable = limitPriceEditable

        let disabledSubmitBtn = !type
        if (type === 'market') {
            disabledSubmitBtn = !side || !timeInForce || !shares
            _stopPriceEditable = false
            _limitPriceEditable = false
        } else if (type === 'limit') {
            disabledSubmitBtn = !side || !timeInForce || !shares || !limitPrice
            _limitPriceEditable = true
            _stopPriceEditable = false
        } else if (type === 'stop') {
            disabledSubmitBtn = !side || !timeInForce || !shares || !stopPrice
            _stopPriceEditable = true
            _limitPriceEditable = false
        } else if (type === 'stop_limit') {
            disabledSubmitBtn = !side || !timeInForce || !shares || !stopPrice || !limitPrice
            _stopPriceEditable = true
            _limitPriceEditable = true
        }

        let inputTxtStyle = {
            ...styles.inputText,
            color: submitted ? Colors.COLOR_GRAY : Colors.COLOR_GOLD
        }

        const isExtenedHoursEnabled = type === 'limit' && timeInForce === 'day';

        return (
            <View style={styles.container}>
                <KeyboardAwareScrollView
                    contentContainerStyle={{ flex: 1 }}
                    keyboardShouldPersistTaps="handled"
                    extraScrollHeight={100}
                    enableOnAndroid={false}
                >
                    <TradeItem
                        label='Side'
                        items={sideItems}
                        disabled={submitted}
                        onValueChange={value => this.setState({ side: value })}
                    />
                    <View style={styles.rowContainer}>
                        <Text style={styles.label}>
                            Shares
                        </Text>
                        <TextInput
                            style={inputTxtStyle}
                            onChangeText={(text) => this.setState({ shares: text })}
                            value={shares}
                            keyboardType='numeric'
                            autoCorrect={false}
                            underlineColorAndroid='transparent'
                            editable={!submitted}
                            maxLength={20}
                        />
                    </View>
                    <TradeItem
                        label='Type'
                        items={typeItems}
                        selectedItem={type}
                        disabled={submitted}
                        onValueChange={value => this.onTypeChanged(value)}
                    />
                    <TradeItem
                        label='Time in Force'
                        items={timeInForceItems}
                        selectedItem={timeInForce}
                        disabled={submitted}
                        onValueChange={value => this.setState({ timeInForce: value })}
                    />
                    <View style={styles.rowContainer}>
                        <Text style={styles.label}>
                            Limit Price
                        </Text>
                        <TextInput
                            style={inputTxtStyle}
                            onChangeText={(text) => this.setState({ limitPrice: text })}
                            value={limitPrice}
                            keyboardType='numeric'
                            autoCorrect={false}
                            underlineColorAndroid='transparent'
                            editable={_limitPriceEditable}
                            maxLength={20}
                        />
                    </View>
                    <View style={styles.rowContainer}>
                        <Text style={styles.label}>
                            Stop Price
                        </Text>
                        <TextInput
                            style={inputTxtStyle}
                            onChangeText={(text) => this.setState({ stopPrice: text })}
                            value={stopPrice}
                            keyboardType='numeric'
                            autoCorrect={false}
                            underlineColorAndroid='transparent'
                            editable={_stopPriceEditable}
                            maxLength={20}
                        />
                    </View>
                    <CheckBox
                        style={{ marginTop: 10 }}
                        rightText={"Extended Hours"}
                        rightTextStyle={styles.label}
                        isChecked={isExtenedHoursEnabled}
                        checkBoxColor={Colors.COLOR_GOLD}
                        onClick={this.updateExtendedHours}
                    />
                    <Button
                        style={styles.button}
                        label="Review Your Order"
                        color={Colors.COLOR_NAV_HEADER}
                        labelColor={Colors.BLACK}
                        height={50}
                        isLoading={postingOrder}
                        disabled={disabledSubmitBtn}
                        onPress={() => this.reviewOrder(value)}
                    />
                </KeyboardAwareScrollView>
            </View>
        )
    }

    render() {
        const { navigation } = this.props
        const value = navigation.getParam('value')

        return (
            <TouchableWithoutFeedback onPress={() => dismissKeyboard()}>
                <View style={styles.mainContainer}>
                    <SearchItem
                        item={value}
                        isLargeStyle
                    />
                    {this.renderBody(value)}
                </View>
            </TouchableWithoutFeedback>
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
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 5
    },
    button: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
    value: {
        ...Fonts.style.h3,
        fontSize: size(19),
        color: Colors.COLOR_GOLD
    },
    jsonData: {
        flex: 1,
        marginTop: 10,
        marginBottom: size(60),
        paddingLeft: 5,
        backgroundColor: 'rgb(207, 207, 207)'
    },
    inputText: {
        width: size(130),
        height: size(40),
        borderBottomColor: Colors.COLOR_GOLD,
        borderBottomWidth: 1,
        color: Colors.COLOR_GOLD
    },
}

const mapStateToProps = (state) => {
    return {
        postingOrder: state.orders.postingOrder,
        orderResult: state.orders.orderResult,
        bars: state.assets.bars,
        preBars: state.assets.preBars,
        openOrders: state.orders.openOrders,
        positions: state.positions.positions
    }
}

const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(TradeScreen)
