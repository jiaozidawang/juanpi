<template>
    <div class="ghb_collect_card">
        <div class="ghb_collect_card_content">
            <div class="ghb_collect_card_left">
                <div class="ghb_collect_card_rate">
                    <span>4.95</span>
                    <span class="sign">%</span>
                </div>
                <div class="ghb_collect_card_desc inling-desc">
                    业绩比较基准
                </div>
                <div class="ghb_collect_card_desc inling-desc2">
                    2019-03-10截止
                </div>
                <balance type="nervous">额度紧张</balance>
            </div>

            <div class="ghb_collect_card_right">
                <div class="ghb_collect_card_title">稳定1号2019044期</div>
                <div class="ghb_collect_card_rule divider-box inling-desc">
                    <span class="divider">91天</span>
                    <span class="divider">1万起</span>
                </div>
                <div class="ghb_collect_card_rule inling-desc2">
                    2019-03-11起息 2019-06-11到期
                </div>
                <div class="ghb_collect_card_tip">
                    <inline-tip>封闭式</inline-tip>
                    <inline-tip>行内</inline-tip>
                </div>
            </div>
        </div>
        <div class="hot-top">
            <hot></hot>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
import inlineTip from './inline-tip';
import balance from './balance';
import hot from './hot';
export default {
    name: 'ghb_inline_tip',
    components: {
        inlineTip,
        balance,
        hot
    },
    data() {
        return {};
    }
};
</script>

<style lang="scss">
.ghb_collect_card {
    position: relative;
    margin: 0.2rem 0.3rem;
    .hot-top {
        position: absolute;
        top: -0.03rem;
        right: 0;
    }
}
.ghb_collect_card_content {
    display: flex;
    padding: 0.4rem 0.3rem 0.3rem;
    box-sizing: border-box;
    background-color: #fff;
    border-radius: 0.05rem;
}

.ghb_collect_card_left {
    flex: 4;
    line-height: 1;
    .ghb_collect_card_rate {
        color: red;
        font-weight: bold;
        font-size: 20px;
        .sign {
            font-size: 12px;
        }
    }
}

.ghb_collect_card_right {
    flex: 6;
    line-height: 1;
    .ghb_collect_card_title {
        font-size: 15px;
        font-weight: bold;
    }
    .ghb_collect_card_rule {
        padding-top: 0.2rem;
    }
}

.ghb_collect_card_rate,
.ghb_collect_card_title {
    height: 20px;
    line-height: 20px;
}

.ghb_collect_card_desc {
    padding-top: 0.2rem;
}

.ghb_collect_card_tip {
    padding-top: 0.1rem;
}

.inling-desc {
    color: #888888;
    font-size: 12px;
}

.inling-desc2 {
    color: #888888;
    font-size: 12px;
}

.divider-box {
    font-size: 0;
}

.divider {
    font-size: 12px;
    display: inline-block;
    position: relative;
    padding: 0 0.15rem;
    &:first-child {
        padding-left: 0;
        &::after {
            content: ' ';
            position: absolute;
            right: 0;
            top: 0;
            width: 1px;
            bottom: 0;
            border-right: 1px solid #888888;
            color: #888888;
            transform-origin: 100% 0;
            transform: scaleX(0.5);
        }
    }
}
</style>
