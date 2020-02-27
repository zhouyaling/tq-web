<template>
  <ta-form-item
               :label='label'
               :labelCol="{ span: 6 }"
               :wrapperCol="{ span: 18 }"
  >

      <ta-input-number :value="parseInt(number || 0)" :min="0"
                      @change="number_deal"/>


  </ta-form-item>
</template>

<script>
  export default {
    name: "attr-number",
    props: {
      number: {
        type: Number,
        default: 0
      },
      label: {
        type: String,
        default: '数值'
      }
    },
    methods:{
      //数据处理
      number_deal(value) {
        this.$emit("update:number", parseInt(value || 0))
      }
    }
  }
</script>

<style scoped>

</style>
