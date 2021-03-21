import React, { Component } from 'react'
import {
    View,
    Text,
} from 'react-native'
import { connect } from 'react-redux'
import _ from 'lodash'

import AccountActions from '../../Redux/AccountRedux'
import {
    ApplicationStyles,
    Images,
    Colors,
    Fonts
} from '../../Themes'
import { size } from '../../Util/Helper'
import Button from '../../Components/Button'
import NavigationIcon from '../../Components/NavigationIcon'

class SuspendAPIScreen extends Component {

    state = {
        condition: 'SUSPENDING_API'
    }

    componentDidMount() {
        this.setState({
            condition: this.props.account.trade_suspended_by_user ? 'RECOVERING_API' : 'SUSPENDING_API'
        })

        const condition = this.props.route.params?.condition;
        this.props.navigation.setOptions({
            headerLeft: () => (
                condition === 'SUSPENDING_API_SUCCESS' ?
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
        if (!this.props.account.trade_suspended_by_user && nextProps.account.trade_suspended_by_user) {
            this.setState({ condition: 'SUSPENDING_API_SUCCESS' })
            this.props.navigation.setParams({ condition: 'SUSPENDING_API_SUCCESS' })
        }
    }

    /**
     * Suspend trade
     */
    suspendTrade = (configureAccount) => {
        let params = {
            "suspend_trade": true
        }
        configureAccount(params)
    }

    renderContent = () => {
        const { condition } = this.state
        const {
            configureAccount,
            fetching
        } = this.props

        let content
        if (condition === 'SUSPENDING_API') {
            content = (
                <View style={styles.container}>
                    <Text style={styles.h1}>
                        Suspending Your API
                    </Text>
                    <Text style={[styles.h3, { marginTop: size(20) }]}>
                        You are suspending your API. This will stop any new orders to come in to the system.{"\n\n"}
                        After suspending your API, you can recover it by clicking “RECOVER API” on Emergency tab.
                    </Text>
                    <Button
                        style={styles.button}
                        label="Click to Submit"
                        color={Colors.COLOR_NAV_HEADER}
                        labelColor={Colors.BLACK}
                        height={50}
                        isLoading={fetching}
                        onPress={() => this.suspendTrade(configureAccount)}
                    />
                </View>
            )
        } else if (condition === 'SUSPENDING_API_SUCCESS') {
            content = (
                <View style={styles.container}>
                    <Text style={styles.label}>
                        API Suspension Submitted
                    </Text>
                    <Text style={[styles.h3, { marginTop: 66 }]}>
                        Now, you have suspended your API.{"\n\n"}
                        In order to recover your API, go to Emergency tab then click “RECOVER API”.
                    </Text>
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
}

const mapStateToProps = (state) => {
    return {
        account: state.account.account,
        fetching: state.account.fetching,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        configureAccount: data => dispatch(AccountActions.configureAccountAttempt(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SuspendAPIScreen)