import { errorAlert } from "@bridge";

export default {
  data () {
    return {};
  },

  methods: {
    /**
     * 获取文档
     * 产品合同 01
     * 认购风险申请书 02
     * 认购风险申请书之补充协议 03
     * 信托计划说明书 04
     * 产品发行公告 05
     * 电子签名约定书 06
     * 推介视频 07
     * 其他 99
     */
    getDocUrl (prdCd, docType, cb, errCb) {
      let docMap = {
        '01': '产品合同',
        '02': '认购风险申请书',
        '03': '认购风险申请书之补充协议',
        '04': '信托计划说明书',
        '05': '产品发行公告',
        '06': '电子签名约定书',
        '07': '推介视频',
        '99': '其他'
      };
      this.$tools.rpc('NMBMPSX3398', {
        prdCd: prdCd,
        qryRowCnt: '1'
      }).then(res => {
        let _pdfUrl = '';
        let _docName = 'pdf';
        if (res.header.errorCode === '0') {
          if (res.body.qryList3071 && res.body.qryList3071.length !== 0) {
            res.body.qryList3071.forEach(e => {
              if (e.fileTyp === docType) {
                _pdfUrl = e.docUrl;
                _docName = e.docName;
              }
            });
            if (_pdfUrl === '') {
              errCb && errCb();
              errorAlert(`未获取到${docMap[docType]}！`);
            } else {
              cb && cb(_pdfUrl, _docName);
            }
          } else {
            errCb && errCb();
            errorAlert(`未获取到${docMap[docType]}！`);
          }
        } else {
          errCb && errCb();
          errorAlert(res.header.errorMsg);
        }
      });
    }
  }
};
