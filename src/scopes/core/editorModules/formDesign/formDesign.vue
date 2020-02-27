<template>
  <ta-border-layout
    :layout="{right:'360px'}"
    :header-cfg="{title:formVo.formName}"
    :center-cfg="{layoutConStyle:{padding:'0px'},showBar:true,barHeight:'50px'}"
  >
    <div slot="centerExtraContent" style="text-align: center">
      <span style="font-size: 18px">{{formVo.formName}}</span>
    </div>
    <editor id='tinymce' v-model='tinymceHtml' :init='init'></editor>
    <div class="ed-cpt-con" slot="right">
      <div class="ed-cpt-head">
        <div :class="{active:edCptActiveTab=='1'}" @click="changeEdCptActiveTab(1)">编辑属性</div>
        <div v-if="activeComponent && activeComponent.type=='tyGrid'" :class="{active:edCptActiveTab=='2'}"
             @click="changeEdCptActiveTab(2)">编辑列
        </div>
      </div>
      <div class="ed-cpt-content">
        <div v-if="edCptActiveTab=='1'&& activeComponent">
          <components-attr :component="activeComponent" :saveAttr="saveComponentAttr"></components-attr>
        </div>
        <div v-if="edCptActiveTab=='2' && activeComponent">
          <div style="padding: 10px;box-sizing: border-box">
            <attr-text label="列id" :text.sync="activeComponent['columns'][activeGridCol].dataIndex"></attr-text>
            <attr-text label="列名" :text.sync="activeComponent['columns'][activeGridCol].title"></attr-text>
            <attr-select label="内容对齐方式" selectType="align"
                         :selectValue.sync="activeComponent['columns'][activeGridCol].align"></attr-select>
            <attr-width label="列宽" :width.sync="activeComponent['columns'][activeGridCol].width"
                        :unit="['px','auto']"></attr-width>
            <attr-format :value.sync="activeComponent['columns'][activeGridCol].format" type="format"
                         label="类型"></attr-format>
            <attr-text label="默认值" :text.sync="activeComponent['columns'][activeGridCol].value"></attr-text>
            <div>
              <ta-button @click="saveGridColAttr()" style="float: right">保存</ta-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </ta-border-layout>
</template>

<script>
import tinymce from 'tinymce/tinymce'
import 'tinymce/themes/modern/theme'
import Editor from '@tinymce/tinymce-vue'
import 'tinymce/plugins/image'
import 'tinymce/plugins/link'
import 'tinymce/plugins/code'
import 'tinymce/plugins/table'
import 'tinymce/plugins/lists'
import 'tinymce/plugins/contextmenu'
import 'tinymce/plugins/wordcount'
import 'tinymce/plugins/colorpicker'
import 'tinymce/plugins/textcolor'
import 'tinymce/plugins/preview'
import 'tinymce/plugins/noneditable'
import 'tinymce/plugins/hr'
import './js/tinymce/plugin/tyText'
import './js/tinymce/plugin/tyGrid'
import './js/tinymce/plugin/tyTextarea'
import './js/tinymce/plugin/tyRadio'
import './js/tinymce/plugin/tyCheckbox'
import './js/tinymce/plugin/tySelect'
import './js/tinymce/plugin/tyDate'

export default {
  name: 'form-design',
  components: {
    Editor
  },
  data () {
    var self = this
    var baseCpt = [
      { type: 'tyText', name: '单行文本框' },
      { type: 'tyTextarea', name: '多行文本框' },
      { type: 'tyRadio', name: '单选框' },
      { type: 'tyCheckbox', name: '复选框' },
      { type: 'tySelect', name: '下拉框' },
      { type: 'tyGrid', name: '表格' },
      { type: 'tyDate', name: '日期' }
    ]
    return {
      edCptActiveTab: '1',
      tinymceHtml: '', // 需要存储的demo节点
      components: {}, // 组件节点
      activeComponent: null, // 激活编辑的节点
      activeGridCol: 0, // 激活的列
      init: {
        language_url: 'static/tinymce/zh_CN.js',
        language: 'zh_CN',
        skin_url: 'static/tinymce/skins/lightgray',
        height: document.body.scrollHeight - 182,
        // height: '100%',
        plugins: 'preview link  image code table colorpicker textcolor  contextmenu hr ' +
            'tyText tyGrid tyTextarea tyRadio tyCheckbox tySelect tyDate',
        branding: false,
        statusbar: false,
        menubar: false,
        toolbar1: 'code formPreview formSave fontselect fontsizeselect bold italic underline strikethrough forecolor backcolor  ' +
            '| alignleft aligncenter alignright alignjustify alignnone' +
            '| undo redo | link unlink | table hr ' + 'tyText tyTextarea tyRadio tyCheckbox tySelect tyGrid tyDate',
        auto_focus: true,
        setup: function (editor) {
          // 组件预览按钮
          editor.addButton('formPreview', {
            text: '预览',
            title: '预览表单',
            onclick () {
              localStorage.setItem('ht', self.tinymceHtml)
              localStorage.setItem('da', JSON.stringify(self.components))
              Base.closeTabMenu('d84bb58d8ddf4fa1887314a5178fd056')
              Base.openTabMenu({
                url: 'formPreview.html?formId=' + self.formVo.formId,
                id: 'd84bb58d8ddf4fa1887314a5178fd056',
                name: '预览表单'
              })
            }
          })
          editor.addButton('formSave', {
            text: '保存',
            title: '保存1',
            onclick () {
              self.saveForm()
            }
          })
          // 编辑器内部组件点击进入编辑属性功能
          editor.on('click', self.focusComponent)
          // 组件按钮
          for (let i = 0; i < baseCpt.length; i++) {
            editor.addButton(baseCpt[i].type, {
              text: baseCpt[i].name, // 图标文字说明
              onclick: function () {
                self.itemClick(baseCpt[i].type)
              }
            })
          }
        },
        init_instance_callback: function () {
          self.reFreshObj()
        }
      },
      formVo: {
        formName: '',
        formHtml: '',
        formData: {}
      }
    }
  },
  created () {
    window.onload = () => {
      this.reFreshObj()
    }
  },
  mounted () {
    const param = this.Base.getNowPageParam()
    const self = this
    if (!param.formId) {
      return
    }
    this.Base.submit(null,
      {
        url: 'templateMg/templateMgRestService/getOnlineFormVoByFormId',
        data: {
          formId: param.formId
        }
      }, {
        successCallback: (data) => {
          this.formVo = Object.assign(this.formVo, data.data.formVo)
          this.tinymceHtml = this.formVo.formHtml
          this.components = JSON.parse(this.formVo.formData)
          tinymce.init({})
          // 添加监听
          this.$watch('tinymceHtml', this.tinymceHtmlWatch)
        },
        failCallback: () => {
          this.$message.error('数据获取失败!请刷新试试')
        }
      })
  },
  methods: {
    // 提交当前内容
    saveForm () {
      const sbInfo = {
        formData: JSON.stringify(this.components),
        formHtml: this.tinymceHtml,
        formId: this.formVo.formId
      }
      this.Base.submit(null, {
        url: 'templateMg/templateMgRestService/updateOnlineForm',
        data: sbInfo
      }, {
        successCallback: (data) => {
          this.$message.success('保存成功!')
        }
      })
    },
    changeEdCptActiveTab (key) {
      this.edCptActiveTab = key
    },
    // 元素点击事件,添加dom到editor中去
    itemClick (item) {
      var ed = tinymce.get('tinymce')
      var cpt = ed.plugins[item].renderComponent()
      this.components[cpt.id] = cpt
    },
    // 刷新页面所有的html组件信息
    reFreshObj () {
      // this.components
      const ed = tinymce.get('tinymce')
      Object.keys(this.components).forEach(item => {
        const cpt = this.components[item]
        ed.plugins[cpt.type].reRenderComponent(cpt)
      })
    },
    // 同步components中的元素节点
    syncComponents () {
      var ed = tinymce.get('tinymce')
      var nowlist = ed.getDoc().getElementsByClassName('item-src')

      for (const i in this.components) {
        if (!ed.dom.get(i)) {
          delete this.components[i]
        }
      }
    },
    // 编辑器点击选中组件节点时触发的事件
    focusComponent (e) {
      var e = e || window.event
      // 一般组件
      if (e.target && e.target.getAttribute('data-el') == 'item-src') {
        this.activeComponent = this.components[e.target.id]
        this.edCptActiveTab = 1
      }
      // 如果是radio或者是 checkbox选项那么id为其父元素
      else if (e.target && e.target.getAttribute('data-el') == 'item-src-select') {
        this.activeComponent = this.components[e.target.parentNode.id]
        this.edCptActiveTab = 1
      }
      // 表格列
      else if (e.target && e.target.getAttribute('data-el') == 'tyGrid_header_item') {
        this.activeComponent = this.components[e.target.getAttribute('data-id')]
        this.activeGridCol = e.target.getAttribute('data-i')
        this.edCptActiveTab = 2
      }
    },
    // 保存组件修改后的属性
    saveComponentAttr (value) {
      this.activeComponent = JSON.parse(JSON.stringify(value))
      this.components[value.id] = JSON.parse(JSON.stringify(value))
      var ed = tinymce.get('tinymce')
      var cpt = ed.plugins[value.type].reRenderComponent(value)
    },
    // 表格例属性修改后保存
    saveGridColAttr () {
      var ed = tinymce.get('tinymce')
      var cpt = ed.plugins['tyGrid'].reRenderComponent(this.activeComponent)
    },
    tinymceHtmlWatch (now, old) {
      this.syncComponents()
    }

  },
  watch: {}

}
</script>

<style lang="less" type="text/less">
  textarea {
    resize: none;
  }

  .mce-tinymce.mce-container.mce-panel {
    border-width: 0px !important;
    box-shadow: none;
  }

  .mce-edit-area.mce-container.mce-panel.mce-stack-layout-item.mce-last {
    border-width: 0px !important;
  }

  .ed-cpt-con {
    position: relative;
    height: 100%;

    > .ed-cpt-head {
      background: #fff;
      width: 100%;
      position: absolute;
      top: 0px;
      height: 36px;
      line-height: 36px;
      border-bottom: 0.5px solid @border-color-base;
      padding: 0px 20px;
      z-index: 999;

      > div {
        float: left;
        height: 100%;
        padding: 0px 16px;
        margin-right: 20px;
        cursor: pointer;

        &.active {
          color: @primary-color;
          border-bottom: 1px solid @primary-color;
        }
      }
    }

    > .ed-cpt-content {
      height: 100%;
      box-sizing: border-box;
      padding-top: 40px;
      overflow: auto;

      .beautifyScrollbar();
    }
  }

</style>
