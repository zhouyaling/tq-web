<template>
  <ta-form-item
               :label='label'
               :labelCol="{ span: 6 }"
               :wrapperCol="{ span: 18 }"
  >
    <ta-input-group compact>
      <ta-input-number style="width:70%" :value="parseInt(height || 0)" :min="0"
                      @change="height_deal"/>
      <ta-select style="width:30%" defaultValue="px" disabled>
        <ta-select-option value='px'>px</ta-select-option>
      </ta-select>
    </ta-input-group>
  </ta-form-item>
</template>

<script>
  export default {
    name: "attr-height",
    props: {
      height: {
        type: String,
        default: '0px'
      },
      label: {
        type: String,
        default: '高度'
      }
    },
    methods:{
      //数据处理
      height_deal(value) {
        this.$emit("update:height", parseInt(value || 0) + 'px')
      }
    }
  }
</script>

<style scoped>

</style>
