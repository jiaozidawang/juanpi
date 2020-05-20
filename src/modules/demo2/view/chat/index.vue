<template>
    <div class="im-page">
        <div class="im-content"></div>
        <e-chat-input></e-chat-input>
    </div>
</template>
<script>
import EChatInput from '@/components/EChatInput';
export default {
  name: 'EChatInputDemo',
  components: { EChatInput },
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