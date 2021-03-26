import { Dimensions, Platform } from 'react-native'
import { size } from '../Util/Helper'

const { width, height } = Dimensions.get('window')

// Used via Metrics.baseMargin
const metrics = {
    marginHorizontal: size(10),
    marginVertical: size(10),
    section: size(25),
    baseMargin: size(10),
    doubleBaseMargin: size(20),
    smallMargin: 5,
    doubleSection: size(50),
    horizontalLineHeight: 1,
    screenWidth: width < height ? width : height,
    screenHeight: width < height ? height : width,
    navBarHeight: Platform.OS === 'ios' ? size(64) : size(54),
    buttonRadius: 4,
    icons: {
        tiny: 15,
        small: 20,
        medium: 30,
        large: 45,
        xl: 50
    },
    images: {
        small: 20,
        medium: 40,
        large: 60,
        logo: 200,
        titleLogo: 0
    }
}

export default metrics
