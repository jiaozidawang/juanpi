import {pushWindow, pushWindowOnline, confirm} from '../bridge'

/**
 * 转换url字符串
 * @param {Object} data 数据对象
 * @param {*} url url字符串
 * @example
 *      /ghb_demo/xx/xx.html?productId=${finId}
 *  =>  /ghb_demo/xx/xx.html?productId=10929383
 */
function transferUrl (data, url) {
    url = url || ''
    url = url.replace(/\${([^\${}]+)}/g, ($0, $1) => {
        let key = $1 || ''
        if(!key) return $0
        return (data || {})[key]
    })
    return url
}

/**
 * 模板点击跳转处理
 * @param {Object} data 数据对象
 */
export function templateLink (data) {
    if(!data) return

    if(data.menuId){
        return menuLink(data)
    }

    let url = data.picLink || ''
    let lasturl = transferUrl(data, url)
    let isLoginNeeded = (data.isLoginNeeded == '1')
    
    switch(data.picLinkType){
        case '2': 
            pushWindow(lasturl, {}, {}, {needLogin: isLoginNeeded})
            break
        case '3':
            pushWindowOnline(lasturl)
            break
        default:
            break
    }
}

/**
 * 菜单点击跳转
 * @param {Object} menuInfo 菜单信息
 */
export function menuLink (menuInfo) {
    if(!menuInfo) return 
    let url = menuInfo.menuUrl || ''
    let lasturl = transferUrl(menuInfo, url)
    let isLoginNeeded = (menuInfo.loginFlag == '1')
    //是否弹窗标记  0:否,1:是
    let popupFlag = menuInfo.frameFlag
    let popupmessage = menuInfo.frameMSG

    let next = () => {
        switch(menuInfo.jumpType){
            case '2': 
                pushWindow(lasturl, {}, {}, {needLogin: isLoginNeeded})
                break
            case '1':
                window.alert(1111111111)
                pushWindowOnline(lasturl)
                window.alert(222222222)
                break
            default:
                break
        }
    }

    if(popupFlag == '1'){
        //弹窗
        confirm('系统提示', popupmessage).then((res) => {
            if (res.ok) next()
        })
    }else{
        //跳转
        next()
    }
}