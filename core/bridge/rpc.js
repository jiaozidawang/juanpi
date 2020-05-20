/*
 * @Author: liuyunxiao
 * @Date: 2019-09-02 19:31:47
 * @LastEditors: liuyunxiao
 * @LastEditTime: 2019-11-13 11:16:30
 * @Description: rpc
 */
import { alert, toast, setSessionStorage, getSessionStorage } from "@bridge";
import rpchook from "./hook/rpchook";
import { __commonWrap } from "./helper";
import dateTools from "../utils/tools/dateTools";
/**
 * 远程过程调用
 * @param {String} operationType 远程请求名称
 * @param {Object} requestData 远程请求参数 key:value
 * @param {Object} options 远程调用选项
 */

export async function rpc(operationType, requestData = {}, options = {}) {
  let rpcInfo = {
    operationType,
    requestData,
    options
  };

  // 获取mp_sId
  try{
    const mpsidData = await getSessionStorage("mp_sId");
    let sessionID = mpsidData.mp_sId;
    let headerOption = await getSessionStorage('headerInfo') || {};
    const headerInfo  = headerOption.headerInfo || {}; 
    console.log('请求头部信息 >>', headerOption, headerInfo)
    // 组装报文
    let data = {
      header: {
        logScene: requestData.logSence || "-1", // 接口调用场景
        mp_sId: sessionID || "",
        version: "1.0.0.0", // 信息格式版本号 
        clientIP: headerInfo.ipType, // 客户终端IP（外网）
        clientMAC: headerInfo.macAddr, // 客户终端MAC地址
        clientOS: headerInfo.systemType, // 客户终端操作系统
        clientNunitType: headerInfo.phoneModel, // 客户终端设备型号
        clientTerminateNo: headerInfo.clientTerminateNo, // 客户终端设备ID
        clientTerminateNO: headerInfo.clientTerminateNo, // 客户终端设备ID
        lastLoginName: headerInfo.lastLoginName, // 上次登录用户名
        transCode: operationType, // 交易码
        srcSystemID: "NMB", // 源发起方系统ID
        systemID: "NMB", // 发送方系统ID
        transDate: '', // 交易日期(前置代传)
        transTime: '', // 交易时间(前置代传)
        // 扩展字段
        extendHead: headerOption ? JSON.stringify(headerOption) : ''
        // {
        //   phoneModel: '', // 手机型号
        //   deviceNo: '', // 客户终端设备ID
        //   systemType: '', // 手机操作系统
        //   phonesysVersion: '', // 手机操作系统版本号
        //   mobileVersion: '', // 手机客户端版本号
        //   passwordVersion: '', // 密码控件版本号
        //   signVersion: '', // 签名控件版本
        //   driveVersion: '', // 驱动版本号
        //   browserVersion: '', // 浏览器版本号
        //   browserType: '', // 浏览器类型
        //   systemVersion: '', // 网银操作系统
        //   lbs: '', // 经纬度
        //   deviceID: '', // 设备Id
        //   fullDeviceNumber: '', // 设备SIM信息
        //   appName: '', // 交易发起渠道(应用)名称
        //   simCardCount: '', // SIM卡数量
        //   deviceType: '', // 设备类型
        //   deviceName: '', // 设备型号名称
        //   macAddr: '', // 设备的mac地址
        //   ipType: '', // IP版本号（ipv4, ipv6）
        //   sourceIP: '', // 请求地址
        // }
      },
      body: {
        ...requestData
      }
    };

    //设置cookie
    !options.headers && (options.headers = {});
    if (sessionID && sessionID != "") {
      options.headers.Cookie = "JSESSIONID=" + sessionID;
    }

    // 设置请求参数
    let rpcParams = {
      operationType: ENVCONF.RPC_PATH + operationType,
      requestData: [{ _requestBody: data }],
      timeout: options.timeout || 30,
      headers: options.headers,
      getResponse: true
    };

    // 控制Loading图标显示
    let timer;
    if (options.globalLoading !== false) {
        // 当300毫秒后，setTimeout计时器未被清除，则执行showLoading，并且将App.loadingCounter.isShown置为true
        window.App.loadingCounter.plusOne();
    }

    console.info(operationType.substr(7, 4) + "的参数", rpcParams, {
      operationType,
      ...data
    });
    return __commonWrap("rpc", rpcParams).then(
      (result) => {
        if (options.globalLoading !== false) {
          // 当loading的isShown是true，则已执行过showLoading()， 必须执行hideLoading();否则清除计时器
          App.loadingCounter.minusOne()
        }

        // 如果接口返回了mp_sId,用这个替换缓存中的mp_sId,并更新到vuex
        let { header } = result.resData ? result.resData : "";
        if (header && header.mp_sId && header.mp_sId != "") {
          setSessionStorage("mp_sId", { mp_sId: header.mp_sId });
        }

        console.info(operationType.substr(7, 4) + "的返回", result);

        // 统一修改header的错误码和错误信息
        if (App.isNeedErrorCode && result.resData) {
          result.resData.header.errorMsg = `${result.resData.header.errorMsg}\n(${result.resData.header.errorCode})`;
        }

        return new Promise((resolve, reject) => {
          if (rpchook.post) {
            //返回处理钩子
            rpchook.post({
              api: {
                alert,
                toast
              },
              resolve,
              reject,
              rpcInfo,
              result
            });
          } else {
            resolve(result);
          }
        });
      },
      () => {
        if (options.globalLoading !== false) {
          App.loadingCounter.isShown
            ? App.loadingCounter.minusOne()
            : clearTimeout(timer);
        }
      }
    );
  } catch (err) {
    console.log(err)
  }
}
