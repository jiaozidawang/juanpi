<template>
    <div>
        <e-sms-input sequence="12"></e-sms-input>
    </div>
</template>
<script>
import ESmsInput from '@/components/ESmsInput';
export default {
  name: 'ESmsCodeDemo',
  components: { ESmsInput },
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
