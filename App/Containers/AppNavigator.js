import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import StartScreen from './User/StartScreen'
import SearchScreen from './Trade/SearchScreen'
import SymbolScreen from './Trade/SymbolScreen'
import TradeScreen from './Trade/TradeScreen'
import TradeReviewScreen from './Trade/TradeReviewScreen'
import OverviewScreen from './Overview/OverviewScreen'
import PositionScreen from './Position/PositionScreen'
import OrdersScreen from './Order/OrdersScreen'
import EmergencyScreen from './Emergency/EmergencyScreen'
import SuspendAPIScreen from './Emergency/SuspendAPIScreen'
import RecoverAPIScreen from './Emergency/RecoverAPIScreen'
import LiquidationScreen from './Emergency/LiquidationScreen'
import CancelOrderScreen from './Emergency/CancelOrderScreen'
import DisclosureScreen from './User/DisclosureScreen'
import TabImage from '../Components/TabImage'
import { Colors, Images } from '../Themes'

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

function OverviewStack() {
    return (
        <Stack.Navigator
            screenOptions={{ headerStyle : { backgroundColor: Colors.COLOR_NAV_HEADER }, headerTitle: null }}
        >
            <Stack.Screen name="Overview" component={OverviewScreen} />
            <Stack.Screen name="Search" component={SearchScreen} />
            <Stack.Screen name="Symbol" component={SymbolScreen} />
            <Stack.Screen name="Trade" component={TradeScreen} />
            <Stack.Screen name="TradeReview" component={TradeReviewScreen} />
            <Stack.Screen name="Disclosure" component={DisclosureScreen} />
        </Stack.Navigator>
    )
}

function PositionsStack() {
    return (
        <Stack.Navigator
            screenOptions={{ headerStyle : { backgroundColor: Colors.COLOR_NAV_HEADER }, headerTitle: null }}
        >
            <Stack.Screen name="Positions" component={PositionScreen} />
            <Stack.Screen name="Search" component={SearchScreen} />
            <Stack.Screen name="Symbol" component={SymbolScreen} />
            <Stack.Screen name="Trade" component={TradeScreen} />
            <Stack.Screen name="TradeReview" component={TradeReviewScreen} />
            <Stack.Screen name="Disclosure" component={DisclosureScreen} />
        </Stack.Navigator>
    )
}

function OrdersStack() {
    return (
        <Stack.Navigator
            screenOptions={{ headerStyle : { backgroundColor: Colors.COLOR_NAV_HEADER }, headerTitle: null }}
        >
            <Stack.Screen name="Orders" component={OrdersScreen} />
            <Stack.Screen name="Search" component={SearchScreen} />
            <Stack.Screen name="Symbol" component={SymbolScreen} />
            <Stack.Screen name="Trade" component={TradeScreen} />
            <Stack.Screen name="TradeReview" component={TradeReviewScreen} />
            <Stack.Screen name="Disclosure" component={DisclosureScreen} />
        </Stack.Navigator>
    )
}

function EmergencyStack() {
    return (
        <Stack.Navigator
            screenOptions={{ headerStyle : { backgroundColor: Colors.COLOR_NAV_HEADER }, headerTitle: null }}
        >
            <Stack.Screen name="Emergency" component={EmergencyScreen} />
            <Stack.Screen name="Search" component={SearchScreen} />
            <Stack.Screen name="Symbol" component={SymbolScreen} />
            <Stack.Screen name="Trade" component={TradeScreen} />
            <Stack.Screen name="TradeReview" component={TradeReviewScreen} />
            <Stack.Screen name="SuspendAPI" component={SuspendAPIScreen} />
            <Stack.Screen name="RecoverAPI" component={RecoverAPIScreen} />
            <Stack.Screen name="Liquidation" component={LiquidationScreen} />
            <Stack.Screen name="CancelOrder" component={CancelOrderScreen} />
            <Stack.Screen name="Disclosure" component={DisclosureScreen} />
        </Stack.Navigator>
    )
}

function TabStack() {
    return (
        <Tab.Navigator
            tabBarOptions={{
                activeTintColor: Colors.COLOR_GOLD,
                showLabel: false,
                style: {
                    backgroundColor: 'rgb(250, 250, 250)',
                },
            }}
        >
            <Tab.Screen
                name="Overview"
                component={OverviewStack}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <TabImage source={Images.overview} isSelected={focused} />
                    )
                }}
            />
            <Tab.Screen
                name="Positions"
                component={PositionsStack}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <TabImage source={Images.positions} isSelected={focused} />
                    )
                }}
            />
            <Tab.Screen
                name="Orders"
                component={OrdersStack}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <TabImage source={Images.orders} isSelected={focused} />
                    )
                }}
            />
            <Tab.Screen
                name="Emergency"
                component={EmergencyStack}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <TabImage style={{ width: 48, height: 48 }} source={Images.emergency} isSelected={focused} />
                    )
                }}
            />
        </Tab.Navigator>
    )
}

function AppNavigator() {
    return (
        <Stack.Navigator
            screenOptions={{ gestureEnabled: true }}
            headerMode="none"
        >
            <Stack.Screen name="Setup" component={StartScreen} />
            <Stack.Screen name="Tab" component={TabStack} />
        </Stack.Navigator>
    )
}

export default AppNavigator;