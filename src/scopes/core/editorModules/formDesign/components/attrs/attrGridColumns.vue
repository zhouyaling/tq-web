<template>
  <ta-form-item
    :label='label'
    :labelCol="{ span: 6 }"
    :wrapperCol="{ span: 18 }"
  >
    <ta-button icon="edit" @click="isShowModal=true">编辑列属性</ta-button>
    <ta-modal
      title="编辑列属性"
      centered
      v-model="isShowModal"
      width="80%" ,
      :bodyStyle="{height:'600px',overflow:'auto',paddingBottom:'0px'}"
      @ok="columns_deal"
      @cancel="isShowModal=false"
      okText="确定"
      cancelText="取消"
    >

      <ta-row style="height:100%">
        <ta-col :span="12" style="height:100%;overflow: auto" class="column_ed_left">
          <drag-list lockAxis="y" v-model="columns_v">
            <drag-list-item v-for="(item, index) in columns_v" :index="index" :key="index" :item="item">
              <ta-row>
                <ta-col :span="14">
                  <ta-input size="small" v-model="item.title" @focus="active_col=index"/>
                </ta-col>
                <ta-col :span="9" :offset="1">
                  <ta-button-group size="small">
                    <ta-button icon="plus" @click="columns_deal_add(index)"></ta-button>
                    <ta-button icon="close" type="danger" @click="columns_deal_delete(index)"></ta-button>
                  </ta-button-group>
                </ta-col>
              </ta-row>

            </drag-list-item>
          </drag-list>

        </ta-col>
        <ta-col :span="12" style="height:100%;overflow: auto" class="column_ed_right">
          <attr-text label="列id" :text.sync="columns_v[active_col].dataIndex"></attr-text>
          <attr-text label="列名" :text.sync="columns_v[active_col].title"></attr-text>
          <attr-select label="内容对齐方式" selectType="align" :selectValue.sync="columns_v[active_col].align"></attr-select>
          <attr-width label="列宽" :width.sync="columns_v[active_col].width" :unit="['px','auto']"></attr-width>
          <attr-format type="format" label="类型" :value.sync="columns_v[active_col].format" ></attr-format>
          <attr-text label="默认值" :text.sync="columns_v[active_col].value"></attr-text>
        </ta-col>
      </ta-row>
    </ta-modal>
  </ta-form-item>
</template>

<script>


  import AttrWidth from "./attrWidth";
  import AttrFormat from "./attrFormat";

  export default {

    components: {
      AttrFormat,
      AttrWidth},
    name: "attr-grid-columns",
    props: {
      label: {
        type: String,
        default: "编辑列属性"
      },
      columns: {
        type: Array,
        default: function () {
          return []
        }
      }
    },
    data() {
      return {
        isShowModal: false,
        columns_v: this.columns,
        active_col: 0

      }
    },
    methods: {
      columns_deal(value) {
        //更新列属性
        this.$emit("update:columns", this.columns_v);
        this.isShowModal = false;
      },
      columns_deal_add(index) {
        this.columns_v.splice(index + 1, 0, {dataIndex: 'tyGrid_col_' + this.createRandomId() + index, title: "填写列名"})
      },
      columns_deal_delete(index) {
        this.columns_v.splice(index, 1)
      },
      //生成随机id
      createRandomId() {
        return (Math.random() * 10000000).toString(16).substr(0, 4) + '_' + (new Date()).getTime() + '_' + Math.random().toString().substr(2, 5);
      }


    },
    watch: {
      columns: {
        deep: true,
        handler(now, old) {
          this.columns_v = JSON.parse(JSON.stringify(now));
        }
      }
    }

  }
</script>

<style scoped type="text/less" lang="less">
  .ant-form-item {
    margin-bottom: 0px;
    .ant-form-item-label {
      letter-spacing: 3px;
    }
  }
</style>
