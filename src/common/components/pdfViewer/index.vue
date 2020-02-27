<template>
<div class="divContent">
  <ta-container-mask :show="isLoading"></ta-container-mask>
  <iframe v-show="!isLoading" id="pdfIframe" :src="pdfSrc" height="100%" width="100%" frameborder="0"></iframe>
</div>
</template>

<script>
/*import pdfSupport from './pdfSupport'*/
export default {
  name: 'pdfViewer',
  /*mixins: [pdfSupport],*/
  props: {
    restUrl: {
      type: String,
      default: ''
    },
    isSimpleShowMode: {
      type: Boolean,
      default: false
    },
    isDownload: {
      type: Boolean,
      default: false
    },
    isPrint: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      isLoading: false,
      pdfSrc: ''
    }
  },
  mounted () {
    // iframe 加载事件
    let self = this
    let iframe = document.getElementById('pdfIframe')
    if (!0) { // 如果不是IE，IE的条件注释
      iframe.onload = function () {
        self.isLoading = false
      }
    } else {
      iframe.onreadystatechange = function () { // IE下的节点都有onreadystatechange这个事件
        if (iframe.readyState == 'complete') {
          self.isLoading = false
        }
      }
    }
  },
  methods: {
    showRaq (raqFileKey, raqParam, raqRestUrl) {
      this.show({
        ...raqParam,
        raqfilename: raqFileKey
      }, raqRestUrl || 'tarunqianresource/taRunqianResourcePrint/printAsPdf')
    },
    show (restParam, restUrl) {
      this.isLoading = true
      this.pdfSrc = ''
      if (restUrl == null || typeof restUrl == 'undefined') restUrl = this.restUrl
      this.$nextTick(() => {
        this.pdfSrc = this.buildPdfUrl(restUrl, restParam, {
          isSimpleShowMode: this.isSimpleShowMode,
          isDownload: this.isDownload,
          isPrint: this.isPrint
        })
      })
    },
    toDownload () {
      window.frames['pdfIframe'].contentWindow.toDownLoad()
    },
    toPrint () {
      window.frames['pdfIframe'].contentWindow.toPrint()
    }
  }
}
</script>

<style scoped>
.divContent{
  height: 100%;
  overflow:hidden
}
</style>
