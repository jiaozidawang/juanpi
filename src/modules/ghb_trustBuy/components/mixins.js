export default {
  data () {
    return {
      SLInfo: {
        appId: 'hx001',
        insurCorpFrameOrgCd: 'huaxing' // 保险公司代码
      },
      aimbal: 3000000, // 目标资产-固定值
      authTyp: '0' // 'AUTH_TYPE_CODE'返回  '0'：他证，'1'：自证
      // 'QFII_COMMIT_LETTE' 返回 合格投资者承诺函pdf文件地址
      // 'ELEC_LETTE_OF_CONSENT' 返回 电子签署同意函
    };
  },

  methods: {
    // 获取合格投资者所有认证状态
    async getStatus () {
      await this.$tools.rpc('NMBMPSX3404').then(res => {
        const resData = res.body || {};
        if (resData.errorCode === '0') {
          for (var k in this.detail) {
            this.detail[k] = res.body[k] || '';
          }
          if (resData.authTyp) {
            this.authTyp = resData.authTyp; // 非首次，获取到当前用户首次做的时候是否自证模式
          } else {
            this.getSystermAuthTyp(); // 首次，获取当前系统设定的是否自证模式
          }
        }
      }).catch(err => {
        console.log(err);
      });
    },
    // 获取当前系统设定的是否自证模式
    async getSystermAuthTyp () {
      await this.$tools.rpc('NMBMPSX3421', {sysParName: 'AUTH_TYPE_CODE'}).then(res => {
        const resData = res.body || {};
        if (resData.errorCode === '0') {
          this.authTyp = resData.sysParVal || '0';
        }
      }).catch(err => {
        console.log(err);
      });
    }
  }
};
