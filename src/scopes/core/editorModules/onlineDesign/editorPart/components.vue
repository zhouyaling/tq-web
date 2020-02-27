<template>
    <div>
      <ul class="components-list">
        <li draggable="true" @dragstart="dragStart" data-name="row">
          <shanGe></shanGe>
        </li>
        <li draggable="true" @dragstart="dragStart" data-name="Button">
          <ta-button>Button</ta-button>
        </li>
        <li draggable="true" @dragstart="dragStart" data-name="input">
          <ta-input placeholder="输入框"></ta-input>
        </li>
        <li draggable="true" @dragstart="dragStart" data-name="textarea">
          <ta-textarea placeholder="文本域" :rows="3"/>
        </li>
      </ul>
    </div>
</template>

<script>
import ta404UIList from './js/components/UIlist/index'
export default {
  name: 'components',
  components: { ...ta404UIList },
  data () {
    return {}
  },
  created () {
  },
  mounted () {
  },
  methods: {
    dragStart (e) {
      let componentName = e.target.getAttribute('data-name')

      let info = {
        name: componentName,
        ui: 'ta404UI'
      }
      console.log(info)
      e.dataTransfer.setData('info', JSON.stringify(info))
    }
  },
  computed: {},
  watch: {}
}
</script>

<style scoped lang="less" type="text/less">
  .components-list {
    list-style: none;
    padding: 10px;
    >li{
      margin-top: 5px;
      border: 1px dashed #ccc;
      padding: 5px;
    }
  }
</style>
