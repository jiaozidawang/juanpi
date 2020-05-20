<template>
    <u-page>
        <u-navbar title="POPUP"></u-navbar>
        <u-group>
            <u-cell isLink
                    title="打开dialog"
                    @clickHandler="showDialog = true"></u-cell>
        </u-group>
        <u-group>
            <u-cell isLink
                    title="打开密码键盘"
                    @clickHandler="showKeyboard"></u-cell>

        </u-group>
        <u-group>
            <u-cell isLink
                    title="打开密码键盘【设置底部距离300px】"
                    @clickHandler="showPwdInput1 = true"></u-cell>

        </u-group>
        <u-group>
            <u-cell isLink
                    title="普通的popup"
                    @clickHandler="showPopup = true"></u-cell>
        </u-group>
        <u-group>
            <u-cell isLink
                    title="popup-header"
                    @clickHandler="showPopup1 = true"></u-cell>
        </u-group>
        <u-group>
            <u-cell isLink
                    title="顶部"
                    @clickHandler="showPopup2 = true"></u-cell>
        </u-group>
        <u-group>
            <u-cell isLink
                    title="左侧"
                    @clickHandler="showPopup3 = true"></u-cell>
        </u-group>
        <u-group>
            <u-cell isLink
                    title="右侧"
                    @clickHandler="showPopup4 = true"></u-cell>
        </u-group>
        <u-popup v-model="showPopup">
            <div class="popup-style">
                你好,这是一个普通的POPUP
            </div>
        </u-popup>
        <u-popup v-model="showPopup1">
            <div class="popup-style">
                <u-popup-header title="默认"
                                style="margin-bottom: 10px;"></u-popup-header>
                <u-popup-header title="设置左右文字"
                                leftText="关闭"
                                rightText="查询"
                                style="margin-top: 10px;"></u-popup-header>
                <u-popup-header title=""
                                leftText="关闭"
                                rightText="确定"
                                style="margin-top: 10px;"></u-popup-header>
            </div>
        </u-popup>
        <u-popup v-model="showPopup2"
                 position="top"
                 height="50%">
            <div class="popup-style top-style">
                顶部
            </div>
        </u-popup>
        <u-popup v-model="showPopup3"
                 position="left"
                 width="50%">
            <div class="popup-style top-style">
                左侧
            </div>
        </u-popup>
        <u-popup v-model="showPopup4"
                 position="right"
                 width="50%">
            <div class="popup-style top-style">
                右侧
            </div>
        </u-popup>
        <u-dialog v-model="showDialog"
                  hide-on-blur>
            你好
        </u-dialog>
        <e-pwd-popup-input v-model="showPwdInput"
                           title="密码输入框"
                           hideOnBlur
                           needForgetPwd
                           ref="pwdPopupInput"
                           sessionKey="234h234k23h423423">
            <!-- <u-cell isLink
                    title="填充密码"
                    @clickHandler="setPwd"></u-cell> -->
        </e-pwd-popup-input>
        <e-pwd-popup-input v-model="showPwdInput1"
                           title="密码输入框"
                           hideOnBlur
                           needForgetPwd
                           ref="pwdPopupInput"
                           positionBottom="300px"
                           sessionKey="234h234k23h423423">
            <!-- <u-cell isLink
                    title="填充密码"
                    @clickHandler="setPwd"></u-cell> -->
        </e-pwd-popup-input>
    </u-page>
</template>

<script>
import Page from '@/components/UPage';
import Navbar from '@/components/UNavbar';
import Popup from '@/components/UPopup';
import PopupHeader from '@/components/UPopup/popup-header';
import Group from '@/components/UGroup';
import Cell from '@/components/UCell';
import Dialog from '@/components/UDialog';
import PwdInput from '@/components/EPwdPopupInput';
export default {
  components: {
    [Page.name]: Page,
    [Navbar.name]: Navbar,
    [Popup.name]: Popup,
    [PopupHeader.name]: PopupHeader,
    [Dialog.name]: Dialog,
    [Group.name]: Group,
    [Cell.name]: Cell,
    [PwdInput.name]: PwdInput,
  },
  data() {
    return {
      showPopup: false,
      showPopup1: false,
      showPopup2: false,
      showPopup3: false,
      showPopup4: false,
      showDialog: false,
      showPwdInput: false,
      showPwdInput1: false
    };
  },
  methods: {
    showKeyboard() {
            // console.log(window.ENGINEUI);
            // ENGINEUI.client.showKeyboard();
      this.showPwdInput = true;
    },
    setPwd() {
      this.$refs.pwdPopupInput.setPwd(3);
    }
  }
};
</script>

<style lang="scss" scoped>
    .test-group {
        margin-bottom: 20px;
    }
    .v-cell {
        margin-top: 20px;
        height: 45px;
        padding: 15px;
        font-size: 14px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #ededed;
        &:active {
            background-color: #cccccc;
        }
    }

    .popup-style {
        font-size: 14px;
        min-height: 100px;
        padding-bottom: 30px;
    }

    .top-style {
        height: 100%;
        width: 100%;
        background-color: rgba(235, 220, 18, 0.822);
    }
</style>
