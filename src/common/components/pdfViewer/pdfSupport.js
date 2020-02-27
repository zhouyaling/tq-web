export default {
  methods: {
    objectToUrlParam (object) {
      let urlParam = ''
      let urlParamArray = []
      for (let key in object) {
        urlParamArray.push(key + '=' + object[key])
      }
      urlParam = urlParamArray.join('&')
      return urlParam
    },
    objectToUrlJsonParam(object){
      return 'paramJson=' + encodeURIComponent(JSON.stringify(object))
    },
    getPdfHtmlUrl () {
      let pdfHtmlUrlPrefix = process.env.NODE_ENV === 'production'
        ? faceConfig.basePath + faceConfig.staticPublishTarget
        : ''
      return pdfHtmlUrlPrefix + '/static/pdfjs/web/viewer.html'
    },
    buildPdfUrl (restUrl, param, config) {
      return this.getPdfHtmlUrl() + '?' + this.buildPdfUrlParam(restUrl, param, config)
    },
    buildReportPdfUrl (restUrl, raqfilename, param, config) {
      return this.getPdfHtmlUrl() + '?' + this.buildPdfUrlParam(restUrl, {
        ...param,
        raqfilename: raqfilename
      }, config)
    },
    buildPdfUrlParam (restUrl, param, config) {
      let defaultConfig = {
        isSimpleShowMode: false,
        isDownload: false,
        isPrint: true
      }

      config = Object.assign(defaultConfig, config || {})
      let configUrlParam = this.objectToUrlParam(config)

      param = param || {}
      let paramUrlParam = this.objectToUrlJsonParam(param)

      let urlParam = 'fileUrl=' + faceConfig.basePath + '/' + restUrl + '&_modulePartId_=' + Base.getNowPageParam()._modulePartId_

      if (configUrlParam.length > 0) {
        urlParam += '&' + configUrlParam
      }

      if (paramUrlParam.length > 0) {
        urlParam += '&' + paramUrlParam
      }
      return urlParam
    }
  }
}
