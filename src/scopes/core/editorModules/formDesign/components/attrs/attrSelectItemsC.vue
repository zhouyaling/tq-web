<template>
  <ta-form-item
    :label='label'
    :labelCol="{ span: 6 }"
    :wrapperCol="{ span: 18 }"
  >
    <ta-button icon="edit" @click="isShowModal=true">编辑列属性</ta-button>
    <ta-modal
      title="编辑选项"
      centered
      v-model="isShowModal"
      width="70%" ,
      :bodyStyle="{height:'400px',overflow:'auto',paddingBottom:'0px'}"
      @ok="selectItems_deal"
      @cancel="isShowModal=false"
      okText="确定"
      cancelText="取消"
    >
      <ta-checkbox-group name="checkboxGroup" v-model="select_v" @change="changeSelect">
        <drag-list lockAxis="y" v-model="selectItems_v">
          <drag-list-item v-for="(item, index) in selectItems_v" :index="index" :key="index" :item="item">

            <ta-row>
              <ta-col :span="1">
                <ta-checkbox :value="item.value" ></ta-checkbox>
              </ta-col>
              <ta-col :span="16">
                <ta-row>
                  <ta-input-group :compact="true">
                    <ta-input style="width: 50%" addonBefore="value" v-model="item.value"  />
                    <ta-input style="width: 50%" addonBefore="label" v-model="item.label" />
                  </ta-input-group>
                </ta-row>
              </ta-col>
              <ta-col :span="6" :offset="1">
                <ta-button-group compact>
                  <ta-button icon="plus" @click="select_deal_add(index)"></ta-button>
                  <ta-button icon="close" type="danger" @click="select_deal_delete(index)"></ta-button>
                </ta-button-group>
              </ta-col>
            </ta-row>

          </drag-list-item>
        </drag-list>
      </ta-checkbox-group>
    </ta-modal>
  </ta-form-item>
</template>

<script>
  export default {
    name: "attr-select-items-c",
    props: {
      label: {
        type: String,
        default: '编辑选项'
      },
      type: {
        type: String,
        default: 'radio'
      },
      value:{//选中的值

      },
      selectItems: {
        type: Array,
        default: function () {
          return []
        }
      }
    },
    data() {
      return {
        isShowModal: false,
        selectItems_v: this.selectItems,
        active_col: 0,
        select_v:this.value||[]
      }
    },
    methods: {
      selectItems_deal() {
        //更新列属性
        console.log(this.selectItems_v);
        this.$emit("update:selectItems", this.selectItems_v);
        this.isShowModal = false;
      },
      select_deal_add(index) {
        this.selectItems_v.splice(index + 1, 0, {value: 'select_item_' + this.createRandomId() + index, label: ""})

      },
      select_deal_delete(index) {
        this.selectItems_v.splice(index, 1)
      },
      //生成随机id
      createRandomId() {
        return (Math.random() * 10000000).toString(16).substr(0, 4) + '_' + (new Date()).getTime() + '_' + Math.random().toString().substr(2, 5);
      },
      changeSelect(checkedValue){
        console.log(checkedValue);
        this.$emit("update:value", checkedValue);
      }


    },
    watch:{
      select_v(now,old){
        console.log('select_v',now)
      }
    }
  }
</script>

<style scoped>

</style>
