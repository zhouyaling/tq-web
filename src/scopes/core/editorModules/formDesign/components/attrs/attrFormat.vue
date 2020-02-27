<template>
  <ta-form-item
    :label='label'
    :labelCol="{ span: 6 }"
    :wrapperCol="{ span: 18 }"
  >
    <ta-select :value="value" @change="value_deal" style="width: 100%">
      <ta-select-option v-for="(item,index) in list[type]" :key="item.type" :value="item.type">
        {{item.name}}
      </ta-select-option>
    </ta-select>
  </ta-form-item>
</template>

<script>
  export default {
    name: "attr-format",
    props: {
      value: {
        type: String,
        default: 'text'
      },
      label: {
        type: String,
        default: '类型'
      },
      type: {
        type: String,
        default:'format'
      }
    },
    data() {

      return {
        list:{
          format: [
            {type: "text", name: "文本"},
            {type: 'number', name: '数值'},
            // {type: 'date', name: '日期'},
            // {type: 'time', name: '时间'},
            // {type: 'datetime', name: '日期时间'},
            // {type: 'rangDate', name: '日期区间'},
            {type: 'email', name: '邮箱'},
            {type: 'phone', name: '手机号码'}
          ],
          layout: [
            {type: 'horizon', name: '水平'},
            {type: 'vertical', name: '垂直'}
          ]
        }
      }
    },
    methods: {
      value_deal(value) {
        this.$emit('update:value', value);
      }
    }
  }


</script>

<style scoped>

</style>
