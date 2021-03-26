import Colors from './Colors'
import { size } from '../Util/Helper'

const type = {
    base: 'Avenir-Book',
    bold: 'Avenir-Black'
}

const style = {
    h1: {
        fontFamily: type.bold,
        fontSize: size(32),
        color: Colors.COLOR_CORE_TEXT
    },
    h2: {
        fontFamily: type.base,
        fontSize: size(23),
        color: Colors.COLOR_CORE_TEXT
    },
    h3: {
        fontFamily: type.base,
        fontSize: size(16),
        color: Colors.COLOR_CORE_TEXT
    }
}

export default {
    type,
    style
}
