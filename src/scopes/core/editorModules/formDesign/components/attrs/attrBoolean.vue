<template>
  <ta-form-item
    :label='label'
    :labelCol="{ span: 6 }"
    :wrapperCol="{ span: 18 }"
  >
    <ta-switch :checkedChildren="checkedText" :unCheckedChildren="uncheckedText" :checked="checkedValue" @change="isShow_deal"/>
  </ta-form-item>
</template>

<script>
  export default {
    name: "attr-boolean",
    props: {
      checkedValue: {
        type: Boolean,
        default: true
      },
      label: {
        type: String,
        default: '是否显示'
      },
      checkedText:{
        type:String,
        default:'显示'
      },
      uncheckedText:{
        type:String,
        default:'隐藏'
      }
    },
    methods:{
      isShow_deal(value){
        this.$emit("update:checkedValue",value)
      }
    }
  }
</script>

<style scoped>

</style>
