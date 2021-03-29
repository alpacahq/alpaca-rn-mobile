import React, { Component } from 'react'
import { View, Text, TextInput, StyleSheet, Linking } from 'react-native'
import { connect } from 'react-redux'
import RNPickerSelect from 'react-native-picker-select'
import CheckBox from 'react-native-check-box'
import AsyncStorage from '@react-native-async-storage/async-storage'

import AppActions from '../../Redux/AppRedux'
import { ApplicationStyles, Colors, Fonts } from '../../Themes'
import { size } from '../../Util/Helper'
import Button from '../../Components/Button'

class SetupScreen extends Component {
    constructor(props) {
        super(props)

        this.inputRefs = {}
        this.state = {
            saveApiKey: false,
            apiKey: '',
            secretKey: '',
            baseUrl: '',
            baseUrlItems: [
                {
                    label: 'https://api.alpaca.markets/',
                    value: 'https://api.alpaca.markets/'
                },
                {
                    label: 'https://paper-api.alpaca.markets/',
                    value: 'https://paper-api.alpaca.markets/'
                }
            ]
        }
    }

    async componentDidMount() {
        let apiKey = ''
        let secretKey = ''
        let baseUrl = ''
        let saveApiKey = false
        try {
            apiKey = await AsyncStorage.getItem('apiKey')
            secretKey = await AsyncStorage.getItem('secretKey')
            baseUrl = await AsyncStorage.getItem('baseUrl')
            saveApiKey = await AsyncStorage.getItem('saveApiKey')
            this.setState({
                apiKey,
                secretKey,
                baseUrl,
                saveApiKey: saveApiKey === '1'
            })
        } catch (error) {
            console.log(error.message)
        }
    }

    /**
     * Save user's inputs in local storage and
     * configure api with api key and base url
     */
    getStarted = () => {
        const { apiKey, secretKey, baseUrl, saveApiKey } = this.state

        var data = {
            apiKey,
            secretKey,
            baseUrl
        }

        if (saveApiKey) {
            AsyncStorage.setItem('apiKey', apiKey)
            AsyncStorage.setItem('secretKey', secretKey)
        } else {
            AsyncStorage.removeItem('apiKey')
            AsyncStorage.removeItem('secretKey')
        }
        AsyncStorage.setItem('baseUrl', baseUrl)
        AsyncStorage.setItem('saveApiKey', saveApiKey ? '1' : '0')

        this.props.appStartAttempt(data)
        this.props.navigation.navigate('Tab')
    }

    openURL = () => {
        const signUpUrl = 'https://app.alpaca.markets/signup'
        Linking.canOpenURL(signUpUrl).then((supported) => {
            if (supported) {
                Linking.openURL(signUpUrl)
            } else {
                console.log("Don't know how to open URI: " + signUpUrl)
            }
        })
    }

    render() {
        const {
            apiKey,
            secretKey,
            baseUrl,
            baseUrlItems,
            saveApiKey
        } = this.state

        return (
            <View style={styles.mainContainer}>
                <View style={styles.rowContainer}>
                    <Text style={styles.label}>APCA_API_KEY_ID</Text>
                    <TextInput
                        style={styles.inputText}
                        onChangeText={(text) => this.setState({ apiKey: text })}
                        value={apiKey}
                        autoCorrect={false}
                        underlineColorAndroid="transparent"
                        maxLength={100}
                    />
                </View>
                <View style={styles.rowContainer}>
                    <Text style={styles.label}>APCA_API_SECRET_KEY</Text>
                    <TextInput
                        style={styles.inputText}
                        onChangeText={(text) =>
                            this.setState({ secretKey: text })
                        }
                        value={secretKey}
                        autoCorrect={false}
                        underlineColorAndroid="transparent"
                        maxLength={100}
                    />
                </View>
                <View style={styles.rowContainer}>
                    <Text style={styles.label}>BASE_URL</Text>
                    <RNPickerSelect
                        placeholder={{
                            label: '',
                            value: null,
                            color: Colors.COLOR_GOLD
                        }}
                        items={baseUrlItems}
                        onValueChange={(value) => {
                            this.setState({
                                baseUrl: value
                            })
                        }}
                        style={pickerSelectStyles}
                        useNativeAndroidPickerStyle={false}
                        value={baseUrl}
                        ref={(el) => {
                            this.inputRefs.picker = el
                        }}
                    />
                </View>
                <CheckBox
                    style={{ marginTop: 15 }}
                    rightText={'Save API Key'}
                    rightTextStyle={styles.label}
                    isChecked={saveApiKey}
                    checkBoxColor={Colors.COLOR_GOLD}
                    onClick={() => this.setState({ saveApiKey: !saveApiKey })}
                />
                <Button
                    style={styles.button}
                    label="Get Started"
                    color={Colors.COLOR_NAV_HEADER}
                    labelColor={Colors.WHITE}
                    height={50}
                    disabled={!apiKey || !secretKey || !baseUrl}
                    onPress={this.getStarted}
                />
                <Text style={[styles.label, { marginTop: size(50) }]}>
                    Please sign up first on the Alpaca website{' '}
                    <Text
                        style={styles.linkText}
                        onPress={() =>
                            this.props.navigation.navigate('Register')
                        }
                    >
                        (https://app.alpaca.markets/signup)
                    </Text>{' '}
                    and generate your API Key to use this app.
                </Text>
            </View>
        )
    }
}

const styles = {
    ...ApplicationStyles.screen,
    rowContainer: {
        flexDirection: 'column',
        marginTop: size(30)
    },
    inputText: {
        width: null,
        height: size(40),
        borderBottomColor: Colors.COLOR_GOLD,
        borderBottomWidth: 1,
        color: Colors.COLOR_GOLD
    },
    button: {
        marginTop: size(50)
    },
    linkText: {
        ...Fonts.style.h3,
        textDecorationLine: 'underline'
    }
}

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        width: null,
        fontSize: size(16),
        paddingTop: 10,
        paddingBottom: 10,
        borderBottomColor: Colors.COLOR_GOLD,
        borderBottomWidth: 1,
        backgroundColor: 'white',
        color: Colors.COLOR_GOLD
    },
    inputAndroid: {
        fontSize: size(16),
        paddingTop: 10,
        paddingBottom: 10,
        borderBottomColor: Colors.COLOR_GOLD,
        borderBottomWidth: 1,
        backgroundColor: 'white',
        color: Colors.COLOR_GOLD
    }
})

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({
    appStartAttempt: (data) => dispatch(AppActions.appStartAttempt(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(SetupScreen)
