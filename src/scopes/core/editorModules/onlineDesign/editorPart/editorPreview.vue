<template>
  <div style="height: 100%;width: 100%">
    <ta-border-layout :layout="{header:'45px'}">
      <div slot="header">
        <span v-if="onlineState.pageInfo.pageName">页面：{{onlineState.pageInfo.pageName}}</span>
        <span v-if="onlineState.templateInfo.templateName" style="margin-left: 20px;">模板：{{onlineState.templateInfo.templateName}}<ta-icon type="form" class="change-btn" @click="changeTemplate"/></span>
      </div>
      <div>
        <pre style="background-color: rgba(227,234,241,0.4)"><code >{{code}}</code></pre>
      </div>
    </ta-border-layout>
  </div>
</template>
<script>
import pretty from 'pretty'
import {mapGetters} from 'vuex'
export default {
  name: 'editorPreview',
  props: {},
  data () {
    return {
      cpt: null,
      data: null,
      moduleTemplate: [],
      viewState: `edit`, // 页面视图状态(edit,preview)
      iframeSrc: `#`
    }
  },
  computed: {
    ...mapGetters({
      onlineState: 'getState'
    }),
    code () {
      return pretty(this.onlineState.templateInfo.templateContent || '')
    }
  },
  mounted () {
  },
  methods: {
    changeTemplate () {
      this.$store.commit('setTemplateInfo', Object.assign({}, this.onlineState.templateInfo, {templateVisible: true}))
    }

  }
}
</script>
<style lang="less" scoped type="text/less">
  .change-btn { cursor: pointer; margin-left: 10px; &:hover { color: @primary-color } }
</style>
