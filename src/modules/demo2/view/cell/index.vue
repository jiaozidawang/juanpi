<template>
    <u-page>
        <u-group title="Group标题"
                 footerText="Group底部的文字">
            <u-cell title="正常的"
                    value="cell"></u-cell>
            <u-cell title="自定义标题字体大小"
                    titleFontSize="30px"></u-cell>
            <u-cell title="自定义value字体大小"
                    value="cell"
                    valueFontSize="30px"></u-cell>
            <u-cell title="自定义value颜色"
                    value="cell"
                    valueColor="red"></u-cell>
            <u-cell title="自定义title颜色"
                    value="cell"
                    titleColor="red"></u-cell>
            <u-cell title="value字体加粗"
                    value="cell"
                    isValueBold></u-cell>
            <u-cell title="title字体加粗"
                    value="cell"
                    isTitleBold></u-cell>
            <u-cell title="可点击"
                    value="cell"
                    isLink></u-cell>
        </u-group>
        <u-group showBg>
            <u-cell title="标题前插槽"
                    value="cell"
                    isLink>
                <div class="icon-before"
                     slot="icon-before">
                    <div class="img">
                        <img src="./images/lianxiren2.png"
                             style="width:22px; height:22px;"
                             alt="" />
                    </div>
                </div>
            </u-cell>
            <u-cell title="内容后插槽"
                    value="cell"
                    isLink>
                <div class="icon-before"
                     slot="icon-after">
                    <div class="img-after">
                        <img src="./images/lianxiren2.png"
                             style="width:22px; height:22px;"
                             alt="" />
                    </div>
                </div>
            </u-cell>
            <u-cell title="可点击"
                    value="cell"
                    isLink></u-cell>
        </u-group>
    </u-page>
</template>

<script>
import { Page, Group, Cell } from '@engine';
export default {
  components: {
    [Page.name]: Page,
    [Group.name]: Group,
    [Cell.name]: Cell
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
    .test-group {
        margin-bottom: 20px;
    }
    .img,
    .img-after {
        width: 22px;
        height: 22px;
        img {
            width: 22px;
            height: 22px;
        }
    }
    .img {
        margin-right: 10px;
    }
    .img-after {
        margin-left: 10px;
    }
</style>
