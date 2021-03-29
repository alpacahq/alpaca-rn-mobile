import React, { Component } from 'react'
import { View, Text, Image, FlatList, StatusBar } from 'react-native'
import { connect } from 'react-redux'

import { ApplicationStyles, Images, Colors, Metrics, Fonts } from '../../Themes'
import { size } from '../../Util/Helper'
import PositionItem from './PositionItem'
import NavigationIcon from '../../Components/NavigationIcon'

class PositionScreen extends Component {
    componentDidMount() {
        this.props.navigation.setOptions({
            headerLeft: null,
            headerRight: () => (
                <NavigationIcon
                    onPress={() => this.props.navigation.navigate('Search')}
                    source={Images.search}
                />
            )
        })
    }

    render() {
        const { positions } = this.props

        return (
            <View style={styles.container}>
                <View style={styles.mainContainer}>
                    <Text style={styles.label}>Positions</Text>
                    <FlatList
                        style={styles.list}
                        data={positions}
                        keyExtractor={(item) => item.asset_id}
                        renderItem={({ item, index }) => {
                            return (
                                <PositionItem
                                    position={item}
                                    onPress={() =>
                                        this.props.navigation.navigate(
                                            'Symbol',
                                            {
                                                value: item
                                            }
                                        )
                                    }
                                />
                            )
                        }}
                    />
                    <Text
                        style={[styles.label, { marginTop: 10 }]}
                        onPress={() =>
                            this.props.navigation.navigate('Disclosure')
                        }
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
        positions: state.positions.positions
    }
}

export default connect(mapStateToProps, null)(PositionScreen)
