const ERROR_LIST = {
  SWEET_PROMPT: '温馨提示',
  // mpaas网关报错
  MGS_ERROR: {
    '10': 'MGS网关错误：对不起，网络连接失败，请检查网络后再试!',
    '9': 'MGS网关错误：对不起，网络连接失败，请检查网络后再试!',
  },
  // 我的存款
  NMB101001: '没有可用的账户，是否去加挂银行卡',
  NMB101002: '最低留存金额不得低于',
  NMB101003: '请输入8到10位纯数字客户经理工号',
  NMB101004: '审批号校验失败',
  NMB101005: '该审批单号无效，请联系客户经理',
  NMB101004: '您已使用审批号，您的存款信息已变更，请确认，点击“取消”将不适用审批号',
  NMB101004: '您审批号的关联账号已解除绑定，请先重新绑定该账号后继续',
  NMB101004: '转存金额不能少于50元',
  NMB101004: '支取金额不能大于存款金额',
  NMB101004: '支取金额输入错误，请重新输入',
  // 帮助中心
  NMB101004: '您当前未登录，是否前往登录？',
  NMB101004: '最多可上传5张图片',
  NMB101004: '输入字数不能少于20个汉字',
  NMB101004: '反馈意见提交成功',

};

export default ERROR_LIST;


export const getMgsErrorMsg =  (errorCode) => {
  return ERROR_LIST['MGS_ERROR'][errorCode]
}