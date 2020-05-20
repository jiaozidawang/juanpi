/*
 * @Author:
 * @Date: 2019-07-30 14:22:11
 * @LastEditors: liuyunxiao
 * @LastEditTime: 2019-11-12 18:17:43
 * @Description: store
 */
import { __isEmptyObject, parseParamsHandler, __commonWrap } from "../helper";
import { getUserInfo, getSessionStorage } from "../bridge";

export default {
  state: {
    userInfo: {} //登录信息
  },
  getters: {
    userInfo({ userInfo }) {
      return userInfo;
    },
    loginStatus({ userInfo }) {
      return userInfo && !__isEmptyObject(userInfo);
      // return (userInfo && userInfo.isLogin == 'yes');
    },
    /**
     * @description 优先使用的白名单
     */
    isInWhitelist({ userInfo }) {
      if (__isEmptyObject(userInfo)) {
        return false;
      }

      let secretId = userInfo.body.secretId;
      // 拓展的名单列表
      const extendList = [
        "ece118df0a048d699f3f6838d930dd63f2af4a74577fcc96fb278235c124c328",
        "d76ffe0589b50215c22675ccbb4a40c5a5bc59dbba3370bcb776ffb996648e2d",
        "d4eb6564252d05fbbc5df205cd6c3ddee170e796967197b30b67e96032dfdeb3",
        "ca77be42bc30fa98fbd466833a69226980319bf637b5e2867f510ebe8807df8b",
        "572de19dd5aa010c67c60d562fa6c19e78cc859ed3b9b04d054d6e9fa0e35c1b",
        "7530b337db03572d308aa6966a3d6c7a43069259c96dd7518e6686aea2b9499a",
        "f05dd53cbaeb6ff7516cf5098a9c32c32365eec41ab60976ea0a3a8edde7d11d",
        "0810efcd5a354f70abdcf40cc5fea5e5625f2192947fbe4ae62e41d85a910310",
        "e89b860bb3d658f031ac265e06c9d0e5eb7022a1c7f6eb6252cbe53fa990b21b",
        "2265fe27071a942cb9eb787b1642de230b645b04687b5f151d9d56d71c902b48",
        "0d75e76bbee92603684ecc53a8c37bff2deba63f2e1ce114d1e20840b68a8f95", // 肖小红
        "c1ce48cc5e49de7167bcc48b769fcf17c5b2819e0adef374a013d018a72f940a",
        // "f5359dcab47166156eaa5b56f2eef7420baa4e115a94e919b656d054d396a9ec", // sit 历史个人的
        "2ccae727d413cd9948db8264b6dd017ad6099fa486a6821a43b1ba49728becc3", // 罗小军
        "05ffcb810355ac908a940ba8cf48b54ba133983d1b407da0045259414912b7d9", // 杨军
        "f454a39d48c360354bc3408aa0ec9d856686062d8b541d3c17f3082ece241f37" // 骆芳
      ];

      // 是否在拓展列表里面
      const isInWhiteList = extendList.some(item => {
        return item == secretId;
      });

      // 在拓展列表里面或者有行员标识的，返回true
      if (isInWhiteList || userInfo.body.STAFFFLAG === "1") {
        return true;
      }

      return false;
    }
  },
  mutations: {
    updateUserInfo(state, info = {}) {
      state.userInfo = info;
    },
    updateSessionKey(state, info = {}) {
      state.sessionKey = info;
    }
  },
  actions: {
    initStore({ dispatch }) {
      let promiseList = [];
      promiseList = [dispatch("commitUserInfo"), dispatch("commitParamsInfo")];
      return Promise.all(promiseList);
    },
    commitUserInfo({ commit }) {
      return new Promise(resolve => {
        let callback = res => {
          commit("updateUserInfo", res);
          resolve();
        };
        //异常处理，不可约定
        getUserInfo().then(callback, resolve);
      });
    },
    commitParamsInfo() {
      let searchParams = parseParamsHandler(
        (window.location.search || "").substring(1)
      );
      let paramskey = searchParams._PARAMSKEY || "";
      let urlparams = searchParams._PARAMS || "";

      delete searchParams._PARAMSKEY吗;
      delete searchParams._PARAMS;

      return new Promise(resolve => {
        if (paramskey) {
          getSessionStorage(paramskey, false).then(
            jsonData => {
              let params;
              try {
                params = JSON.parse(jsonData);
              } catch (e) {}

              App.params = Object.assign({}, searchParams, params);

              resolve();
            },
            () => {
              resolve();
            }
          );
        } else {
          if (urlparams) {
            try {
              urlparams = JSON.parse(urlparams);
            } catch (e) {
              urlparams = {};
            }
          }
          App.params = Object.assign({}, searchParams, urlparams);
          resolve();
        }
      });
    }
  }
};
