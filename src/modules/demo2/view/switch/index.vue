<template>
    <div>
        <br />
        <u-group>
            <u-switch></u-switch>
        </u-group>
        <u-group>
            <u-switch title="开关"></u-switch>
        </u-group>
        <u-group>
            <u-switch title="开关"
                      tip="下面的提示"></u-switch>
        </u-group>

        <u-group>
            <u-switch title="开关"
                      inline
                      tip="下面的提示"></u-switch>
        </u-group>
    </div>
</template>
<script>

import USwitch from '@/components/USwitch';
import UGroup from '@/components/UGroup';
export default {
  name: 'SwitchDemo',
  components: { USwitch, UGroup },
  props: {},
  data() {
    return {};
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
