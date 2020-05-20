<template>
    

    <div>
      <div class="pdf">
        <no-data v-if="showNoData" ></no-data>
        <div v-else class="pdf_section">
          <!-- <m-header :title="{title:title}"></m-header> -->
          <div class="pdfTittle" v-if="pdfTittle">{{pdfTittle}}</div>
          <span class="pdf_page_index" v-if="pages">{{currentPage}}/{{pages}}</span>
          
          <canvas v-for="page in pages" :id="'pdf-canvas'+page" :key="page"></canvas>
        </div>
      </div>
      <div class="pdf-bottom" >
         <u-button v-if="showButton" @clickHandler="buttonClickHandler" :disabled="buttonDisabled" noBorderRadius>{{buttonText}} <span v-if="needCountdown && delay > 0">({{delay}}s)</span> </u-button>
      </div>
    </div>
    
    
</template>

<script>
    import PDFJS from 'pdfjs-dist';
    import noData from '@comps/ghb-no-data';
    import { alert, downloadPdf, errorAlertH5, showLoading, hideLoading } from '@core/bridge';
    import { UButton, UPage } from '@engine';
    export default {
      name: 'templateIndex',
      components: {
        noData,
        UPage,
        UButton
      },
      data () {
        return {
          pdfTittle: '', // pdf内部tittle内容
          title: '',
          pdfData: '',
          pdfDoc: null,
          pages: 0,
          pdfInit: false, // pdf初始化完成
          currentPage: 1,
          pageHeight: '99999',
          debounce: 20,
          timer: null,
          showNoData: false,
          needCountdown: false, // 是否需要按钮倒计时
          delay: 20, // 倒计时秒秒数(needCountdown为true时生效)
          showButton: false, // 是否需要展示按钮
          buttonText: '', // 按钮文字 showButton为true时生效
          buttonDisabled: true,
          pushParams: {}, // push参数 包括 url - 页面路径, options - 传入参数， extendParam - 页面参数
        };
      },
      created () {
        this.pdfTittle = window.App.params.pdfTittle;
        showLoading();
    
        this.setViewport();
        this.init();
      },
      mounted () {
        const scrollFn = () => {
          clearTimeout(this.timer);
    
          let scrollTop = document.documentElement.scrollTop ||
                   document.body.scrollTop ||
                   document.querySelector('.pdf_section').scrollTop;
          console.log('window.scrollY', scrollTop, window);
          this.currentPage = Math.floor((window.scrollY + this.pageHeight / 2) / this.pageHeight) + 1;
        };
        window.App.on('scroll', scrollFn, true);
      },
      methods: {
        init () {
          const {type, data, title, pdfUrl, needCountdown, showButton, delay, buttonText, pushParams} = window.App.params;
          if(!needCountdown) {
            this.buttonDisabled = false;
          }
    
          if (showButton && typeof showButton === 'boolean') this.showButton = showButton;
          if (needCountdown && typeof needCountdown === 'boolean') this.needCountdown = needCountdown;
          if (delay && typeof delay === 'number') this.delay = delay;
          if (buttonText && typeof buttonText === 'string') this.buttonText = buttonText;
          if (pushParams && typeof pushParams === 'object') this.pushParams = pushParams;
    
          if (type && type === 'base64') {
            this.pdfData = atob(data);
            this.title = title;
            this.loadFile();
            return;
          }
          this.title = title;
          this.showPdf(pdfUrl);
        },
        setButton () {
          let _this = this;
          if(_this.needCountdown) {
            _this.buttonDisabled = true;
            let timer = setInterval(() => {
              _this.delay --;
              if(_this.delay <= 0) {
                clearInterval(timer);
                _this.buttonDisabled = false;
              }
            }, 1000);
          }
        },
        showPdf (url) {
          downloadPdf(url).then(data => {
            this.pdfData = atob(data.data);
            this.loadFile();
            this.setButton();
          })
          /* eslint-disable handle-callback-err  */
          .catch(err => {
            hideLoading();
            errorAlertH5('文件下载失败：文件不存在');
            // errorAlertH5(JSON.stringify(err));
          });
        },
        loadFile () {
          let _this = this;
          PDFJS.getDocument({ data: this.pdfData }).then(function (pdf) {
            _this.pdfDoc = pdf;
            _this.pages = _this.pdfDoc.numPages;
            _this.$nextTick(() => {
              _this.renderPage(1);
            });
            // this.showNoData = false;
            hideLoading();
          })
          .catch(err => {
            console.log(err);
            alert('文件下载失败：文件不存在');
          });
        },
        renderPage (num) {
          let _this = this;
          this.pdfDoc.getPage(num).then(function (page) {
            console.log('page', page, page.pageNumber);
            let canvas = document.getElementById('pdf-canvas' + num);
            let ctx = canvas.getContext('2d');
            let dpr = window.devicePixelRatio || 1;
            let bsr = ctx.webkitBackingStorePixelRatio ||
                      ctx.mozBackingStorePixelRatio ||
                      ctx.msBackingStorePixelRatio ||
                      ctx.oBackingStorePixelRatio ||
                      ctx.backingStorePixelRatio || 1;
            let ratio = dpr / bsr;
            let viewport = page.getViewport(screen.availWidth / page.getViewport(1).width);
            canvas.width = viewport.width * ratio;
            canvas.height = viewport.height * ratio;
            canvas.style.width = viewport.width + 'px';
            canvas.style.height = viewport.height + 'px';
            ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
            let renderContext = {
              canvasContext: ctx,
              viewport: viewport
            };
            page.render(renderContext);

            console.log('viewport', viewport);
            _this.pageHeight = viewport.height;
            if (_this.pages > num) {
              setTimeout(() => {
                _this.renderPage(num + 1);
              }, 300);
            }
          });
        },
        buttonClickHandler () {
          let { url, options, extendParam } = this.pushParams;
          if(!url) throw new Error('未传入 push URL');
          this.$tools.pushWindow(url, options, extendParam);
        },
        setViewport () {
          let metas = document.getElementsByTagName('meta');
          for (let i = 0; i < metas.length; i++) {
            if (metas[i].name === 'viewport') {
              metas[i].content = 'width=device-width, initial-scale=1.0, user-scalable=yes';
            }
          }
        }
      }
    };
</script>

<style lang="less" scoped>
    @import './index.less';
    .pdf{
      height: 100%;
      padding-bottom: 45px;
      overflow-y: scroll;
      -webkit-overflow-scrolling: touch;
      .pdfTittle {
        padding-top: 60px;
        text-align: center;
        font-size: 14px;
        background: #ffffff;
      }
    }
    .pdf-bottom{
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
    }
</style>

