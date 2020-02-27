<template>
  <ta-form-item
               :label='label'
               :labelCol="{ span: 6 }"
               :wrapperCol="{ span: 18 }"
  >
    <ta-input :value="text" :disabled="isDisabled" @input="text_deal"/>
  </ta-form-item>
</template>

<script>
    export default {
      name: "attrText",
      props: {
        text: {
          type: String,
          default: ''
        },
        label:{
          type:String,
          default:'控件id'
        },
        //是否不可用,默认可用
        isDisabled:{
          type:Boolean,
          default:false
        }
      },
      methods:{
        text_deal($event){
          this.$emit('update:text',$event.target.value);
        }
      }

    }
</script>

<style scoped>

</style>
