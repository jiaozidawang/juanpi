<template>
  <div class="ghb-recommend">
    <div class="recommend" @click="selectNo">
      <div class="left">
        <div class="notchoose">
          <div>非必选</div>
        </div>

        <span class="referee">推荐人:</span>
      </div>

      <div class="right">
        <div class="choose">
          <span v-if="recommendName == '请选择(非必选)'" style="color:#C1C1C1">请选择</span>
          <span v-else style="color: #09122B">{{recommendName}}{{recommendNo}}</span>
        </div>
        <img src="./img/icon_tiaozjt@2x.png" alt />
      </div>
    </div>

    <div class="ghb-recommend-wrapper" v-transfer-dom>
      <x-dialog v-model="isShowDialog">
        <div class="ghb-recommend-dialog">
          <span class="ghb-recommend-dialog__title">客户经理编号</span>
          <div class="ghb-recommend-dialog__input" @click="focusInput">
            <x-input
              :style="inputStyle"
              type="tel"
              v-model="recommendValue"
              :max="8"
              placeholder="请输入客户经理编号"
              ref="input"
            ></x-input>
          </div>
          <div class="ghb-recommend-dialog__btn">
            <span @click="cancel">取消</span>
            <span :class="{disabled: isDisabled}" @click="confirm">确定</span>
          </div>
        </div>
      </x-dialog>
    </div>
  </div>
</template>
<script>
import Cell from "@core/public/components/base/v-cell";
import { showSelectView, errorAlertH5, errorAlert } from "@bridge";
import { XDialog, XInput, TransferDomDirective as TransferDom } from "vux";
export default {
  props: {
    custManagerId: {
      type: String,
      default: ""
    }
  },
  directives: {
    TransferDom
  },
  components: {
    Cell,
    XDialog,
    XInput
  },
  data() {
    return {
      initFlag: true,
      isShowDialog: false,
      pickData: [],
      selectPick: "-1",
      recommendNo: "", // 推荐人编号
      recommendName: "请选择(非必选)", // select框值
      recommendValue: "", // input框值
      inputStyle: {
        width: "100%",
        "background-color": "#F2F4F7",
        "border-radius": "4px"
      }
    };
  },
  computed: {
    // 是否可点击
    isDisabled() {
      return this.recommendValue === "";
    },
    valueStyle() {
      return {
        color: this.recommendName === "请选择(非必选)" ? "#C1C1C1" : "#09122B"
      };
    }
  },
  watch: {
    custManagerId: {
      handler(newVal) {
        if (newVal !== "" && this.initFlag) {
          this.recommendNo = newVal;
          this.recommendName = newVal;
          this.recommendValue = newVal;
        }
        this.initFlag = false;
      },
      immediate: true
    }
  },
  created() {
    this.getRecommendList();
  },
  methods: {
    focusInput() {
      this.$refs.input.focus();
    },
    cancel() {
      if (this.recommendValue === "") {
        this.recommendName = "请选择(非必选)";
        this.selectPick = "-1";
      }
      this.isShowDialog = false;
    },
    confirm() {
      let reg = /^\d{8}$/;
      if (!this.isDisabled) {
        if (!this.recommendValue.match(reg)) {
          errorAlertH5("请输入8位数字编号");
        } else {
          this.recommendName = this.recommendValue;
          this.recommendNo = this.recommendValue;
          this.checkRecommendNo();
          this.isShowDialog = false;
        }
      }
    },
    selectNo() {
      let _self = this;
      showSelectView("", _self.pickData, _self.selectPick).then(res => {
        console.log(res);
        let { result } = res;
        let { resultObject, actionType } = result;
        if (actionType === "1") {
          let { id, selectName, value } = resultObject;
          _self.selectPick = value;
          if (id !== "0") {
            _self.recommendNo = id;
            _self.recommendName = selectName;
            _self.$emit("setRecommendNo", _self.recommendNo);
          } else {
            _self.showDialog();
          }
        }
      });
    },
    showDialog() {
      this.isShowDialog = true;
    },
    // 获取
    async getRecommendList() {
      let _self = this;
      let res = await _self.NMBMPSX3333();
      let { header, body } = res;
      if (header.errorCode === "0") {
        let {
          commonCustodianId,
          commonCustodianName,
          custManagerId,
          custManagerName
        } = body;
        if (commonCustodianId !== "" && commonCustodianName !== "") {
          let pickItem = {
            id: commonCustodianId,
            selectName: `${commonCustodianName}`,
            itemName: `${commonCustodianName}(${commonCustodianId})`,
            value: _self.pickData.length
          };
          _self.pickData.push(pickItem);
          if (
            custManagerId !== "" &&
            custManagerName !== "" &&
            custManagerId !== commonCustodianId
          ) {
            let pickItem = {
              id: custManagerId,
              selectName: `${custManagerName}`,
              itemName: `${custManagerName}(${custManagerId})`,
              value: _self.pickData.length
            };
            _self.pickData.push(pickItem);
          }
        } else {
          if (custManagerId !== "" && custManagerName !== "") {
            let pickItem = {
              id: custManagerId,
              selectName: `${custManagerName}`,
              itemName: `${custManagerName}(${custManagerId})`,
              value: _self.pickData.length
            };
            _self.pickData.push(pickItem);
          }
        }
      }
      let defaultPick = {
        id: "0",
        selectName: "",
        itemName: "手动输入客户经理编号",
        value: _self.pickData.length
      };
      _self.pickData.push(defaultPick);
    },
    async checkRecommendNo() {
      let _self = this;
      let res = await _self.NMBMPSX3334({
        // employeeId: "05000127"
        employeeId: _self.recommendNo
      });
      let { header, body } = res;
      if (header.errorCode !== "0") {
        _self.recommendNo = "";
        _self.recommendName = "请选择(非必选)"
        errorAlert(header.errorMsg);
      } else {
         this.recommendName = body.givenName;
         this.recommendNo = this.recommendValue;
       }


      _self.$emit("setRecommendNo", _self.recommendNo);
    },
    /**
     * @description 客户信息查询（推荐人）
     * PBS11021
     */
    NMBMPSX3333(params = {}) {
      return this.$tools.rpc("NMBMPSX3333", { ...params }, { biz: true });
    },
    /**
     * @description 员工信息查询
     * PBS11022
     */
    NMBMPSX3334(params = {}) {
      return this.$tools.rpc("NMBMPSX3334", { ...params }, { biz: true });
    }
  }
};
</script>
<style lang="less" >
.ghb-recommend-wrapper .weui-dialog {
  width: 100%;
}
</style>
<style lang="less" scoped>
@import "~@core/public/less/mixin.less";
.divLine {
  height: 1px;
  width: 375px;
  background: #f2f4f7;
}
.recommend {
  display: flex;
  justify-content: space-around;
  width: 345px;
  height: 44px;
  background: linear-gradient(
    90deg,
    rgba(104, 221, 203, 0) 0%,
    rgba(69, 195, 169, 0.08) 34%,
    rgba(55, 184, 155, 0.08) 48%,
    rgba(55, 184, 155, 0.06) 66%,
    rgba(55, 184, 155, 0) 100%
  );

  .left {
    display: flex;
    .notchoose {
      position: relative;
      top: 50%;
      transform: translateY(-50%);
      width: 48px;
      height: 18px;
      border-radius: 9px;
      background: #43d340;
      text-align: center;

      div {
        font-size: 12px;
        font-family: PingFangSC-regular;
        font-weight: 400;
        color: #ffffff;
        position: relative;
        top: 50%;
        transform: translateY(-50%);
      }
    }
    .referee {
      font-size: 15px;
      font-family: PingFangSC-regular;
      font-weight: 400;
      color: #09122b;
      line-height: 48px;
    }
  }
  .right {
    display: flex;
    line-height: 44px;
    .choose {
      font-size: 15px;
      font-family: PingFangSC-regular;
      font-weight: 400;
      color: #c1c1c1;
    }
    img {
      padding-left: 5px;
      .setIconSize(7.5px, 13px);
      position: relative;
      top: 50%;
      transform: translateY(-55%);
    }
  }
}
.ghb-recommend {
  &-dialog {
    background: @bg;
    border-radius: 0.16rem;
    &__title {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 1.34rem;
      font-size: 0.32rem;
      font-weight: 500;
      color: @font-t1;
    }
    &__input {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      width: 100%;
      margin-bottom: 0.4rem;
      padding: 0 0.3rem;
      box-sizing: border-box;
      // background-color: #f2f4f7;
      background-color: @bg;
    }
    &__btn {
      display: flex;
      flex-direction: row;
      height: 0.9rem;
      border-top: 0.02rem solid @bt-reset;
      box-sizing: border-box;
      span {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        flex: 1;
        color: @bt-default;
        &:nth-child(2) {
          border-left: 0.02rem solid @bt-reset;
          box-sizing: border-box;
          font-weight: 500;
        }
      }
    }
    .disabled {
      color: @bt-disabled;
      font-weight: 400;
    }
  }
}
</style>
