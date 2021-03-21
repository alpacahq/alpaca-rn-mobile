import React, { Component } from 'react'
import {
    View,
    Text,
    Image,
    FlatList
} from 'react-native'
import { connect } from 'react-redux'

import {
    ApplicationStyles,
    Images,
    Colors,
    Metrics,
    Fonts
} from '../../Themes'
import { size } from '../../Util/Helper'
import OrderItem from './OrderItem'
import NavigationIcon from '../../Components/NavigationIcon'

class OrdersScreen extends Component {

    componentDidMount() {
        this.props.navigation.setOptions({
            headerLeft: null,
            headerRight: () => (
                <NavigationIcon
                    onPress={() => this.props.navigation.navigate('Search')}
                    source={Images.search}
                />
            ),
        })
    }

    render() {
        const { openOrders, closedOrders } = this.props
        const orders = openOrders.concat(closedOrders)

        return (
            <View style={styles.container}>
                <View style={styles.mainContainer}>
                    <Text style={styles.label}>Orders</Text>
                    <FlatList
                        style={styles.list}
                        data={orders}
                        keyExtractor={item => item.id}
                        renderItem={({ item, index }) => {
                            return (
                                <OrderItem
                                    order={item}
                                    onPress={() =>
                                        this.props.navigation.navigate('Symbol', {
                                            value: item
                                        })
                                    }
                                />
                            )
                        }}
                    />
                    <Text
                        style={[styles.label, { marginTop: 10 }]}
                        onPress={() => this.props.navigation.navigate('Disclosure')}
                    >
                        Disclosures
                    </Text>
                </View>
            </View>
        )
    }
}

const styles = {
    ...ApplicationStyles.screen,
    list: {
        flex: 1,
        marginTop: size(40),
        paddingRight: 5
    }
}

const mapStateToProps = (state) => {
    return {
        openOrders: state.orders.openOrders,
        closedOrders: state.orders.closedOrders,
    }
}

export default connect(mapStateToProps, null)(OrdersScreen)
