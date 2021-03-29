import React, { Component } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import TabNavigator from 'react-native-tab-navigator'

import TabImage from '../Components/TabImage'
import { ApplicationStyles, Images } from '../Themes'
import PositionScreen from './Position/PositionScreen'
import OverviewScreen from './Overview/OverviewScreen'
import OrdersScreen from './Order/OrdersScreen'
import EmergencyScreen from './Emergency/EmergencyScreen'
import Loading from '../Components/Loading'
import NavigationIcon from '../Components/NavigationIcon'

class MainScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedTab: 'overview'
        }
    }

    static navigationOptions = (props) => {
        return {
            headerLeft: (
                <NavigationIcon
                    onPress={() => props.navigation.pop()}
                    source={Images.back}
                />
            ),
            headerRight: (
                <NavigationIcon
                    onPress={() => props.navigation.navigate('Search')}
                    source={Images.search}
                />
            )
        }
    }

    componentDidMount() {}

    render() {
        const { fetching } = this.props

        return (
            <View style={styles.container}>
                <TabNavigator
                    style={styles.tabContainer}
                    tabBarStyle={styles.tabBarStyle}
                >
                    <TabNavigator.Item
                        tabStyle={styles.tabStyle}
                        selected={this.state.selectedTab === 'overview'}
                        renderIcon={() => <TabImage source={Images.overview} />}
                        renderSelectedIcon={() => (
                            <TabImage source={Images.overview} isSelected />
                        )}
                        onPress={() =>
                            this.setState({ selectedTab: 'overview' })
                        }
                    >
                        <OverviewScreen />
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        tabStyle={styles.tabStyle}
                        selected={this.state.selectedTab === 'positions'}
                        renderIcon={() => (
                            <TabImage source={Images.positions} />
                        )}
                        renderSelectedIcon={() => (
                            <TabImage source={Images.positions} isSelected />
                        )}
                        onPress={() =>
                            this.setState({ selectedTab: 'positions' })
                        }
                    >
                        <PositionScreen />
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        tabStyle={styles.tabStyle}
                        selected={this.state.selectedTab === 'orders'}
                        renderIcon={() => <TabImage source={Images.orders} />}
                        renderSelectedIcon={() => (
                            <TabImage source={Images.orders} isSelected />
                        )}
                        onPress={() => this.setState({ selectedTab: 'orders' })}
                    >
                        <OrdersScreen />
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        tabStyle={styles.tabStyle}
                        selected={this.state.selectedTab === 'emergency'}
                        renderIcon={() => (
                            <TabImage
                                style={{ width: 48, height: 48 }}
                                source={Images.emergency}
                            />
                        )}
                        renderSelectedIcon={() => (
                            <TabImage
                                style={{ width: 48, height: 48 }}
                                source={Images.emergency}
                                isSelected
                            />
                        )}
                        onPress={() =>
                            this.setState({ selectedTab: 'emergency' })
                        }
                    >
                        <EmergencyScreen />
                    </TabNavigator.Item>
                </TabNavigator>
                {fetching && <Loading />}
            </View>
        )
    }
}

const styles = {
    ...ApplicationStyles.screen
}

const mapStateToProps = (state) => {
    return {
        fetching: state.assets.fetching
    }
}

export default connect(mapStateToProps, null)(MainScreen)
