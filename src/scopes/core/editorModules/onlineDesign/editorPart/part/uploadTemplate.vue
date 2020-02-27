<template>
  <div id="app">
    <div class="box">
      <h2>手动文件上传</h2>
      <ta-upload
        :fileList="fileList"
        :beforeUpload="beforeUpload"
      >
        <ta-button>
          <ta-icon type="upload" /> Select File
        </ta-button>
      </ta-upload>

      <ta-button @click="fnUpload">上传</ta-button>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'uploadTemplate',
    data () {
      return {
        fileList:[]
      }
    },
    methods: {
      fnUpload(){
        console.log(this.fileList);
        let submitParameter = {
          url: "fileResource/fileResourceManageRestService/addFileResource",
          data:{
            uploadFile:this.fileList[0],
            filePath: '/root/haha',
            fileName:'miao'
          },
          isFormData:true
        };
        let callBack = {
          successCallback: (data) => {
            console.log(data);
          }
        }
        this.Base.submit(null, submitParameter, callBack)
      },
      beforeUpload(file) {
        this.fileList.push(file);
        return false;
      },

    }
  }
</script>

<style scoped lang="less" type="text/less">
  #app {
    padding: 20px
  }
</style>
