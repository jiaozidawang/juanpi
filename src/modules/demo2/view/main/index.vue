<template>
    <div class="page">
        <router-link to="/button.html"
                     class="m-btn">按钮组件</router-link>
        <router-link to="/input.html"
                     class="m-btn">input组件</router-link>
        <router-link to="/sms.html"
                     class="m-btn">短信验证码组件</router-link>
        <router-link to="/switch.html"
                     class="m-btn">switch组件</router-link>
        <router-link to="/tab.html"
                     class="m-btn">tab组件</router-link>
        <router-link to="/calendar.html"
                     class="m-btn">calendar组件</router-link>
        <router-link to="/result.html"
                     style="display:block;margin:20px 0 0 0;"
                     class="m-btn">result、empty、reminder组件</router-link>
        <router-link to="/search.html"
                     style="display:block;margin:20px 0;"
                     class="m-btn">search、collapse、button-group、notice组件</router-link>
        <router-link to="/sort.html"
                     style="display:block"
                     class="m-btn">sort、steper、icon组件</router-link>

        <router-link to="/cell.html"
                     style="display:block; margin:20px 0;"
                     class="m-btn">group、cell组件</router-link>

        <router-link to="/scroll.html"
                     style="display:block; margin:20px 0;"
                     class="m-btn">scroll组件</router-link>

        <router-link to="/navbar.html"
                     style="display:block; margin:20px 0;"
                     class="m-btn">navbar组件</router-link>

        <router-link to="/popup.html"
                     style="display:block; margin:20px 0;"
                     class="m-btn">popup、dialog组件</router-link>

        <router-link to="/form.html"
                     style="display:block; margin:20px 0;"
                     class="m-btn">checkbox，checkboxGroup，pwdInputInline组件</router-link>
        <router-link to="/flow.html"
                     style="display:block; margin:20px 0;"
                     class="m-btn">flow组件</router-link>
    </div>
</template>
<script>
export default {
  name: 'Index',
  components: {},
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
