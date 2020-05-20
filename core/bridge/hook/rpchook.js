import _ from "lodash";
import {
  popAllWindow,
  alert,
  confirm,
  toast,
  login,
  cleanUserInfo,
  getSessionStorage,
  errorAlert
} from "..";
import { getMgsErrorMsg } from "../../init/errorDictionary/index";
import errorDictionary from "../../init/errorDictionary/index";
// 温馨提示
const SWEET_PROMPT = errorDictionary.SWEET_PROMPT;

let rpchook = {
  /**
   * 预处理rpc上送参数
   * @param {Object} rpcParams rpc上送参数
   */
  pre(rpcInfo) {
    // 从store里面获取mp_sId
    let { sessionKey } = App.vm.$store.state;
    let sessionID = sessionKey.mp_sId;

    //具体项目报文组装
    let data = rpcInfo.requestData;
    rpcInfo.requestData = {
      header: {
        mp_sId: sessionID || "",
        version: "1.0.0.0", // 信息格式版本号
        clientIP: "", // 客户终端IP（外网）
        clientMAC: "", // 客户终端MAC地址
        clientOS: "", // 客户终端操作系统
        clientNunitType: "", // 客户终端设备型号
        clientTerminateNO: "", // 客户终端设备ID
        transCode: rpcInfo.operationType, // 交易码
        srcSystemID: "NMB", // 源发起方系统ID
        systemID: "NMB", // 发送方系统ID
        transDate: "", // 交易日期
        transTime: "", // 交易时间
        extendHead: "" // 扩展字段
      },
      body: {
        ...data
      }
    };

    !rpcInfo.options && (rpcInfo.options = {});
    !rpcInfo.options.headers && (rpcInfo.options.headers = {});

    //设置cookie
    // if (userInfo.sessionID) {
    if (sessionID && sessionID != "") {
      rpcInfo.options.headers.Cookie = "JSESSIONID=" + sessionID;
    }
    rpcInfo.operationType = ENVCONF.RPC_PATH + rpcInfo.operationType;
  },

  /**
   * 后处理rpc结果信息
   * @param {Object} res 结果信息对象
   */
  post({ api, resolve, reject, rpcInfo, result }) {
    let { options = {} } = rpcInfo;
    // let biz = options.biz // 是否自己处理错误码为0时任务的标志
    let { biz, bizMsgType } = options;
    let after = options.after;
    // 如果有after函数，在此处执行
    if (after && _.isFunction(after)) {
      after(result);
    }
    if (result.resData) {
      let resData = result.resData;
      let header = resData.header;
      let body = resData.body;
      if (header && header.errorCode !== "0") {
        // 会话超时处理
        let errorCode = header.errorCode;
        if (errorCode === "MP100009" || errorCode === "MP100010") {
          cleanUserInfo();
          App.vm.$store.dispatch("commitUserInfo");
          // 判断是否多次弹窗，如果弹了一次之后，isOvertimeConfirmed变为true， 不会再弹窗
          if (App.isOvertimeConfirmed) {
            reject({ header, body });
            return;
          }
          App.isOvertimeConfirmed = true;
          confirm(header.errorMsg, "", { okButton: "去登录" }).then(
            ({ ok }) => {
              // 用户点击之后再次变为false
              App.isOvertimeConfirmed = false;
              if (ok) {
                login({ state: "timeout" });
              }
            }
          );
          return;
        }

        // 如果biz为true，返回所有信息
        if (biz) {
          resolve(resData);
        } else {
          // 如果biz为false，处理错误信息
          let error = new RpcError({
            ...result,
            transCode: rpcInfo.operationType
          });
          if (bizMsgType && bizMsgType == "toast") {
            toast(error.showMsg);
          } else if (bizMsgType && bizMsgType == "none") {
            console.log("bizMsgType: none");
          } else {
            // alert(error.showMsg, "", { button: "好的" });
            errorAlert(error.showMsg);
          }
        }
      } else {
        return resolve(resData);
      }
    } else {
      return reject(
        new RpcError({ ...result, transCode: rpcInfo.operationType })
      );
    }
  }
};

function RpcError(res) {
  let resData = res.resData;
  let showMsg = "";

  if (res && res.resData) {
    this.header = resData.header;
    this.body = resData.body;
    this.errorCode = this.header.errorCode;
    this.errorMsg = decodeURI(this.header.errorMsg + "");
    // 如果没有返回错误信息
    if (this.errorMsg.length === 0) {
      this.errorMsg = "错误码：" + this.errorCode + " \n 交易失败";
    }

    if (this.header && this.errorMsg) {
      // ifp报错
      if (process.env.NODE_ENV !== "production") {
        // showMsg = '请求错误（开发测试）' +
        //     ' \n 错误码：' + this.errorCode +
        //     ' \n 错误信息：' + this.errorMsg
        showMsg = this.errorMsg;
      } else {
        showMsg = this.errorMsg.replace(/^\d+[:：]/, "");
      }
    }
  } else if (res.error && res.errorMessage) {
    console.error({
      errorSourse: "mgs网关错误",
      errorCode: res.error,
      errorMsg: res.errorMessage,
      transCode: res.transCode
    });
    errorAlert(`${res.errorMessage}\n(MGSERROR${res.error})`);
    // mpaas报错
    this.errorCode = res.errorCode;
    this.errorMsg = decodeURI(res.errorMessage);
    if (this.errorCode == "10") {
      this.errorMsg = "对不起，网络连接失败，请检查网络后再试";
    }

    if (process.env.NODE_ENV !== "production") {
      showMsg =
        "系统错误" +
        " \n 错误码：" +
        this.errorCode +
        " \n 错误信息：" +
        this.errorMsg;
    } else {
      showMsg = this.errorMsg;
    }
  } else {
    showMsg = "网络请求失败，请重试！";
    // alert(error.showMsg, "", { button: "好的" });
    errorAlert(error.showMsg);
  }

  this.response = res;
  this.showMsg = showMsg;
}

export default rpchook;
