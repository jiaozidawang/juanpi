// let advancedTheme = {
//     bgColor: '#2c2c38',
//     mainFontColor: '#ffffff'
// }
// let defaultTheme = {
//     bgColor: '#f5f5f9',
//     mainFontColor: '#09122b'
// }
// let personalTheme = {
//     bgColor: '#f5f5f9',
//     mainFontColor: '#09122b'
// }
export default {
    data () {
        return {
            // bgColor: '#2c2c38',
            // themeList: {
            //     default: defaultTheme,
            //     personal: personalTheme,
            //     advanced: advancedTheme,
            // },
            theme: window.App.theme
        }
    },
    computed: {
        globalBg () {
            // return this.themeList[this.theme].bgColor
            if(this.theme === 'default') {
                return '#f5f5f9'
            }
            if(this.theme === 'personan') {
                return '#f5f5f9'
            }
            if(this.theme === 'advanced') {
                return '#2c2c38'
            }
        },
        mainTextColor () {
            // return this.themeList[this.theme].mainFontColor;
            if(this.theme === 'default') {
                return '#09122b'
            }
            if(this.theme === 'personan') {
                return '#09122b'
            }
            if(this.theme === 'advanced') {
                return '#ffffff'
            }
        }
    },
    methods: {
    }
}