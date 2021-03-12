import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import React from 'react'

import StartScreen from './User/StartScreen'
import RegisterScreen from './User/RegisterScreen'
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

const OverviewStack = createStackNavigator(
    {
        Overview: OverviewScreen,
        Search: SearchScreen,
        Symbol: SymbolScreen,
        Trade: TradeScreen,
        TradeReview: TradeReviewScreen,
        Disclosure: {
            screen: DisclosureScreen,
            navigationOptions: {
                tabBarVisible: false
            }
        }
    },
    {
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: Colors.COLOR_NAV_HEADER,
            },
        },
    }
)

const PositionsStack = createStackNavigator(
    {
        Positions: PositionScreen,
        Search: SearchScreen,
        Symbol: SymbolScreen,
        Trade: TradeScreen,
        TradeReview: TradeReviewScreen,
        Disclosure: DisclosureScreen
    },
    {
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: Colors.COLOR_NAV_HEADER,
            },
        },
    }
)

const OrdersStack = createStackNavigator(
    {
        Orders: OrdersScreen,
        Search: SearchScreen,
        Symbol: SymbolScreen,
        Trade: TradeScreen,
        TradeReview: TradeReviewScreen,
        Disclosure: DisclosureScreen
    },
    {
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: Colors.COLOR_NAV_HEADER,
            },
        },
    }
)

const EmergencyStack = createStackNavigator(
    {
        Emergency: EmergencyScreen,
        Search: SearchScreen,
        Symbol: SymbolScreen,
        Trade: TradeScreen,
        TradeReview: TradeReviewScreen,
        SuspendAPI: SuspendAPIScreen,
        RecoverAPI: RecoverAPIScreen,
        Liquidation: LiquidationScreen,
        CancelOrder: CancelOrderScreen,
        Disclosure: DisclosureScreen
    },
    {
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: Colors.COLOR_NAV_HEADER,
            },
        },
    }
)

const RegisterStack = createStackNavigator(
    {
        Register: RegisterScreen,
    },
    {
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: Colors.COLOR_NAV_HEADER,
            },
        },
    }
)

const TabStack = createBottomTabNavigator(
    {
        Overview: OverviewStack,
        Positions: PositionsStack,
        Orders: OrdersStack,
        Emergency: EmergencyStack
    },
    {
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, horizontal, tintColor }) => {
                const { routeName } = navigation.state
                let IconComponent
                if (routeName === 'Overview') {
                    IconComponent = <TabImage source={Images.overview} isSelected={focused} />
                } else if (routeName === 'Positions') {
                    IconComponent = <TabImage source={Images.positions} isSelected={focused} />
                } else if (routeName === 'Orders') {
                    IconComponent = <TabImage source={Images.orders} isSelected={focused} />
                } else if (routeName === 'Emergency') {
                    IconComponent = <TabImage style={{ width: 48, height: 48 }} source={Images.emergency} isSelected={focused} />
                }

                return IconComponent
            },
        }),
        tabBarOptions: {
            activeTintColor: Colors.COLOR_GOLD,
            showLabel: false,
            style: {
                backgroundColor: 'rgb(250, 250, 250)',
            },
        }
    }
)

const AppNavigator = createStackNavigator(
    {
        Setup: StartScreen,
        Register: RegisterStack,
        Tab: TabStack,
    },
    {
        initialRouteName: "Setup",
        defaultNavigationOptions: {
            header: null
        }
    }
);

export default AppNavigator;