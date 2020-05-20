<template>
<m-page>
<div class="main">
  <m-group title="常规温馨提示"></m-group>
  <reminder >
    <reminder-item>请不要设置与常用软件（如社交软件）、网站（如社交网站、论坛）、电子邮箱等相同或相似的密码，并建议定期修改。</reminder-item>
    <reminder-item>请不要设置与常用软件（如社交软件）、网站（如社交网站、论坛）、电子邮箱等相同或相似的密码，并建议定期修改。</reminder-item>
  </reminder>
  
   <m-group title="特殊温馨提示"></m-group>
  <reminder >
    <reminder-group title="1、分享转账介绍">
      <reminder-item>在不知道对方的收款账号的情况下，您可以通过分享转账想微信好友转账(支持跨行)。输入转账金额并完成验证后，将转账消息分享给微信好友，由好友打开转账页面后自行输入收款账号及安全码，即可完成转账，同时转账链接失效。</reminder-item>
    </reminder-group>
    <reminder-group title="2、安全码说明">
      <reminder-item>安全码是分享转账的重要密码信息，由您本人告知收款好友，请勿泄露给非收款人。</reminder-item>
    </reminder-group>
    <reminder-group title="3、有效期说明">
      <reminder-item>收款方收款成功后，链接失效；24小时内收款账户未收款，该链接失效。</reminder-item>
    </reminder-group>
  </reminder>
</div>
</m-page>
</template>
<script>
import Reminder from '@comps/ghb-reminder';
import ReminderGroup from '@comps/ghb-reminder/reminder-group';
import ReminderItem from '@comps/ghb-reminder/reminder-item';
export default {
  components: {
    Reminder,
    ReminderGroup,
    ReminderItem
  }
};
</script>
<style lang="less">
</style>