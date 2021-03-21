import React, { Component } from 'react'
import {
    View,
    Text,
    Image,
    StyleSheet,
    AsyncStorage,
    Linking,
    Platform,
    NativeModules
} from 'react-native'
import { connect } from 'react-redux'
import RNPickerSelect from 'react-native-picker-select'
import { CustomTabs } from 'react-native-custom-tabs';
// import base64 from 'react-native-base64'

import AppActions from '../../Redux/AppRedux'
import {
    ApplicationStyles,
    Colors,
    Images
} from '../../Themes'
import { size } from '../../Util/Helper'
import Button from '../../Components/Button'
import config from '../../config';
import Loading from '../../Components/Loading';

class StartScreen extends Component {

    constructor(props) {
        super(props)

        this.inputRefs = {}
        this.state = {
            clientId: config.AUTH_CLIENT_ID,
            clientSecret: config.AUTH_CLIENT_SECRET,
            authorizationEndpoint: config.AUTHORIZATION_ENDPOINT,
            tokenEndpoint: config.TOKEN_ENDPOINT,
            redirectUrl: 'alpacamobile://oauth',
            responseType: 'code',
            grantType: 'authorization_code',
            baseUrl: config.BASE_URL,
            baseUrlItems: [
                {
                    label: 'Live Account',
                    value: 'https://api.alpaca.markets/',
                },
                {
                    label: 'Paper Account',
                    value: config.BASE_URL,
                },
            ],
            accessToken: null,
        }
    }

    async componentDidMount() {
        const operation = this.props.route.params?.operation;
        if (Platform.OS === 'android' && operation !== "logout") {
            Linking.getInitialURL().then(url => {
              this.exchangeToken(url);
            });
        }
        const accessToken = await AsyncStorage.getItem('accessToken');
        const baseUrl = await AsyncStorage.getItem('baseUrl');
        if (accessToken) {
            const data = {
                baseUrl,
                accessToken,
            };
            this.props.appStartAttempt(data);
            this.props.navigation.navigate('Tab');
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.fetching && !nextProps.fetching && nextProps.accessToken) {
            this.setState({ accessToken: nextProps.accessToken });
        }
    }

    exchangeToken = (url) => {
        console.log("url:", url);
        if (!url) return;
        const { redirectUrl, grantType } = this.state;
        const code = this.getCode(url);
        const config = `grant_type=${grantType}&redirect_uri=${redirectUrl}&code=${code}`;

        this.props.alpacaExchangeToken(config);
    }

    getCode = (url) => {
        let codeIndex = url.indexOf('code');
        let code = url.slice(codeIndex + 5);
        return code
    }

    authStart = async () => {
        const { clientId, clientSecret, authorizationEndpoint, redirectUrl, responseType, tokenEndpoint } = this.state;
        // const authConfig = {
        //     issuer: authorizationEndpoint,
        //     clientId,
        //     clientSecret,
        //     redirectUrl,
        //     serviceConfiguration: {
        //         authorizationEndpoint,
        //         tokenEndpoint,
        //     },
        //     customHeaders: {
        //         token: {
        //             'Authorization': 'Basic ' + base64.encode(`${config.AUTH_CLIENT_ID}:${config.AUTH_CLIENT_SECRET}`),
        //         },
        //     },
        // };
        // console.log("authConfig:", authConfig);

        // try {
        //     const result = await authorize(authConfig);
        //     console.log('auth result', result);
        // } catch (error) {
        //     console.log('auth error', error);
        // }
        let webOAuthUrl = `${authorizationEndpoint}?client_id=${clientId}&redirect_uri=${redirectUrl}&response_type=${responseType}`;
        if (Platform.OS === "android") {
            CustomTabs.openURL(webOAuthUrl, {
                forceCloseOnRedirection: true
            }).then((launched) => {
                console.log(`Launched custom tabs: ${launched}`);
            }).catch(err => {
                console.error("custom tab error:" + err);
            });
        } else {
            NativeModules.AlpacaOAuth.AuthStart(webOAuthUrl)
            .then(url => {
                console.log('auth result', url);
                if (url) {
                    this.exchangeToken(url);
                }
            })
            .catch((error) => {
                console.log('native auth error:', error);
            });
        }
    }

    getStarted = () => {
        const { baseUrl } = this.state;
        const data = {
            baseUrl,
        };
        AsyncStorage.setItem('baseUrl', baseUrl);
        this.props.appStartAttempt(data);
        this.props.navigation.navigate('Tab');
    }

    render() {
        const { baseUrl, baseUrlItems, accessToken } = this.state
        return (
            <View style={styles.mainContainer}>
                {
                    accessToken ?
                        <View style={styles.rowContainer}>
                            <Text style={styles.label}>
                                Account
                            </Text>
                            <RNPickerSelect
                                placeholder={{
                                    label: '',
                                    value: null,
                                    color: Colors.COLOR_GOLD,
                                }}
                                items={baseUrlItems}
                                onValueChange={(value) => {
                                    this.setState({
                                        baseUrl: value,
                                    })
                                }}
                                style={pickerSelectStyles}
                                useNativeAndroidPickerStyle={false}
                                value={baseUrl}
                                ref={(el) => {
                                    this.inputRefs.picker = el
                                }}
                            />
                        </View> :
                        <Image
                            style={styles.logo}
                            source={Images.logo}
                            resizeMode="contain"
                        />
                }
                <Button
                    style={styles.button}
                    label={accessToken ? "Get Started" : "Authenticate with Alpaca"}
                    color={Colors.COLOR_NAV_HEADER}
                    labelColor={Colors.WHITE}
                    height={50}
                    onPress={accessToken ? this.getStarted : this.authStart}
                />
                {this.props.fetching && <Loading />}
            </View>
        )
    }
}

const styles = {
    ...ApplicationStyles.screen,
    rowContainer: {
        flexDirection: 'column',
        marginTop: size(150)
    },
    button: {
        marginTop: size(100),
    },
    logo: {
        alignSelf: "center",
        marginTop: size(100),
        width: size(200),
        height: size(200),
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
        color: Colors.COLOR_GOLD,
    },
    inputAndroid: {
        fontSize: size(16),
        paddingTop: 10,
        paddingBottom: 10,
        borderBottomColor: Colors.COLOR_GOLD,
        borderBottomWidth: 1,
        backgroundColor: 'white',
        color: Colors.COLOR_GOLD,
    },
})

const mapStateToProps = (state) => ({
    fetching: state.app.fetching,
    accessToken: state.app.accessToken
})

const mapDispatchToProps = dispatch => ({
    appStartAttempt: data => dispatch(AppActions.appStartAttempt(data)),
    alpacaExchangeToken: data => dispatch(AppActions.exchangeTokenAttempt(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(StartScreen)
