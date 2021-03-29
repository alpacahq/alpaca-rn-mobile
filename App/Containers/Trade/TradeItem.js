import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import RNPickerSelect from 'react-native-picker-select'

import { ApplicationStyles, Colors, Fonts } from '../../Themes'
import { size } from '../../Util/Helper'

class TradeItem extends Component {
    constructor(props) {
        super(props)

        this.inputRefs = {}
        this.state = {
            selectedValue: ''
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ selectedValue: nextProps.selectedItem })
    }

    render() {
        const { label, items, disabled, onValueChange } = this.props
        return (
            <View style={styles.rowContainer}>
                <Text style={styles.label}>{label}</Text>
                <RNPickerSelect
                    placeholder={{
                        label: '',
                        value: null,
                        color: Colors.COLOR_GOLD
                    }}
                    disabled={disabled}
                    items={items}
                    onValueChange={(value) => {
                        this.setState({
                            selectedValue: value
                        })
                        onValueChange(value)
                    }}
                    style={{
                        inputIOS: [
                            pickerSelectStyles.inputIOS,
                            {
                                color: disabled
                                    ? Colors.COLOR_GRAY
                                    : Colors.COLOR_GOLD
                            }
                        ],
                        inputAndroid: [
                            pickerSelectStyles.inputAndroid,
                            {
                                color: disabled
                                    ? Colors.COLOR_GRAY
                                    : Colors.COLOR_GOLD
                            }
                        ]
                    }}
                    useNativeAndroidPickerStyle={false}
                    value={this.state.selectedValue}
                    ref={(el) => {
                        this.inputRefs.picker = el
                    }}
                />
            </View>
        )
    }
}

TradeItem.propTypes = {
    items: PropTypes.array.isRequired,
    selectedItem: PropTypes.string,
    label: PropTypes.string,
    disabled: PropTypes.bool,
    onValueChange: PropTypes.func
}

const styles = {
    ...ApplicationStyles.screen,
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 5
    }
}

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        width: size(130),
        fontSize: size(16),
        paddingTop: 10,
        paddingBottom: 10,
        borderBottomColor: Colors.COLOR_GOLD,
        borderBottomWidth: 1,
        backgroundColor: 'white',
        color: Colors.COLOR_GOLD
    },
    inputAndroid: {
        width: size(130),
        fontSize: size(16),
        paddingTop: 10,
        paddingBottom: 10,
        borderBottomColor: Colors.COLOR_GOLD,
        borderBottomWidth: 1,
        backgroundColor: 'white',
        color: Colors.COLOR_GOLD
    }
})

export default TradeItem
