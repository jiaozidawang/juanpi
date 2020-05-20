/**
 * description: Video Player
 **/
<template>
    <div class="video-wrapper">
      <div id="playerBox" :class="playerType">
        <video-player ref="videoPlayer"
                      id="myVideiPlayer"
                      class="vjs-custom-skin"
                      :playsinline="true" :webkit-playsinline="true"
                      :options="playerOptions"
                      @loadeddata="onPlayerLoadeddata($event)"
                      @playing="onPlay($event)"
                      @timeupdate="ontimeupdate($event)"
                      @play="onPlayerplay($event)"
                      @pause="onPlayerPause($event)"
                      @ended="onPlayerEnded($event)"></video-player>
        <div class="myControlls" :class="playerType">
          <div class="itemWrap" @click="goPlay">
            <div class="playBtn" :class="playBtnClass"></div>
          </div>
          <div class="itemWrap">
            <span class="time">{{ currentTime }}</span>
          </div>
          <div class="processWrap">
            <div class="playedProcess" :style="playedProcessWidth"></div>
          </div>
          <div class="itemWrap">
            <span class="time">{{ totalTime }}</span>
          </div>
          <div class="itemWrap" @click="goFullScreen">
            <div v-if="playerType === 'normal'" class="fullScreenBtn"></div>
            <div v-if="playerType === 'fullscreen'" class="halfScreenBtn"></div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import { videoPlayer } from 'vue-video-player';
import { UButton } from "@engine";
import 'video.js/dist/video-js.css';
import 'vue-video-player/src/custom-theme.css';
import { setSessionStorage, getSessionStorage, hideTitleBar, showTitleBar } from "@bridge";
import videoBG from '../assets/image/videoBGVer.jpg';

export default {

  name: 'VideoPlayerComponent',

  components: {
    videoPlayer,
    UButton
  },

  props: {
    prdCd: {
      type: String
    },
    videoUrl: {
      type: String
    }
  },

  data: function () {
    return {
      // mTopPadding: 44,
      playerType: 'normal',
      playState: 'stop',
      currentTime: '00:00',
      totalTime: '00:00',
      lastPlay: 0,
      lastPlayhasSat: false,
      playedProcessWidth: {
        width: '0%'
      },
      playerOptions: {
        playbackRates: [1.0], // 播放速度
        autoplay: false, // 如果true，浏览器准备好时开始回放
        controls: false, // 控制条
        preload: 'metadata', // 'auto'表示预加载
        muted: false, // 默认情况下将会消除任何音频
        loop: false, // 导致视频一结束就重新开始
        language: 'zh-CN',
        aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例，用冒号分割的两个数字
        fluid: true, // 当true时，video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器
        fullscreen: true,
        sources: [
          {
            type: 'video/mp4',
            src: this.videoUrl.toLowerCase().indexOf('.mp4') > 0 ? this.videoUrl : ''
          },
          {
            type: "video/webm",
            src: this.videoUrl.toLowerCase().indexOf('.webm') > 0 ? this.videoUrl : ''
          }
        ],
        isFullscreen: false,
        poster: videoBG, // 封面地址,
        // fullscreen: {
        //   options: {
        //     navigationUI: 'hide'
        //   }
        // },
        // isFS: true,
        width: document.documentElement.clientWidth,
        notSupportedMessage: '此视频暂无法播放，请稍后再试' // 允许覆盖Video.js无法播放媒体源时显示的默认信息
      }
    };
  },

  computed: {
    player () {
      return this.$refs.videoPlayer.player;
    },
    playBtnClass () {
      return this.playState === 'play' ? 'playerPause' : 'playerPlay';
    },
    playerOriginDom () {
      return document.getElementsByClassName('vjs-tech')[0];
    }
  },

  created () {
    // getSafePadding().then(res => {
    //   this.mTopPadding += res.height * 1;
    // });
  },

  mounted () {
    getSessionStorage('currentVideoPlay').then(res => {
      console.log('currentVideoPlay');
      console.log(res);
      if (res && res.prCd === this.prdCd) {
        // e.tech_.el_.currentTime = res.currentTime;
        this.lastPlay = res.currentTime;
        console.log(this.lastPlay);
      }
    });
  },

  methods: {
    // 自定义播放器控制条
    sec2String (sec) {
      let int = Math.floor(sec / 60);
      let dec = Math.floor(sec - int * 60);
      int = int < 10
              ? `0${int}`
              : `${int}`;
      dec = dec < 10
              ? `0${dec}`
              : `${dec}`;
      return `${int}:${dec}`;
    },

    processWidth () {
      return ((this.playerOriginDom.currentTime || 0) / (this.playerOriginDom.duration || 999) * 100) + '%';
    },

    fakeFullscreen (dom, angle) {
      this.playerType = this.playerType === 'normal'
        ? 'fullscreen'
        : 'normal';
      this.$emit('screen-change', this.playerType);
      let playerDom = document.getElementsByClassName('video-js')[0];
      let videoDom = document.getElementsByClassName('vjs-tech')[0];
      let videoPoster = document.getElementsByClassName('vjs-poster')[0];
      let videoPlayer = document.getElementsByClassName('video-player')[0];
      if (this.playerType === 'fullscreen') {
        hideTitleBar();
        dom.style.MozTransform = "rotate(" + angle + "deg)";
        dom.style.WebkitTransform = "rotate(" + angle + "deg)";
        dom.style.transform = "rotate(" + angle + "deg)";
        setTimeout(() => {
          let offsetWidth = document.body.offsetWidth;
          let offsetHeight = document.body.offsetHeight;
          dom.style.height = offsetWidth + 'px';
          dom.style.width = offsetHeight + 'px';
          dom.style.left = offsetWidth + 'px';
          playerDom.style.height = '100%';
          playerDom.style.width = '100%';
          playerDom.style.height = offsetWidth + 'px';
          playerDom.style.width = offsetHeight + 'px';
          playerDom.classList.add('video-js-fullscreen');
          videoDom.style.width = offsetHeight + 'px';
          videoDom.style.height = offsetWidth + 'px';
          videoPoster.style.width = offsetHeight + 'px';
          videoPoster.style.height = offsetWidth + 'px';
          videoPlayer.style.width = offsetHeight + 'px';
          videoPlayer.style.height = offsetWidth + 'px';
        }, 100);
      } else {
        showTitleBar();
        dom.style.MozTransform = "initial";
        dom.style.WebkitTransform = "initial";
        dom.style.transform = "initial";
        dom.style.height = "initial";
        dom.style.width = "initial";
        dom.style.left = "initial";
        playerDom.style.height = '100%';
        playerDom.style.width = '100%';
        playerDom.classList.remove('video-js-fullscreen');
        videoDom.style.width = '100%';
        videoDom.style.height = '100%';
        videoPoster.style.width = '100%';
        videoPoster.style.height = '100%';
        videoPlayer.style.width = '100%';
        videoPlayer.style.height = '100%';
      }
    },

    goPlay () {
      if (this.playState === 'stop') {
        this.player.play();
        this.playState = 'play';
      } else {
        this.player.pause();
        this.playState = 'stop';
      }
    },

    onPlay (e) {
      this.playState = 'play';
    },

    onPlayerLoadeddata (e) {
      this.totalTime = this.sec2String(this.playerOriginDom.duration);
      this.currentTime = this.sec2String(0);
    },

    ontimeupdate (e) {
      if (!this.lastPlayhasSat) {
        e.tech_.el_.currentTime = Number(this.lastPlay);
        this.lastPlayhasSat = true;
      }
      this.totalTime = this.sec2String(this.playerOriginDom.duration);
      this.currentTime = this.sec2String(this.playerOriginDom.currentTime);
      this.playedProcessWidth.width = this.processWidth();
      // 实时存储这次第播放记录
      setSessionStorage('currentVideoPlay', {
        prCd: this.prdCd,
        currentTime: this.playerOriginDom.currentTime
      });
    },
    goFullScreen () {
      let playerDom = document.getElementById('playerBox');
      this.fakeFullscreen(playerDom, 90);
    },

    onPlayerplay (e) {
      console.log('onPlayerplay');
    },
    onPlayerPause (e) {
    },
    onPlayerEnded (e) {
      this.playState = 'stop';
      setSessionStorage('currentVideoPlay', {
        prCd: this.prdCd,
        currentTime: 0
      });
      this.$emit('play-finish');
    }
  }
};
</script>

<style lang="less" scoped>
@import '../style/mixin.less';

.video-wrapper {
  position: relative;
  z-index: 10;

  .myControlls {
    width: 100%;
    position: absolute;
    display: flex;
    align-items: center;
    bottom: 0;
    left: 0;
    color: #fff;
    box-sizing: border-box;
    background-image: linear-gradient(180deg, rgba(0,0,0,0.00) 0%, rgba(0,0,0,0.44) 83%);

    .processWrap {
      flex: 1;
      background-color: #fff;
      height: 2px;
      padding: 0;

      .playedProcess {
        height: 100%;
        background-color: #3484F5;
      }
    }

    .playerPlay {
      .setBackgroundModuleImage('player-play.png');
    }
    .playerPause {
      .setBackgroundModuleImage('player-pause.png');
    }

    .fullScreenBtn {
      .setBackgroundModuleImage('player-fullscreen.png');
    }

    .halfScreenBtn {
      .setBackgroundModuleImage('player-halfscreen.png');
    }
  }

  .normal {
    .myControlls {
      height: 34px;

      .itemWrap {
        padding-left: 10px;
        padding-right: 10px;
        font-size: 0;
      }

      // .processWrap {
      //   margin-top: 16px;
      // }

      .playBtn {
        width: 12px;
        height: 12px;
      }
      .fullScreenBtn {
        width: 14px;
        height: 14px;
      }

      .halfScreenBtn {
        display: none;
      }

      .time {
        // width: 25px;
        height: 14px;
        line-height: 14px;
        font-size: 12px;
      }
    }
  }

  .fullscreen {
    transform-origin: top left;
    position: absolute;

    .myControlls {
      height: 60px;

      .itemWrap {
        padding: 17px
      }

      // .processWrap {
      //   margin-top: 29px;
      // }

      .playBtn{
        width: 20px;
        height: 20px;
      }
      .halfScreenBtn {
        width: 23px;
        height: 23px;
      }

      .fullScreenBtn {
        display: none;
      }

      .time {
        // width: 44px;
        height: 26px;
        line-height: 26px;
        font-size: 18px;
      }
    }
  }
}
</style>
<style lang="less">
.vjs-poster {
  background-size: cover !important;
}

.video-wrapper .vjs-custom-skin .video-js .vjs-big-play-button {
  margin-top: -37px !important;
  margin-left: -37px !important;
  border-radius: 40px !important;
  border-width: 0 !important;
  height: 74px !important;
  line-height: 74px !important;
  width: 74px !important;
  font-size: 48px !important;
}

.video-js .vjs-tech {
  bottom: 0;
  right: 0;
}


.video-js-fullscreen.vjs-fluid {
  padding-top: 0;
}

</style>
