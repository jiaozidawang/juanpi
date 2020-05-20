/**
 * Y表示必填,N表示非必填
 * @desc - checkbox
 * @props {value: Boolean} - Y true 为选中，使用v-model方式绑定
 * @slot 跟在checkbox后面的内容
 * @example
 		<ghb-checkbox :value.sync="yourValue"><span>使用须知</span></ghb-checkbox>
 * ps 此组件非全局，使用前需要import
 */

<template>
	<div class="custom-checkbox" :class="checkboxClass" @click="updateValue">
    <div class="custom-checkbox-icon-wappre">
      <div class="custom-checkbox-icon" v-show="!checkboxvalue"></div>
      <div class="custom-checkbox-icon checker" v-show="checkboxvalue"></div>
    </div>
    <div class="custom-checkbox-txt"><slot></slot></div>
	</div>
</template>
<script>
	import props from './utils/props'
	export default {
		name: 'checkbox',
		data(){
			return {
				checkboxvalue: this.value
			}
		},
		props,
		methods: {
			updateValue(){
        this.checkboxvalue = !this.checkboxvalue
        console.log('协议框', this.checkboxvalue);
				this.$emit('input', this.checkboxvalue)
			}
		}
	}
</script>
<style lang="less">
	@import './less/index.less';
</style>
