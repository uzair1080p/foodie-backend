import { Platform } from "react-native";

const DEFAULT = {
    Regular: 'Roboto-Regular',  
    Italic: 'Roboto-Italic',

    Medium: 'Roboto-Medium',
    MediumItalic: 'Roboto-MediumItalic',

    Thin: 'Roboto-Thin',
    ThintItalic: 'Roboto-ThinItalic',
    
    Bold: 'Roboto-Bold',
    BoldItalic: 'Roboto-BoldItalic',

    Light: 'Roboto-Light',
    LightItalic: 'Roboto-LightItalic',
    
    Black: 'Roboto-Black',
    BlackItalic: 'Roboto-BlackItalic',
}

const Fonts = Platform.select({
    ios: DEFAULT,
    android:  DEFAULT
})

export default Fonts