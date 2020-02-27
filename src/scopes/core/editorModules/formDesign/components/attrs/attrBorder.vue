<template>
  <ta-form-item
    :label='label'
    :labelCol="{ span: 6 }"
    :wrapperCol="{ span: 18 }"
  >
    <ta-radio-group @change="border_deal_type" :value="border.borderType">
      <ta-radio value="none">无边框</ta-radio>
      <ta-radio value="bottom">下边框</ta-radio>
      <ta-radio value="all">全边框</ta-radio>
    </ta-radio-group>
    <ta-select @change="border_deal_style" :value="borderStyleNow" v-if="border.borderType!='none'">
      <ta-select-option v-for="(item,index) in borderStyle" :key="index" :value="index"
                       :data-a="(item.width==border.borderWidth && item.style==border.borderStyle)&& (borderStyleNow=index)">
        <div
          :style="{borderBottom:item.width+' '+item.style+' #ccc' ,height:'18px',display:'inline-block',width:'195px'}"></div>
      </ta-select-option>
    </ta-select>
    <color-picker :value="border.borderColor" @change="border_deal_color"
                  v-if="border.borderType!='none'"></color-picker>
  </ta-form-item>
</template>

<script>
  export default {
    name: "attr-border",
    props: {
      border: {
        type:Object,
        default:function () {
          return{

          }
        }
      },
      label: {
        type: String,
        default: '边框'
      },
    },
    data(){
      return{
        borderStyleNow: 0,
        borderStyle: [{style: "solid", width: '1px'}, {style: "solid", width: '2px'}, {style: "solid", width: '3px'},
          {style: "dashed", width: '1px'}, {style: "dashed", width: '2px'}, {style: "dashed", width: '3px'},
          {style: "dotted", width: '1px'}, {style: "dotted", width: '2px'}, {style: "dotted", width: '3px'}
        ],
      }
    },
    methods: {

      border_deal_type(e) {
        this.border.borderType=e.target.value;
        this.$emit('update:border',this.border);

      },
      border_deal_style(value) {
        this.$set(this.border, 'borderStyle', this.borderStyle[value].style)
        this.$set(this.border, 'borderWidth', this.borderStyle[value].width)
        this.$emit('update:border',this.border);
      },
      border_deal_color(value) {
        this.$set(this.border, 'borderColor', value)
        this.$emit('update:border',this.border);

      },
    }
  }
</script>

<style scoped>

</style>
