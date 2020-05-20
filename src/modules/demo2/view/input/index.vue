<template>
    <div class="input-demo">
        <u-input border="around"
                 placeholder="请输入"></u-input>

        <u-input border="bottom"
                 placeholder="请输入"></u-input>

        <u-input placeholder="请输入">
            <span slot="label"
                  style="font-size: 0.3rem;">自定义右边</span>
        </u-input>
        {{aaa}}
        <u-input v-model="aaa"
                 title="输入标题"
                 desc="小提示"
                 placeholder="请输入"></u-input>

        <u-input type="text"
                 title="标题"
                 placeholder="请输入..."></u-input>
        <u-input type="text"
                 title="只能数字"
                 placeholder="请输入..."
                 rule="0-9"></u-input>
        <u-input type="text"
                 title="数字包括小数点"
                 placeholder="请输入..."
                 rule="0-9."></u-input>
        <u-input type="text"
                 title="只能英文"
                 placeholder="请输入..."
                 rule="a-z"></u-input>
        <u-input type="text"
                 title="英文数字"
                 placeholder="请输入..."
                 rule="0-9|a-z"></u-input>
        <u-input type="text"
                 title="标题"
                 desc="小提示"
                 format="9999 9999 9999 9999"
                 placeholder="请输入(自动格式化)..."></u-input>

        <u-group>
            <e-amount-input placeholder="50元起"></e-amount-input>
        </u-group>

        <u-group :title="money">
            <e-amount-input v-model="money"
                            placeholder="50元起"
                            border="bottom"></e-amount-input>
        </u-group>

    </div>
</template>
<script>
import { UInput, EAmountInput, UGroup } from "@engine";

export default {
  name: 'InputDemo',
  components: { UInput, EAmountInput, UGroup },
  props: {},
  data() {
    return {
      money: '',
      aaa: ''
    };
  },
  watch: {},
  computed: {},
  created() { },
  mounted() { },
  destoryed() { },
  methods: {}
};
</script>
<style lang="scss" scoped>
    @import './style.scss';
</style>
