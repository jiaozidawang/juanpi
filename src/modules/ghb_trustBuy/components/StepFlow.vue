<template>
    <div class="stepFlowWrap">
        <div class="circleStepBox">
            <div class="circleStep nmb-font-white" :class="getCircleStyle(1)">1</div>
            <div class="stepTitle nmb-font-dark">签署单证</div>
        </div>
        <div class="line" :class="getLineStyle(2)" />
        <div class="circleStepBox">
            <div class="circleStep nmb-font-white" :class="getCircleStyle(2)">2</div>
            <div class="stepTitle nmb-font-dark">视频验证</div>
        </div>
        <div class="line" :class="getLineStyle(3)" />
        <div class="circleStepBox">
            <div class="circleStep nmb-font-white" :class="getCircleStyle(3)">3</div>
            <div class="stepTitle nmb-font-dark">订单支付</div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'StepFlow',
  props: {
    step: {
      type: Number,
      default: 1
    }
  },
  data: function () {
    return {
      stepRender: [
        {
          step: 1
        },
        {
          step: 2
        },
        {
          step: 3
        }
      ]
    };
  },
  methods: {
    getCircleStyle (current) {
      return {
        'nmb-bg-t14': this.step >= current,
        'nmb-bg-t3': this.step < current
      };
    },
    getLineStyle (current) {
      return {
        'nmb-border-t5': this.step >= current,
        'active': this.step >= current,
        'nmb-border': this.step < current,
        'positive': this.step < current
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.stepFlowWrap {
    display: flex;

    .circleStepBox {
        width: 60px;

        .circleStep {
            width: 50px;
            height: 50px;
            margin: 0 5px;
            border-radius: 50%;
            text-align: center;
            line-height: 50px;
            font-size: 16px;
        }

        .stepTitle {
            text-align: center;
            font-size: 14px;
            margin-top: 6px;
            height: 20px;
            line-height: 20px;
        }
    }

    .line {
        position: relative;
        top: 25px;
        flex: 1;
        height: 0px;
    }

    .line.positive {
        &::after {
            border-width: 2px;
            border-style: solid;
        }
    }

    .line.active {
        &::after {
            border-width: 2px;
            border-style: dashed;
        }
    }
}
</style>

