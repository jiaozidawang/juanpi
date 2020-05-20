<template>
	<div class="router-view" :class="namespaceClass">
    <div class="page-mask" v-if="isLoading"></div>
		<div :class="`drawer-view`" v-else>
      <slot name="top"/>
			<slot></slot>
       <slot name="bottom"/>
		</div>
	</div>
</template>
<script>
	import props from './utils/props'
	export default {
		name: 'vPage',
		data(){
			return {}
		},
		props,
		created(){
			if(this.namespace){
				this.namespaceClass = this.namespace
			}else{
				let [a, b, moduleName, pageName] = window.location.pathname.split('/')
				this.namespaceClass = moduleName.replace(/ghb_/, '') + '_' + pageName.replace(/.html/, '')
      }
    },
    mounted() {
      this.setPosition();
    },
    methods: {
      setPosition () {
        let mainDiv = document.querySelector('.main');
      }
    }
	}
</script>

<style lang="less">
  .page-mask{
    // background-color: #fff;
    height: 14rem;
    width: 7.5rem;
  }
</style>

