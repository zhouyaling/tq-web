<template>
  <ta-form-item
    :label='label'
    :labelCol="{ span: 6 }"
    :wrapperCol="{ span: 18 }"
  >
    <ta-input-group compact>
      <ta-input-number style="width:70%" :value="w_v=width_v(width)" :min="0"
                      @change="width_deal_value"/>
      <ta-select style="width:30%" :value="w_u=width_u(width)"
                @change="width_deal_unit">
        <ta-select-option :value='item' v-for="item in unit" :key="item">{{item}}</ta-select-option>
      </ta-select>
    </ta-input-group>
  </ta-form-item>
</template>
<script>
  export default {
    name: "attrWidth",
    props: {
      width: {
        type: String,
        default: '0px'
      },
      label: {
        type: String,
        default: '宽度'
      },
      unit: {
        type: Array,
        default: function () {
          return ['px', '%', 'auto']
        }
      }
    },
    data() {
      return {
        w_v: this.width_v(this.width),
        w_u: this.width_u(this.width)
      }
    },

    methods: {
      width_v(value) {
        if (value == 'auto' || isNaN(parseInt(value)) == true) {
          return 0
        }
        if (value.indexOf('%') > 0 || value.indexOf('px') > 0) {
          return parseInt(value)
        }
      },
      width_u(value) {
        if (value == 'auto' || isNaN(parseInt(value)) == true) {
          return 'auto'
        }
        if (value.indexOf('%') > 0) {
          return '%'
        }
        if (value.indexOf('px') > 0) {
          return 'px'
        }
      },
      //值
      width_deal_value(value) {

        this.w_v=value

        // if(this.width_v(value)!='auto' && this.width_u(this.width)!='auto'){
        //   this.$emit('update:width', this.width_v(value)+this.width_u(this.width));
        // }else {
        //   this.$emit('update:width', 'auto');
        // }
        this.changeValue();


      },
      //单位
      width_deal_unit(value){
        this.w_u=value;
        this.changeValue();

        // if(this.width_v(this.width)!='auto' && value!='auto'){
        //   this.$emit('update:width', this.width_v(this.width)+value);
        // }else{
        //   this.$emit('update:width', 'auto');
        // }
      },
      changeValue(){
        if(this.w_u=='auto'){
          this.$emit('update:width', 'auto');
        }else{
          this.$emit('update:width', this.w_v+this.w_u);
        }
      }

    }

  }
</script>

<style scoped>

</style>
