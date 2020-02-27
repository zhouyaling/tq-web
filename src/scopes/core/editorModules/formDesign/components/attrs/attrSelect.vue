<template>
  <ta-form-item
    :label='label'
    :labelCol="{ span: 6 }"
    :wrapperCol="{ span: 18 }"
  >

    <ta-select :value="selectValue" @change="select_deal" style="width: 100%">
      <ta-select-option v-for="item in selectList" :key="item">{{item}}</ta-select-option>
    </ta-select>
  </ta-form-item>
</template>

<script>
  export default {
    name: "attr-select",
    props: {
      selectValue: {
        type: String,
        default: ""
      },
      label: {
        type: String,
        default: '字号'
      },
      selectType: {
        type: String,
        default: 'font-size'
      }
    },
    data() {
      var obj = {
        'font-size': ['12px', '14px', '16px', '18px', '20px', '24px', '36px'],
        'align': ['left', 'right', 'center']
      }
      return {
        selectObj: obj,
        selectList: obj[this.selectType]
      }
    },
    mounted(){
      //给一个初始值
      // if(!selectValue){
      //
      // }
    },
    methods: {
      select_deal(value) {
        this.$emit('update:selectValue', value)
      },
    }
  }

</script>

<style scoped>

</style>
