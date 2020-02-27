<template>
  <div class="iframeList">
    <iframe :style="{display:activeTab.module=='worktable'?'block':'none'}"
            id="worktableIframe"
            :src="worktable"
            frameborder="none"
            frameBorder="0"
            scrolling="auto">
    </iframe>
    <iframe :style="{display:activeTab.module==menu.module?'block':'none'}"
            :id="menu.module"
            :key="menu.id"
            v-for="menu in iframeList"
            :src="srcGetters(menu)"
            frameborder="none"
            frameBorder="0"
            scrolling="auto">
    </iframe>
    <ta-page-tool v-if="isPageTool" :toolMenu="toolMenu" :isRefresh="false"></ta-page-tool>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'iframe-list',
  data () {
    return {
      src: '',
      CacheWebStorage: null,
      toolMenu: [{
        icon: 'rocket',
        name: '刷新全部',
        onClick: () => {
          this.CacheWebStorage.cleanData()
          window.location.reload()
        }
      }, {
        icon: 'sync',
        name: '刷新本页',
        onClick: () => {
          top.indexTool.reload()
        }
      }]
    }
  },
  created () {
    this.CacheWebStorage = this.Base.webStorage.init('Ta$CacheStorage')
  },
  computed: {
    ...mapGetters({
      tabList: 'getTabMenuList',
      iframeList: 'getIframeList',
      activeTab: 'getActiveIframe',
      state: 'getStateValue'
    }),
    srcGetters (menu) {
      return (menu) => {
        let src = '', _modulePartId_ = ''
        if (menu.module == this.activeTab.module) {
          src = menu.module + '#/' + this.activeTab.part
          _modulePartId_ = '_modulePartId_=' + this.activeTab.partId
        } else {
          src = menu.module + '#/' + menu.part
          _modulePartId_ = '_modulePartId_=' + menu.partId
        }

        if (src.indexOf('?') > -1) {
          src += '&' + _modulePartId_
        } else {
          src += '?' + _modulePartId_
        }
        return src
      }
    },
    isPageTool () {
      const { notPageTool } = this.state
      /* faceConfig.js 中配置的菜单不显示 */
      return notPageTool.indexOf(this.activeTab.module) == -1 && notPageTool.indexOf(this.activeTab.partId) == -1
    },
    worktable () {
      const { worktable } = this.state
      return worktable.url == 'workTablePage.html' ? 'workTablePage.html#/page?_modulePartId_=worktable' : worktable.url + '?_modulePartId_=worktable'
    }
  }
}
</script>
<style scoped lang="less" type="text/less">
  .iframeList {
    width: 100%;
    height: 100%;
    .user-select();

    iframe {
      width: 100%;
      height: 100%;
    }
  }
</style>
