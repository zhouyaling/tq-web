<template>
  <div>
    <ta-button type="primary"  @click="saveEmployeeBaseInfo()">保存</ta-button>
      <ta-form :autoFormCreate="(form)=>{this.employeeBaseInfoForm = form}" >
        <ta-row>
            <ta-form-item
              label='姓名'
              v-bind="baseInfoFormItemLayout"
              fieldDecoratorId="humanName"
              hasFeedback
              :fieldDecoratorOptions="{rules: [{ min: 100, message: '不少于' }]}"
            >
              <ta-input  />
            </ta-form-item>
        </ta-row>
      </ta-form>
  </div>
</template>

<script>
  import api from '../api'

  export default {
    name: "employeeBaseInfo",
    props: {
      humanId: "",
      spinning:""
    },
    data() {
      return {
        baseInfoFormItemLayout: {
          labelCol: {span: 6},
          wrapperCol: {span: 18}
        },
        baseInfoFormItemLargeLabelLayout: {
          labelCol: {span: 9},
          wrapperCol: {span: 15}
        },
        baseInfoFormRowItemLayout: {
          labelCol: {span: 3},
          wrapperCol: {span: 21}
        }
      }
    },
    mounted() {

    },
    methods: {

      saveEmployeeBaseInfo() {
          this.employeeBaseInfoForm.validateFields(
              (err) => {

              }
          );

          api.saveEmployeeBaseInfo({}, (data) => {
          });

      }

    }
  }
</script>

<style scoped>
  .lable-class >>> .ant-form-item-label label{
    white-space: pre-line;
  }
</style>
