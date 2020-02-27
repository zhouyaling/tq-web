/**
 * pdf.js 扩展  add by xp
 */
function webViewerExtLoad () {
  //* *支持控制下载和打印按钮
  let queryString = document.location.search.substring(1)
  let parts = queryString.split('&')
  let params = Object.create(null)
  for (let i = 0, ii = parts.length; i < ii; ++i) {
    let param = parts[i].split('=')
    let key = param[0]
    let value = param.length > 1 ? param[1] : null
    params[decodeURIComponent(key)] = decodeURIComponent(value)
  }

  if (!params.file) {
    // NOTE 上面转了小写
    let fileUrl = params.fileUrl

    let paramStr = ''
    let queryParamArray = []
    for (let paramKey in params) {
      if (paramKey == 'fileUrl') continue
      queryParamArray.push(paramKey + '=' + encodeURIComponent(params[paramKey]))
    }
    paramStr = queryParamArray.join('&')
    fileUrl = fileUrl + '?' + paramStr

    setTimeout(function () {
      // NOTE 需要先将PDF默认的加载的文件配置去调，不然就得加长此处代码执行等待时间
      PDFViewerApplication.close()
      PDFViewerApplication.open(fileUrl, {
        withCredentials: true,
        scale: 'page-width'
      })
    }, 0)
  }

  if (params.isSimpleShowMode === 'true') {
    // 覆盖样式
    let link = document.createElement('link')
    link.type = 'text/css'
    link.rel = 'stylesheet'
    link.href = 'viewer-extend.css'
    document.getElementsByTagName('head')[0].appendChild(link)
    // 隐藏默认工具条
    PDFViewerApplication.appConfig.toolbar.container.classList.add('hidden')
  }

  let isDownload = params.isDownload !== 'false'
  let isPrint = params.isPrint !== 'false'

  if (!isDownload) {
    PDFViewerApplication.appConfig.toolbar.download.setAttribute('hidden', 'true')
    PDFViewerApplication.appConfig.secondaryToolbar.downloadButton.setAttribute('hidden', 'true')
  }
  if (!isPrint) {
    PDFViewerApplication.appConfig.toolbar.print.setAttribute('hidden', 'true')
    PDFViewerApplication.appConfig.secondaryToolbar.printButton.setAttribute('hidden', 'true')
  }

  window.toDownLoad = function () {
    PDFViewerApplication.download()
  }

  window.toPrint = function () {
    window.print()
  }

  // PDFViewerApplication.appConfig.toolbar.openFile.setAttribute('hidden', 'true')
  // PDFViewerApplication.appConfig.secondaryToolbar.openFileButton.setAttribute('hidden', 'true')
}
if (document.readyState === 'interactive' || document.readyState === 'complete') {
  webViewerExtLoad()
} else {
  document.addEventListener('DOMContentLoaded', webViewerExtLoad, true)
}
