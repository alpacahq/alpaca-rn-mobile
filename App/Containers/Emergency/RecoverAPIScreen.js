import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import _ from 'lodash'

import AccountActions from '../../Redux/AccountRedux'
import { ApplicationStyles, Images, Colors, Fonts } from '../../Themes'
import { size } from '../../Util/Helper'
import Button from '../../Components/Button'
import NavigationIcon from '../../Components/NavigationIcon'

class RecoverAPIScreen extends Component {
    state = {
        condition: 'RECOVERING_API'
    }

    componentDidMount() {
        this.setState({
            condition: this.props.account.trade_suspended_by_user
                ? 'RECOVERING_API'
                : 'SUSPENDING_API'
        })

        const condition = this.props.route.params?.condition
        this.props.navigation.setOptions({
            headerLeft: () =>
                condition === 'RECOVERING_API_SUCCESS' ? null : (
                    <NavigationIcon
                        onPress={() => this.props.navigation.pop()}
                        source={Images.back}
                    />
                )
        })
    }

    componentWillReceiveProps(nextProps) {
        if (
            this.props.account.trade_suspended_by_user &&
            !nextProps.account.trade_suspended_by_user
        ) {
            this.setState({ condition: 'RECOVERING_API_SUCCESS' })
            this.props.navigation.setParams({
                condition: 'RECOVERING_API_SUCCESS'
            })
        }
    }

    /**
     * Recover trade
     */
    recoverTrade = (configureAccount) => {
        let params = {
            suspend_trade: false
        }
        configureAccount(params)
    }

    renderContent = () => {
        const { condition } = this.state
        const { configureAccount, fetching } = this.props

        let content
        if (condition === 'RECOVERING_API') {
            content = (
                <View style={styles.container}>
                    <Text style={styles.h1}>Recovering Your API</Text>
                    <Text style={[styles.h3, { marginTop: size(20) }]}>
                        You are recovering your API. This will resume new orders
                        to come in to the system.
                    </Text>
                    <Button
                        style={styles.button}
                        label="Click to Submit"
                        color={Colors.COLOR_NAV_HEADER}
                        labelColor={Colors.BLACK}
                        height={50}
                        isLoading={fetching}
                        onPress={() => this.recoverTrade(configureAccount)}
                    />
                </View>
            )
        } else if (condition === 'RECOVERING_API_SUCCESS') {
            content = (
                <View style={styles.container}>
                    <Text style={styles.label}>API Recovery Submitted</Text>
                    <Text style={[styles.h3, { marginTop: size(66) }]}>
                        Now, you have recovered your API.
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
        return <View style={styles.mainContainer}>{this.renderContent()}</View>
    }
}

const styles = {
    ...ApplicationStyles.screen,
    h1: {
        ...Fonts.style.h1,
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
        right: 0
    }
}

const mapStateToProps = (state) => {
    return {
        account: state.account.account,
        fetching: state.account.fetching
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        configureAccount: (data) =>
            dispatch(AccountActions.configureAccountAttempt(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecoverAPIScreen)
