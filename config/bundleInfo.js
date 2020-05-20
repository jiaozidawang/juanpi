
const BUNDLE_INFO = {
    demo: {
        id: 99999999,
        name: '演示',
        type: 'global'
    },
    engineui: {
        id: 20200000,
        name: 'engine-ui',
        type: 'global'
    },
    icon: {
        id: 20200001,
        name: '多主题图标包',
        type: 'global'
    },
    image: {
        id: 20200002,
        name: '多主题图片包',
        type: 'global'
    },
    common: {
        id: 20190000,
        name: '全局离线包',
        type: 'global'
    },
    ghb_account: {
        id: 20192001,
        name: '我的账户',
        type: 'normal'
    },
    ghb_financing: {
        id: 20192002,
        name: '理财',
        type: 'normal'
    },
    ghb_login_safety: {
        id: 20192003,
        name: '登录设置',
        type: 'normal'
    },
    ghb_pay_setting: {
        id: 20192004,
        name: '支付设置',
        type: 'normal'
    },
    ghb_rapid_loss_reporting: {
        id: 20192005,
        name: '账户挂失',
        type: 'normal'
    },
    ghb_about_us: {
        id: 20192006,
        name: '关于我们',
        type: 'normal'
    },
    ghb_transfer: {
        id: 20192007,
        name: '转账',
        type: 'normal'
    },
    ghb_help: {
        id: 20192008,
        name: '帮助中心',
        type: 'normal'
    },
    ghb_message: {
        id: 20192009,
        name: '消息中心',
        type: 'normal'
    },
    ghb_user_info: {
        id: 20192010,
        name: '用户信息',
        type: 'normal'
    },
    ghb_assessment_questionnaire: {
        id: 20192011,
        name: '风险评估',
        type: 'normal'
    },
    ghb_fund: {
        id: 20192012,
        name: '代销基金',
        type: 'normal'
    },
    ghb_collect: {
        id: 20192013,
        name: '我的收藏',
        type: 'normal'
    },
    ghb_grid: {
        id: 20192014,
        name: '常用服务',
        type: 'normal'
    },
    ghb_foreign_ex_settle_sale: {
        id: 20192015,
        name: '个人结售汇',
        type: 'normal'
    },
    ghb_loan_contract: {
        id: 20192016,
        name: '贷款合同补签',
        type: 'normal'
    },
    ghb_balance: {
        id: 20192017,
        name: '定期存款',
        type: 'normal'
    },
    ghb_account_information: {
        id: 20192018,
        name: '账户资源',
        type: 'normal'
    },
    ghb_register_account: {
        id: 20192019,
        name: '注册开户',
        type: 'normal'
    },
    ghb_credit_repay: {
        id: 20192020,
        name: '信用卡还款',
        type: 'normal'
    },
    ghb_integral: {
        id: 20192021,
        name: '积分商城',
        type: 'normal'
    },
    ghb_member: {
        id: 20192022,
        name: '个人权益',
        type: 'normal'
    },
    ghb_find_login_pwd: {
        id: 20192023,
        name: '忘记密码',
        type: 'normal'
    },
    ghb_share_transfer: {
        id: 20192024,
        name: '分享转账',
        type: 'normal'
    },
    ghb_my_fund: {
        id: 20192025,
        name: '我的基金',
        type: 'normal'
    },
    ghb_integral_bill: {
        id: 20192026,
        name: '积分账单',
        type: 'normal'
    },
    ghb_discount: {
        id: 20192027,
        name: '10分优惠',
        type: 'normal'
    },
    ghb_pdf: {
        id: 20192028,
        name: 'PDF加载',
        type: 'normal'
    },
    ghb_other_cards_transfer: {
        id: 20192029,
        name: '他行卡转入',
        type: 'normal'
    },
    ghb_account_assets: {
        id: 20192030,
        name: '资产饼图',
        type: 'normal'
    },
    ghb_scan: {
        id: 20192031,
        name: '扫一扫',
        type: 'normal'
    },
    ghb_salary_finance: {
        id: 20192033,
        name: '工资理财',
        type: 'normal'
    },
    ghb_advertising: {
        id: 20192034,
        name: '广告',
        type: 'normal'
    },
    nls_accepted: {
        id: 20192035,
        name: '预约取款',
        type: 'normal'
    },
    ghb_reservation_transfer: {
        id: 20192036,
        name: '预约转账',
        type: 'normal'
    },
    ghb_mobile_transfer: {
        id: 20192037,
        name: '手机号转账',
        type: 'normal'
    },
    ghb_qixingbao: {
        id: 20192038,
        name: '七兴宝',
        type: 'normal'
    },
    ghb_idcard_update: {
        id: 20192039,
        name: '身份证更新',
        type: 'normal'
    },
    ghb_no_record_six_month: {
        id: 20192040,
        name: '六个月无交易账户激活',
        type: 'normal'
    },
    ghb_wxlogin: {
        id: 20192041,
        name: '微信登录',
        type: 'normal'
    },
    ghb_message_supplement: {
        id: 20192042,
        name: '信息补录',
        type: 'normal'
    },
    ghb_financial_calculator: {
        id: 20192043,
        name: '理财计算器',
        type: 'normal'
    },
    ghb_annual_bill: {
        id: 20192044,
        name: '年度账单',
        type: 'normal'
    },
    ghb_im: {
        id: 20192045,
        name: '在线客服',
        type: 'normal'
    },
    ghb_insurance: {
        id: 20192046,
        name: '保险',
        type: 'normal'
    },
    ghb_trust_fund: {
        id: 20192047,
        name: '私募基金',
        type: 'normal'
    },
    ghb_openDoorRed: {
        id: 20192048,
        name: '开门红',
        type: 'normal'
    },
    ghb_financial_calendar: {
        id: 20192049,
        name: '金融日历',
        type: 'normal'
    },
    nls_award_credit: {
        id: 20192050,
        name: '授信',
        type: 'normal'
    },
    nls_borrow: {
        id: 20192051,
        name: '借款',
        type: 'normal'
    },
    nls_finance_tool: {
        id: 20192052,
        name: '贷款计算器',
        type: 'normal'
    },
    ghb_loan: {
        id: 20192053,
        name: '借款还款记录',
        type: 'normal'
    },
    nls_underthe_line: {
        id: 20192054,
        name: '转线下',
        type: 'normal'
    },
    ghb_offline_loans: {
        id: 20192055,
        name: '线下贷款',
        type: 'normal'
    },
    ghb_cloud_pay: {
        id: 20192056,
        name: '云闪付',
        type: 'normal'
    },
    ghb_or_code: {
        id: 20192057,
        name: '银联二维码',
        type: 'normal'
    },
    ghb_information: {
        id: 20192058,
        name: '资讯信息',
        type: 'normal'
    },
    ghb_quick_loan: {
        id: 20192059,
        name: '华兴快贷',
        type: 'normal'
    },
    ghb_trustBuy: {
        id: 20192060,
        name: '私募购买',
        type: 'normal'
    }
}


const getAppIdMap = () => {
    let map = {};
    for(let key in BUNDLE_INFO) {
        let item = BUNDLE_INFO[key].id;
        map[key] = item;
    }
    return map
}

exports.BUNDLE_INFO = BUNDLE_INFO;

exports.APPID_MAP = getAppIdMap();
