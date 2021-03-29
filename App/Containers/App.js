import React, { Component } from 'react'
import { View } from 'react-native'
import { Provider } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'
import FlashMessage from 'react-native-flash-message'

import AppNavigator from './AppNavigator'
import createStore from '../Redux'

const store = createStore()

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <NavigationContainer>
                    <View style={{ flex: 1 }}>
                        <AppNavigator />
                        <FlashMessage position="top" />
                    </View>
                </NavigationContainer>
            </Provider>
        )
    }
}

export default App
