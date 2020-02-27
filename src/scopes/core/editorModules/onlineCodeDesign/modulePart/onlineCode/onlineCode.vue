<template>
  <div style="width: 100%;height: 100%;position: relative" id="codeCon">
    <ta-border-layout v-if="isRefresh"
                      :center-cfg="{showBar:true}"
    >
      <div slot="centerExtraContent">
        <div style="float: left;">
          <h4>{{formVo.formName}}</h4>
        </div>
        <div style="float: right">
          <ta-button @click="fnPreview" type="primary">预览</ta-button>
          <ta-button @click="saveFn" type="primary">保存</ta-button>
        </div>
      </div>
      <ta-drawer
        title="预览"
        width=720
        placement="right"
        :closable="true"
        :visible="visible"
        @close="closeDrawer"
        :getContainer="getContainer"
      >
        <iframe :src="iframeSrc" frameborder="0" class="iframeStyle"></iframe>
      </ta-drawer>
      <codemirror v-model="formVo.formHtml" :options="cmOptions"></codemirror>
    </ta-border-layout>

  </div>
</template>

<script>

  import {codemirror} from 'vue-codemirror-lite'

  require('codemirror/mode/javascript/javascript')
  require('codemirror/mode/vue/vue')
  require('codemirror/addon/hint/show-hint.js')
  require('codemirror/addon/hint/show-hint.css')
  require('codemirror/addon/hint/javascript-hint.js')

  export default {
    name: "onlineCode",
    components: {codemirror},
    data() {
      return {
        formVo:{
          formHtml:'',
          formId:'',
          formName:''
        },
        visible: false,
        iframeSrc: `#`,
        isRefresh: true,
        cmOptions: {
          // codemirror options
          tabSize: 4,
          mode: 'text/x-vue',
          lineNumbers: true,
          line: true
          // more codemirror options, 更多 codemirror 的高级配置...
        }
      }
    },
    created() {
      this.getData()
    },
    mounted() {

    },
    methods: {
      //获取数据
      getData() {
        let  urlParam =this.Base.getNowPageParam();
        if (Object.keys(urlParam).length > 0 && urlParam['formId']) {
           this.Base.submit(null,{
             url:'/templateMg/templateMgRestService/getOnlineFormVoByFormId',
             data:{
              formId:urlParam['formId']
             }
           },{
             successCallback:(data)=>{
                this.$set(this.formVo,'formHtml',data.data.formVo.formHtml||'')
                this.$set(this.formVo,'formName',data.data.formVo.formName||'')
                this.$set(this.formVo,'formId',data.data.formVo.formId||'')
             }
           })
        } else {
          //如果没有formId那么从本地取
          // onlineDa = JSON.parse(localStorage.getItem('onlineDa'));
          // onlineHtml = localStorage.getItem('onlineHtml');
        }
        return {
          // onlineDa: onlineDa,
          // onlineHtml: onlineHtml
        }
      },
      // 设置抽屉的显示地方
      getContainer() {
        return document.getElementById(`codeCon`)
      },
      fnPreview() {
        this.showDrawer();
        localStorage.setItem('onlineHtml', this.formVo.formHtml);
        this.iframeSrc = 'onlinePreview.html';
      },
      showDrawer() {
        this.visible = true
      },
      closeDrawer() {
        this.visible = false;
        this.deleteFile();
      },

      // 删除预览服务上的文件
      deleteFile() {
        this.iframeSrc = ''
      },
      saveFn() {
        this.Base.submit(null, {
          url: `templateMg/templateMgRestService/updateTemplate`,
          data: {
            templateId: this.formVo.formId,
            templateStr: this.formVo.formHtml
          },
        }, {
          successCallback: () => {
            this.$message.success(`保存成功!`);
          }
        })
      },


    },

  }
</script>

<style type="text/less">
  .vue-codemirror-wrap {
    height: 100%;
  }

  .CodeMirror {
    height: auto;
  }

  .iframeStyle {
    width: 100%;
    height: 100%;
  }

</style>
