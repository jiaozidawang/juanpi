<template>
    <u-page>
        <u-group>
            <u-pwd-input-inline title="交易密码"
                                ref="input1"
                                type="tel"
                                v-model="pwdInput1"></u-pwd-input-inline>
            <u-pwd-input-inline title="确认交易密码"
                                ref="input2"
                                :needNativeKeyboard="false"
                                v-model="pwdInput2"></u-pwd-input-inline>
            <u-input title="随便"
                     v-model="pwdInput2"></u-input>
            <u-button @clickHandler="onClick">赋值</u-button>
            {{pwdInput1}}
        </u-group>
        <u-group :title="String(isAgree1)">
            <u-checkbox v-model="isAgree1"
                        size="S"
                        padding="10px">复选框</u-checkbox>
        </u-group>
        <u-group>
            <u-checkbox v-model="isAgree"
                        disabled>复选框</u-checkbox>
        </u-group>
        <u-group>
            <u-checkbox v-model="isAgree"
                        disabled>
                <slot name="icon">icon</slot>
            </u-checkbox>
        </u-group>
        <u-group>
            <u-checkbox-group :isRadio="false"
                              :checkboxList="[
                    {
                        value: 'a',
                        label: '苹果',
                        isCheck: false,
                        disabled: false
                    },
                    {
                        value: 'b',
                        label: '橙子',
                        isCheck: false,
                        disabled: false
                    },
                    {
                        value: 'c',
                        label: '雪梨',
                        isCheck: false,
                        disabled: false
                    },
                    {
                        value: 'd',
                        label: '橘子',
                        isCheck: false,
                        disabled: false
                    },
                    {
                        value: 'e',
                        label: '柚子柚子柚子柚子柚子',
                        isCheck: false,
                        disabled: false
                    },
                    {
                        value: 'f',
                        label: '蜂蜜',
                        isCheck: false,
                        disabled: false
                    },
                    {
                        value: 'g',
                        label: '新疆大西瓜',
                        isCheck: false,
                        disabled: false
                    }
                ]"></u-checkbox-group>
        </u-group>
        <u-group>
            <u-checkbox-group max="3"
                              rowCounts="2"
                              type="solid"
                              :isRadio="false"
                              :checkboxList="[
                    {
                        value: 'a',
                        label: '苹果',
                        isCheck: false,
                        disabled: false
                    },
                    {
                        value: 'b',
                        label: '橙子',
                        isCheck: false,
                        disabled: false
                    },
                    {
                        value: 'c',
                        label: '雪梨',
                        isCheck: false,
                        disabled: false
                    },
                    {
                        value: 'd',
                        label: '橘子',
                        isCheck: false,
                        disabled: false
                    }
                ]"></u-checkbox-group>
        </u-group>
        <u-group>
            <u-checkbox-group max="3"
                              type="solid"
                              :isRadio="false"
                              :checkboxList="[
                    {
                        value: 'a',
                        label: '苹果',
                        isCheck: false,
                        disabled: false
                    },
                    {
                        value: 'b',
                        label: '橙子',
                        isCheck: false,
                        disabled: false
                    },
                    {
                        value: 'c',
                        label: '雪梨',
                        isCheck: false,
                        disabled: false
                    },
                    {
                        value: 'd',
                        label: '橘子',
                        isCheck: false,
                        disabled: false
                    },
                    {
                        value: 'e',
                        label: '柚子柚子柚子柚子柚子',
                        isCheck: false,
                        disabled: false
                    },
                    {
                        value: 'f',
                        label: '蜂蜜',
                        isCheck: false,
                        disabled: false
                    },
                    {
                        value: 'g',
                        label: '新疆大西瓜',
                        isCheck: false,
                        disabled: false
                    },
                    {
                        value: 'h',
                        label: '火龙果',
                        isCheck: false,
                        disabled: false
                    }
                ]"></u-checkbox-group>
        </u-group>
        <u-group>
            <e-agreement slot="footer"
                         :hasPadding="false"
                         v-model="isAgree2">请仔细阅读并同意<span>《这是一份协议书》</span>勾选情况{{
                    isAgree2
                }}</e-agreement>
        </u-group>
    </u-page>
</template>

<script>
import Page from '@/components/UPage';
import Group from '@/components/UGroup';
import Cell from '@/components/UCell';
import Checkbox from '@/components/UCheckbox';
import Agreement from '@/components/EAgreement';
import CheckboxGrooup from '@/components/UCheckboxGroup';
import PwdInputInlint from '@/components/UPwdInputInline';
import Input from '@/components/UInput';
import Button from '@/components/UButton';
export default {
  components: {
    [Page.name]: Page,
    [Group.name]: Group,
    [Cell.name]: Cell,
    [Checkbox.name]: Checkbox,
    [CheckboxGrooup.name]: CheckboxGrooup,
    [Agreement.name]: Agreement,
    [PwdInputInlint.name]: PwdInputInlint,
    [Input.name]: Input,
    [Button.name]: Button,
  },
  data() {
    return {
      isAgree: false,
      isAgree1: false,
      isAgree2: false,
      inputValue: '',
      pwdInput1: '',
      pwdInput2: ''
    };
  },
  watch: {
    inputValue(v) {
      this.$refs.input2.setPwd(v);
    }
  },
  methods: {
    onClick() {
      this.pwdInput1 = '123456';
    }
  }
};
</script>

<style lang="scss" scoped>
    .test-group {
        margin-bottom: 20px;
    }
    .img,
    .img-after {
        width: 22px;
        height: 22px;
        img {
            width: 22px;
            height: 22px;
        }
    }
    .img {
        margin-right: 10px;
    }
    .img-after {
        margin-left: 10px;
    }
</style>
