import React, { Component } from 'react'
import {
    View,
    TextInput,
    FlatList
} from 'react-native'
import { connect } from 'react-redux'
import _ from 'lodash'

import AssetsActions from '../../Redux/AssetsRedux'
import {
    ApplicationStyles,
    Images,
    Colors,
} from '../../Themes'
import {
    getTodayStart,
    getTodayEnd,
    getYesterdayStart,
    getYesterdayEnd,
    size
} from '../../Util/Helper'
import SearchItem from './SearchItem'
import NavigationIcon from '../../Components/NavigationIcon'
import Loading from '../../Components/Loading'

class SearchScreen extends Component {

    state = {
        query: '',
        totalItems: [],
        filteredItems: []
    }

    componentDidMount() {
        this.props.navigation.setOptions({
            headerLeft: () => (
                <NavigationIcon
                    onPress={() => this.props.navigation.pop()}
                    source={Images.back}
                />
            ),
        })
    }

    /**
     * Delay 800ms after finish typing for better UX
     */
    onSearchBarTextChange = _.debounce(() => {
        this.filterItems()
    }, 800)

    /**
     * Get filtered items by search query and get bars
     */
    filterItems = () => {
        const { assets, getBars } = this.props
        const { query } = this.state

        let filteredItems = _.map(assets, function (el) {
            if (query && el.symbol.toLowerCase().startsWith(query.toLowerCase())) return el
        })
        filteredItems = _.without(filteredItems, undefined)
        if (filteredItems.length > 199) {
            filteredItems = filteredItems.slice(0, 199)
        }

        this.setState({
            query,
            filteredItems
        })

        let symbols = ''
        _.map(filteredItems, function (item) {
            let div = symbols.length > 0 ? ',' : ''
            symbols = symbols + div + item.symbol
        })
        getBars('1Min', symbols, getTodayStart(), getTodayEnd(), 'today')
        getBars('1D', symbols, getYesterdayStart(), getYesterdayEnd(), 'yesterday')
    }

    render() {
        const { query, filteredItems } = this.state

        return (
            <View style={styles.mainContainer}>
                <View style={styles.searchContainer}>
                    <TextInput
                        ref={ref => this.queryTextInput = ref}
                        style={styles.searchInput}
                        placeholder='Symbol...'
                        autoFocus
                        autoCorrect={false}
                        onChangeText={text => {
                            this.setState({ query: text })
                            this.onSearchBarTextChange()
                        }}
                        value={query}
                        maxLength={40}
                    />
                    <NavigationIcon
                        style={styles.navSearchIcon}
                        iconStyle={{ tintColor: Colors.COLOR_NAV_HEADER, marginRight: 0 }}
                        source={Images.search}
                    />
                </View>
                <FlatList
                    style={styles.list}
                    data={filteredItems}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => {
                        return (
                            <SearchItem
                                item={item}
                                onPress={() =>
                                    this.props.navigation.navigate('Symbol', {
                                        value: item
                                    })
                                }
                            />
                        )
                    }}
                />
                {this.props.barFetching && <Loading />}
            </View>
        )
    }
}

const styles = {
    ...ApplicationStyles.screen,
    searchContainer: {
        flexDirection: 'row',
    },
    searchInput: {
        flex: 1,
        height: size(40),
        borderBottomColor: 'rgba(0, 0, 0, 0.5)',
        borderBottomWidth: 1,
    },
    navSearchIcon: {
        position: 'absolute',
        right: 0
    },
    list: {
        flex: 1,
        marginTop: size(30),
        paddingRight: 10
    }
}

const mapStateToProps = (state) => {
    return {
        positions: state.positions.positions,
        assets: state.assets.assets,
        barFetching: state.assets.barFetching
    }
}

const mapDispatchToProps = (dispatch) => ({
    getBars: (timeframe, symbols, start, end, day) => dispatch(AssetsActions.getBarsAttempt(timeframe, symbols, start, end, day)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchScreen)
