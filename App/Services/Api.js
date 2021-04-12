import apisauce from 'apisauce'
import base64 from 'react-native-base64'

import config from '../config'

const create = (baseURL = config.BASE_URL) => {
    const api = apisauce.create({
        baseURL,
        headers: {},
        timeout: 25000
    })

    const dataApi = apisauce.create({
        baseURL: config.DATA_BASE_URL,
        headers: {},
        timeout: 50000
    })

    const authApi = apisauce.create({
        baseURL: config.TOKEN_ENDPOINT,
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            Authorization:
                'Basic ' +
                base64.encode(
                    `${config.AUTH_CLIENT_ID}:${config.AUTH_CLIENT_SECRET}`
                )
        },
        timeout: 25000
    })

    const setBaseURL = (url) => api.setBaseURL(url)
    const setHeaders = (access_token) => {
        api.setHeaders({
            Authorization: 'Bearer ' + access_token
        })
        dataApi.setHeaders({
            Authorization: 'Bearer ' + access_token
        })
    }
    const getAccount = () => api.get('v2/account')
    const configureAccount = (data) =>
        api.patch('v2/account/configurations', data)
    const getOrders = (status, params) =>
        api.get(`v2/orders?status=${status}&direction=desc&${params}`)
    const cancelOrder = (order_id) => api.delete(`v2/orders/${order_id}`)
    const postOrder = (data) => api.post('v2/orders', data)
    const getPositions = () => api.get('v2/positions')
    const getAssets = () => api.get('v2/assets?status=active')
    const getBars = (timeframe, symbols, start, end) =>
        dataApi.get(
            `v2/stocks/${symbols}/bars?start=${start}&end=${end}&timeframe=${timeframe}&limit=2`
        )
    const alpacaExchangeToken = (params) =>
        authApi.post(config.TOKEN_ENDPOINT, params)

    return {
        setBaseURL,
        setHeaders,
        getAccount,
        configureAccount,
        getOrders,
        getPositions,
        cancelOrder,
        postOrder,
        getAssets,
        getBars,
        alpacaExchangeToken
    }
}

export default {
    create
}
