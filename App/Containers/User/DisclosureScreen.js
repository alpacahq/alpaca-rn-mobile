import React, { Component } from 'react'
import { Text, ScrollView } from 'react-native'

import { ApplicationStyles, Images, Colors, Fonts } from '../../Themes'
import NavigationIcon from '../../Components/NavigationIcon'

class DisclosureScreen extends Component {
    componentDidMount() {
        this.props.navigation.setOptions({
            headerLeft: () => (
                <NavigationIcon
                    onPress={() => this.props.navigation.pop()}
                    source={Images.back}
                />
            ),
            title: 'Disclosures',
            headerTintColor: 'white',
            headerTitleStyle: {
                fontWeight: 'bold',
                fontSize: 22
            }
        })
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <Text style={styles.h3}>
                    Brokerage services are provided by Alpaca Securities LLC
                    ("Alpaca"), member FINRA/SIPC, a wholly-owned subsidiary of
                    AlpacaDB, Inc.{'\n\n'}
                    Brokerage services are provided to customers who can write
                    automated investment code and self direct their own
                    investments.{'\n\n'}
                    This is not an offer, solicitation of an offer, or advice to
                    buy or sell securities, or open a brokerage account in any
                    jurisdiction where Alpaca is not registered (Alpaca is
                    registered only in the United States).{'\n\n'}
                    The Paper Trading API is offered by AlpacaDB, Inc. and does
                    not require real money or permit a user to transact in real
                    securities in the market. Providing use of the Paper Trading
                    API is not an offer or solicitation to buy or sell
                    securities, securities derivative or futures products of any
                    kind, or any type of trading or investment advice,
                    recommendation or strategy, given or in any manner endorsed
                    by AlpacaDB, Inc. or any AlpacaDB, Inc. affiliate and the
                    information made available through the Paper Trading API is
                    not an offer or solicitation of any kind in any jurisdiction
                    where AlpacaDB, Inc. or any AlpacaDB, Inc. affiliate is not
                    authorized to do business.{'\n\n'}
                    Market prices, data and other information available through
                    Alpaca are not warranted as to completeness or accuracy and
                    are subject to change without notice. System response and
                    account access times may vary due to a variety of factors,
                    including trading volumes, market conditions, system
                    performance, and other factors. A more complete description
                    of the impact these factors may have can be found in our
                    risks of automated trading systems section.{'\n\n'}
                    All investments involve risk and the past performance of a
                    security, or financial product does not guarantee future
                    results or returns. Keep in mind that while diversification
                    may help spread risk it does not assure a profit, or protect
                    against loss, in a down market. There is always the
                    potential of losing money when you invest in securities, or
                    other financial products. Investors should consider their
                    investment objectives and risks carefully before investing.
                    {'\n\n'}
                    There are risks unique to automated trading algorithms that
                    you should know about and plan for. You should setup a
                    method or system of continuous monitoring or alerting to let
                    you know if there is a mechanical failure, such as
                    connectivity issues, power loss, a computer crash, or system
                    quirk. You should also monitor for instances where your
                    automated trading system experiences anomalies that could
                    result in errant, missing, or duplicated orders. A more
                    complete description of these and other risks can be found
                    in our FAQ section.{'\n\n'}
                    ETFs can entail risks similar to direct stock ownership,
                    including market, sector, or industry risks. Some ETFs may
                    involve international risk, currency risk, commodity risk,
                    and interest rate risk. Trading prices may not reflect the
                    net asset value of the underlying securities.{'\n\n'}
                    All accounts are opened as margin accounts. Alpaca does not
                    currently allow margin loans or short selling, and you will
                    be required to take specific steps at the time these
                    features are allowed in your account.{'\n\n'}
                    You should know that margin trading involves interest
                    charges and risks, including the potential to lose more than
                    deposited or the need to deposit additional collateral in a
                    falling market. Before using margin, customers must
                    determine whether this type of trading strategy is right for
                    them given their specific investment objectives, experience,
                    risk tolerance, and financial situation. For more
                    information please see Alpaca’s Margin Disclosure Statement
                    and Margin Agreement. These disclosures contain information
                    on Alpaca’s lending policies, interest charges, and the
                    risks associated with margin accounts.{'\n\n'}
                    Commission Free trading means that there are no commission
                    charges for Alpaca self-directed individual cash brokerage
                    accounts that trade U.S. listed securities through an API.
                    Relevant SEC and FINRA fees may apply.{'\n\n'}© 2021 Alpaca
                    Securities LLC. All rights reserved.{'\n\n'}© 2021 AlpacaDB.
                    All rights reserved.{'\n\n'}
                </Text>
            </ScrollView>
        )
    }
}

const styles = {
    ...ApplicationStyles.screen,
    container: {
        flex: 1,
        padding: 20
    },
    h3: {
        ...Fonts.style.h3,
        color: Colors.COLOR_CORE_TEXT
    }
}

export default DisclosureScreen
