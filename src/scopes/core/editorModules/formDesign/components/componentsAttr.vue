<template>
  <div class="components-attr">
    <ta-form>
      <attr-text v-if="attrList.id" :text="cpt.id" :isDisabled="true"></attr-text>
      <attr-width v-if="attrList.width"  :width.sync="cpt.style.width"></attr-width>
      <attr-width v-if="attrList.height" label='高度' :width.sync="cpt.style.height" :unit="['px','auto']"></attr-width>
      <attr-select v-if="attrList['font-size']" :selectValue.sync="cpt.style['font-size']"></attr-select>
      <attr-font-family v-if="attrList['font-family']" :fontFamily.sync="cpt.style['font-family']"></attr-font-family>
      <attr-color v-if="attrList['color']" :color.sync="cpt.style.color"></attr-color>
      <attr-color v-if="attrList['background-color']" label="背景颜色"
                  :color.sync="cpt.style['background-color']"></attr-color>
      <attr-border v-if="attrList['border']" :border.sync="cpt.style.border"></attr-border>
      <attr-text v-if="attrList['value']" label='默认值' :text.sync="cpt.value" :isDisabled="false"></attr-text>
      <attr-boolean label="显示时间" v-if="attrList.showTime" :checkedValue.sync="cpt.showTime"></attr-boolean>

      <attr-format v-if="attrList['format']" :value.sync="cpt.format" type="format" label="类型"></attr-format>

      <attr-boolean v-if="attrList.isShow" :checkedValue.sync="cpt.isShow"></attr-boolean>
      <attr-boolean label="列边框" v-if="attrList.bordered" :checkedValue.sync="cpt.bordered"></attr-boolean>
      <attr-boolean label="分页" v-if="attrList.pagination" :checkedValue.sync="cpt.pagination"></attr-boolean>
      <attr-number v-if="attrList.pagination && cpt.pagination" label="分页大小" :number.sync="cpt.pageSize"></attr-number>
      <attr-boolean label="序号列" v-if="attrList.isIndex" :checkedValue.sync="cpt.isIndex"></attr-boolean>
      <attr-number v-if="attrList.defaultRows" label="初始行数" :number.sync="cpt.defaultRows"></attr-number>
      <attr-grid-columns v-if="attrList.columns" :columns.sync="cpt.columns"></attr-grid-columns>
      <!--radio属性-->

      <attr-width label="选项高度" v-if="attrList.itemHeight" :width.sync="cpt.itemHeight" :unit="['px','auto']"></attr-width>
      <attr-width label="选项宽度" v-if="attrList.itemWidth" :width.sync="cpt.itemWidth"></attr-width>

      <attr-format v-if="attrList['layout']" :value.sync="cpt.layout" type="layout" label="布局"></attr-format>
      <attr-select-items :value.sync="cpt.value"  v-if="attrList['selectItems']" :selectItems.sync="cpt.selectList"></attr-select-items>
      <attr-select-items-c :value.sync="cpt.value"  v-if="attrList['selectItemsC']" :selectItems.sync="cpt.selectList"></attr-select-items-c>
      <attr-select-items-c :value.sync="cpt.value"  v-if="attrList['selectItemsSe']" :selectItems.sync="cpt.options"></attr-select-items-c>

    </ta-form>

  </div>

</template>

<script>


  //配置组件要显示的想
  import AttrNumber from "./attrs/attrNumber";
  import AttrSelectItems from "./attrs/attrSelectItems";

  const attrTypeList = {
    tyText: {
      'id': true,
      'height': true,
      'width': true,
      'font-size': true,
      'font-family': true,
      'color': true,
      'background-color': true,
      'border': true,
      'format': true,
      'value': true,
      'isShow': true,//是否显示空间的控制
    },

    tyTextarea: {
      'id': true,
      'height': true,
      'width': true,
      'font-size': true,
      'font-family': true,
      'color': true,
      'background-color': true,
      'isShow': true,//是否显示空间的控制
    },
    tyRadio: {
      'id': true,
      'itemHeight': true,
      'itemWidth': true,
      'font-size': true,
      'font-family': true,
      'color': true,
      'background-color': true,
      'layout': true,//布局
      'isShow': true,//是否显示空间的控制
      'selectItems': true,//是否显示选择选项
    },
    tyCheckbox: {
      'id': true,
      'itemHeight': true,
      'itemWidth': true,
      'font-size': true,
      'font-family': true,
      'color': true,
      'background-color': true,
      'layout': true,//布局
      'isShow': true,//是否显示空间的控制
      'selectItemsC': true,//是否显示选择选项
    },
    tyGrid: {
      'id': true,
      'height': true,
      'width': true,
      'isIndex': true,//是否显示序号
      'columns': true,//列属性
      'bordered': true,//是否显示表格边框
      'pagination': true,//是否显示分页
      'defaultRows': true,//默认有多少行显示在表格里面
      'isShow': true,//是否显示空间的控制
    },
    tySelect:{
      'id': true,
      'height': true,
      'width': true,
      'font-size': true,
      'font-family': true,
      'isShow': true,//是否显示空间的控制
      'selectItemsSe': true,//是否显示选择选项
    },
    tyDate: {
      'id': true,
      'height': true,
      'width': true,
      'font-size': true,
      'font-family': true,
      'color': true,
      'background-color': true,
      'value': true,
      'isShow': true,
      'showTime':true
    },
  }


  export default {
    components: {
      AttrSelectItems,
      AttrNumber
    },
    name: "components-attr",
    props: {
      component: {
        type: Object,
        default: function () {
          return {};

        }
      },
      saveAttr: {
        type: Function,
        default: function () {

        }
      }
    },
    data() {
      return {
        cpt: {},
        attrList: {},
        model: {
          isSelectOptions: false
        }

      }
    },
    mounted() {

    },
    methods: {
      saveCptAttr() {
        this.saveAttr(this.cpt);
      },
      bindAttrWatch() {
        this.unAttrWatch = this.$watch('cpt', function (now, old) {
          this.saveAttr(this.cpt)
        }, {deep: true})
      },

    },
    watch: {
      //维持prop数据的向下传递性
      component: {
        immediate: true,
        handler: function (now, old) {
          if (typeof this.unAttrWatch == "function") this.unAttrWatch();
          this.cpt = now;
          this.attrList = attrTypeList[now.type];
          this.bindAttrWatch();
        }
      }
    }
  }
</script>

<style scoped type="text/less" lang="less">
  .components-attr {
    padding: 10px;
  }

  .ant-form-item {
    margin-bottom: 0px;
    .ant-form-item-label {
      letter-spacing: 3px;
    }
  }


</style>
