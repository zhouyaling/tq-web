<template>
  <ta-form-item
    :label='label'
    :labelCol="{ span: 6}"
    :wrapperCol="{ span: 18 }"
  >
    <color-picker :value="color" @change="color_deal"></color-picker>
  </ta-form-item>
</template>

<script>
  export default {
    name: "attr-color",
    props: {
      color: {
        type: String,
        default: ''
      },
      label: {
        type: String,
        default: '文字颜色'
      }
    },
    methods:{
      color_deal(value) {
        this.$emit('update:color', value)
      },
    }
  }
</script>

<style scoped>

</style>
