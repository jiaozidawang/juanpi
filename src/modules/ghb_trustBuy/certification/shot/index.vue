<template>
    <u-page style="position: relative;">
        <section class="pic-box" @click="goBack">
            <img width="100%" src="../../assets/image/example.png">
        </section>
    </u-page>
</template>

<script>
  import { UPage } from "@engine";
  import { closeTo } from "@core/bridge";

  export default {
    name: 'certification-shot-page',

    components: {
      UPage
    },

    data () {
      return {

      };
    },

    methods: {
      goBack () {
        closeTo({index: -1});
      }
    }
  };
</script>

<style lang="less" scoped>
  .pic-box {
    position: absolute;
    z-index: 999;
    width: 100%;
    text-align: center;
  }
</style>

