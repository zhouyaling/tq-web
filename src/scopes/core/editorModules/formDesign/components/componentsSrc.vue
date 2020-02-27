<template>

  <div class="components-src">
    <div>基础控件</div>
    <ul class="base-cpt">
      <li v-for="item in baseCpt" @click="itemClick(item)">{{ item.name}}</li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "components-src",
    props: {
      itemClick: {
        type: Function,
        default: function (item) {
         console.log(item);
        }
      }
    },
    data() {
      return {
        baseCpt: [
          {type: 'tyText', name: '单行文本框'},
          {type: 'tyTextarea', name: '多行文本框'},
          {type: 'tyRadio', name: '单选框'},
          {type: 'tyCheckbox', name: '复选框'},
          {type: 'tySelect', name: '下拉框'},
          {type: 'tyGrid', name: '表格'},
        ]
      }
    }
  }
</script>

<style scoped lang="less" type="text/less">
  .components-src {
    width: 100%;
    > div {
      line-height: 30px;
      padding-left: 15px;
      margin-top: 10px;
      font-size: 16px;
    }
    ul {
      padding: 0px;
      margin: 0px;
      height: auto;
      > li {
        list-style: none;
        box-sizing: border-box;
        float: left;
        width: 46%;
        border: 1px solid @border-color-base;
        background: #f7f7f7;
        line-height: 27px;
        margin: 2%;
        font-size: 12px;
        padding: 0 10px;
        cursor: pointer;
      }
    }
  }
</style>
