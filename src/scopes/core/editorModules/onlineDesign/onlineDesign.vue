<template>
  <div class="assemble">
    <div class="left-content">
      <ta-tabs defaultActiveKey="1" class="fit">
        <ta-tab-pane tab="组件" key="1" class="fit" style="position: relative;">
          <components ref="components"></components>
        </ta-tab-pane>
      </ta-tabs>
    </div>
    <div class="center-content">
      <preview ref="previewRef"></preview>
    </div>
    <div class="right-content">
      <ta-tabs defaultActiveKey="1" class="fit">
        <ta-tab-pane tab="组件设置" key="1" class="fit" style="position: relative;">
          <attributes></attributes>
        </ta-tab-pane>
      </ta-tabs>
    </div>
  </div>
</template>
<script>
  import editorPreview from './editorPart/editorPreview'
  import components from './editorPart/components'
  import preview from './editorPart/preview'
  import attributes from './editorPart/attributes'

  export default {
    name: 'assemble',
    data() {
      return {
        onlineCode: {}
      }
    },
    components: {editorPreview, components, preview, attributes},
    methods: {}
  }
</script>
<style lang="less" scoped type="text/less">
  @top-header: 0px;
  @left-menu: 300px;
  @right-menu: 320px;
  @border: 1px solid @border-color-base;
  .mg-r06 {
    margin-right: 6px;
  }

  .assemble {
    width: 100%;
    height: 100%;
    position: relative;
    .user-select();
  }

  .assemble-title {
    padding: 0 15px;
    font-size: 16px;
  }

  .assemble-header {
    width: 100%;
    height: @top-header;
    line-height: @top-header;
    background-color: #001529;
    color: #ffffff;

    .btn-header {
      display: inline-block;
      padding: 0 15px;
      height: @top-header;
      cursor: pointer;
      .user-select();

      &:hover {
        background-color: #272a3b
      }
    }
  }

  .left-content {
    position: absolute;
    width: @left-menu;
    left: 0;
    top: @top-header;
    bottom: 0;
  }

  .center-content {
    position: absolute;
    left: @left-menu;
    right: @right-menu;
    top: @top-header;
    bottom: 0;
    border-left: @border;
    border-right: @border;
    background-color: #f0f2f5;
  }

  .right-content {
    position: absolute;
    width: @right-menu;
    right: 0;
    top: @top-header;
    bottom: 0;
    overflow: auto;
    .beautifyScrollbar();
  }
</style>
