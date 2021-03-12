import { Platform, Dimensions } from 'react-native'
import moment from 'moment-timezone'
import _ from 'lodash'
import { showMessage, hideMessage } from "react-native-flash-message"

const { width } = Dimensions.get('window')

/**
 * Recalculate size based on screen resolution
 */
export const size = (size) => {
    let normalWidth
    if (Platform.OS === 'ios') {
        normalWidth = Platform.isPad ? 768 : 375
    } else if (Platform.OS === 'android') {
        normalWidth = 411
    }
    const ratio = normalWidth / width

    return Math.ceil(size / ratio)
}

/**
 * Capitalize first character of string
 */
export const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Change time format in New York timezone
 */
export const changeTimeFormat = (value) => {
    return moment(value).tz('America/New_York').format('MM/D h:mm a z')
}

/**
 * Group array by `status` key
 */
export const mergeArray = (array) => {
    var result = _(array)
        .groupBy(x => x.status)
        .map((value, key) => ({ status: key, data: value }))
        .value()

    return result
}

/**
 * Format value (see `formatValue` func) and
 * set prefix + or - based on value
 */
export const convert = (value, percent = false) => {
    if (percent === false && value != undefined) {
        value = formatValue(value)
    }

    if (value > 0) {
        if (!percent) {
            return `+$${value}`
        } else
            return `+${value}%`
    } else if (value < 0) {
        value = Math.abs(value)
        value = value.toFixed(2)
        if (!percent) {
            return `-$${value}`
        } else
            return `-${value}%`
    } else {
        if (!percent) {
            return `$${value}`
        } else
            return `${value}%`
    }
}

/**
 * Convert to float, round 2 decimals and add commma every 3 digits
 * return example: 1,256,23.56
 */
export const formatValue = (value) => {
    if (Platform.OS === 'ios') {
        return parseFloat(value).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        })
    } else if (Platform.OS === 'android') {
        let temp = parseFloat(value).toFixed(2)
        return commafy(temp)
    }
}

/**
 * Add comma every 3 digits
 */
export const commafy = (num) => {
    var str = num.toString().split('.')
    if (str[0].length >= 5) {
        str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,')
    }
    if (str[1] && str[1].length >= 5) {
        str[1] = str[1].replace(/(\d{3})/g, '$1 ')
    }
    return str.join('.')
}

/**
 * Show alert message in top position
 */
export const showAlertMessage = (message, type) => {
    showMessage({
        message,
        type,
    })
}

/**
 * Get begining time of yesterday in date/time format
 */
export const getYesterdayStart = () => {
    var start = new Date()
    start.setDate(start.getDate() - 1)
    start.setHours(0, 0, 0, 0)

    return start.toISOString()
}

/**
 * Get end time of yesterday in date/time format
 */
export const getYesterdayEnd = () => {
    var end = new Date()
    end.setDate(end.getDate() - 1)
    end.setHours(23, 59, 59, 999)

    return end.toISOString()
}

/**
 * Get begining time of today in date/time format
 */
export const getTodayStart = () => {
    var start = new Date()
    start.setHours(0, 0, 0, 0)

    return start.toISOString()
}

/**
 * Get end time of today in date/time format
 */
export const getTodayEnd = () => {
    var end = new Date()
    end.setHours(23, 59, 59, 999)

    return end.toISOString()
}