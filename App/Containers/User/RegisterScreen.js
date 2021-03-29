import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { WebView } from 'react-native-webview'

import { ApplicationStyles } from '../../Themes'
import { size } from '../../Util/Helper'

class RegisterScreen extends Component {
    static navigationOptions = (props) => {
        return {
            headerLeft: (
                <Text
                    style={styles.navButton}
                    onPress={() => props.navigation.pop()}
                >
                    Cancel
                </Text>
            ),
            headerRight: (
                <Text
                    style={styles.navButton}
                    onPress={() => props.navigation.pop()}
                >
                    Done
                </Text>
            )
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <WebView
                    source={{ uri: 'https://app.alpaca.markets/signup' }}
                    style={{ flex: 1 }}
                    onLoadProgress={(e) => console.log(e.nativeEvent.progress)}
                />
            </View>
        )
    }
}

const styles = {
    ...ApplicationStyles.screen,
    navButton: {
        padding: 10,
        color: 'white',
        fontSize: size(18)
    }
}

export default RegisterScreen
