import Fonts from './Fonts'
import Metrics from './Metrics'
import Colors from './Colors'
import { size } from '../Util/Helper'

const ApplicationStyles = {
    screen: {
        container: {
            flex: 1
        },
        mainContainer: {
            backgroundColor: 'white',
            flex: 1,
            padding: size(33)
        },
        statusbar: {
            height: 0,
            backgroundColor: Colors.COLOR_NAV_HEADER,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row'
        },
        navIcon: {
            height: size(27),
            width: size(27),
            resizeMode: 'contain',
            marginRight: Metrics.baseMargin,
            marginLeft: Metrics.baseMargin
        },
        logo: {
            height: Metrics.images.titleLogo,
            width: Metrics.images.titleLogo,
            resizeMode: 'contain',
            marginRight: Metrics.baseMargin
        },
        tabContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: Colors.WHITE
        },
        tabBarStyle: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgb(250, 250, 250)'
        },
        tabStyle: {
            paddingBottom: 0
        },
        tabBarImage: {
            width: Metrics.images.medium,
            height: Metrics.images.medium
        },
        separator: {
            height: 0.5,
            backgroundColor: Colors.COLOR_GRAY,
            marginTop: 2,
            marginBottom: 2
        },
        label: {
            ...Fonts.style.h3,
            color: Colors.COLOR_GRAY
        }
    }
}

export default ApplicationStyles
