<!--
 * @Author: liuyunxiao
 * @Date: 2019-07-30 14:22:11
 * @LastEditors: liuyunxiao
 * @LastEditTime: 2019-10-22 18:44:56
 * @Description: 头部组件
 -->
/**
 * Y表示必填,N表示非必填
 * @desc - 头部组件,
 * @props {preventBack: Boolean} - N 是需要重置返回按钮的默认行为，非客户端内参数无效
 * @props {showLeftMenu: Boolean} - N 是否需要显示左边返回按钮
 * @props {leftMenu: Array} - N 设置左菜单，参数详情请查看props.js
 * @props {rightMenu: Array} - N 设置右菜单，参数详情请查看props.js
 * @event {leftHandler: Function} - N 左侧菜单的点击回调函数，参数为 index 对应该每个icon的索引值
 * @event {rightHandler: Function} - N 右侧菜单的点击回调函数，参数为 index 对应该每个icon的索引值
 * @example
 *     <m-header>
 *       <div slot="overwrite-left"></div>
 *       <div slot="overwrite-title">title</div>
 *       <div slot="overwrite-right"></div>
 *       <div slot="other-layout"></div>
 *     </m-header>
 */
<template>
	<div class="y-head">
		<div class="y-head_content" :class="{'y-head_content_shadow': !isNative}">
			<div class="y-head_topBar" v-if="!isNative">
				<div class="y-head_left">
					<slot name="overwrite-left">
						<div class="default_left">
							<i class="icons-back"></i>
						</div>
					</slot>
				</div>
				<h1 class="y-head_title" v-if="!shouldOverWriteTitle">{{stitle}}</h1>
				<div class="y-head_title_area" v-if="shouldOverWriteTitle">
					<slot name="overwrite-title">{{stitle}}</slot>
				</div>
				<div class="y-head_right">
					<slot name="overwrite-right"></slot>
				</div>
			</div>
			<div class="y-head_other_layout">
				<slot name="other-layout"></slot>
			</div>
		</div>
	</div>
</template>
<script>
	import {initClientHead, setLeftMenu, setRightMenu, setTitle, setBarBottomLineColor} from './utils'
  import props from './utils/props'
  import { debounce, throttle } from 'vux'
  import {hideTitleBar, showTitleBar, setTitleBar} from '@bridge';
  import { setInterval, setTimeout } from 'timers';
	export default {
		name: 'y-head',
		props,
		data(){
			return Object.freeze({
				shouldOverWriteTitle: false,
				// isNative: App.device.specialSign,
				stitle: '示例'
			})
		},
		mounted(){
      // this.isNative && initClientHead(this);
      console.log(window.App.device.os);
      // setRightMenu(this);
    },
		watch: {
			leftMenu(){
				setLeftMenu(this)
			},
			rightMenu(){
        setRightMenu(this);
			},
			title(){
				setTitle(this)
			},
			barBottomLineColor(){
				setBarBottomLineColor(this)
			}
		}
	}
</script>
<style lang="less">
	@import './less/index.less';
</style>
