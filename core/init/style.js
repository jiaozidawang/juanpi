const baseColor = {
  main: '#EA2C1D', // 主色
  mainActive: '#CE2619',  // 主色(激活状态)
  black1: '#09122B', // 1级黑色
  black2: '#888888', // 2级黑色
  black3: '#C1C1C1', // 3级黑色
  blue: '#459FFC', // 蓝色
  white1: '#ffffff', // 1级白色
  white2: '#EDEDED', // 2级白色
  white3: '#F2F4F7', // 3级白色
}

const baseSize = {
  s24: '0.24rem',
  s26: '0.26rem',
  s28: '0.28rem',
  s30: '0.3rem',
  s32: '0.32rem',
  s36: '0.36rem',
  s40: '0.4rem',
  s90: '0.9rem',
  s98: '0.98rem',
  s120: '1.2rem',
  s160: '1.6rem',
}


export default {
  color: {
    main: baseColor.main,
    mainActive: baseColor.mainActive,
    font1: baseColor.black1,
    font2: baseColor.black2,
    font3: baseColor.black3,
    fontWt: baseColor.white1,
    fontLink: baseColor.blue,
    bg: baseColor.white3,
    bgWt: baseColor.white1,
    line: baseColor.white2,
    buttonDefault: baseColor.main,
    buttonDefaultActive: baseColor.mainActive,
    buttonDisabled: baseColor.black3,
    buttonReset: baseColor.white2,
    cellTitleFontColor: baseColor.black1, // cell组件标题字体颜色
    cellValueFontColor: baseColor.black2, // cell组件内容字体颜色
    tipsTitleFontColor: baseColor.black2, // 温馨提示标题字体颜色
    tipsValueFontColor: baseColor.black2, // 温馨提示内容字体颜色
  },
  size: {
    fs24: baseSize.s24,
    fs26: baseSize.s26,
    fs28: baseSize.s28,
    fs30: baseSize.s30,
    fs36: baseSize.s36,
    fs40: baseSize.s40,
    spacing: baseSize.s32, // 两边留白
    lineHeight: baseSize.s90, // 标准行高
    lineHeightSt: baseSize.s40, // 状态栏行高
    lineHeightTitle: baseSize.s98, // 标题栏行高
    lineHeightMuti: baseSize.s120, // 标准双行列表1
    lineHeightMuti2: baseSize.s160, // 标准双行列表2
  }
}
