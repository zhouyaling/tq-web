<template>
  <ta-form class="attrsCon" layout="horizontal" >
   <ta-form-item
     v-if="attr"
     v-for="(v,k,i) in attr"
     :key="i"
     :labelCol="{ span: 5 }"
     :wrapperCol="{ span: 18 }"
     :label="k"
   >
     <!-- 文本型（text）属性 -->
     <ta-input v-if="v.type==='text'"  :name="k" v-model="v.value" @input.native="updateAttribute"  />
     <!-- 数字型（number）属性 -->
     <ta-input-number v-if="v.type==='number'"  :name="k" v-model="v.value" @change="updateAttribute" />
     <!-- 滑块型 -->
     <ta-slider v-if="v.type==='slider'" :min="v.min" :max="v.max" v-model="v.value" @change="updateAttribute"/>
     <!--<small v-if="v.type==='slider'">{{k+': '+v.value}}</small>-->
     <!--&lt;!&ndash;  标签型（label）属性  &ndash;&gt;-->
     <!--<div v-if="v.type==='label'" class="mu-text-field-label">{{v.value}}</div>-->
       <!--开关（boolean）属性   -->
     <ta-switch v-if="v.type==='boolean'"  v-model="v.value" @change="updateAttribute"  />
     <!--  选择型 (selection) 属性  -->
     <ta-select :allowClear="true" v-if="v.type==='selection'" v-model="v.value"  @change="updateAttribute" >
       <ta-select-option v-for="(item,index) in v.items" :value="item" :key="index" >{{item}}</ta-select-option>
     </ta-select>

     <!--&lt;!&ndash; 图标型 (icon) 属性 Muse-UI专用 &ndash;&gt;-->
     <!--<iconPicker v-if="v.type==='icon'" @change="updateAttribute" v-model="v.value" :name="k"/>-->
     <!--&lt;!&ndash; 图标型 (ionicon) 属性 iView-UI专用 &ndash;&gt;-->
     <!--<ioniconPicker v-if="v.type==='ionicon'" @change="updateAttribute" v-model="v.value" :name="k"/>-->
     <!--&lt;!&ndash; 颜色型 (color) 属性 &ndash;&gt;-->
     <!--<colorPicker v-if="v.type==='color'" @change="updateAttribute" v-model="v.value" :name="k"/>-->
     <!--&lt;!&ndash; 子属性 &ndash;&gt;-->
     <subAttributes v-if="v.children" :keyOfAttr="k" :attributes="v.children" @update="subUpdate" />

   </ta-form-item>
  </ta-form>
</template>

<script>
  export default {
    name: "subAttributes",
    components: {},
    props:{
      attributes: {
        type: Object,
        default: null
      },
      keyOfAttr: {
        type: String,
        default: null
      }
    },
    data() {
      return {
        attr: {}
      }
    },
    created() {
      this.attr = JSON.parse(JSON.stringify(this.attributes))

    },
    mounted() {
    },
    methods: {
      subUpdate(attr) { //收到了子组件的更新
        Object.assign(this.attr, attr)
        this.updateAttribute()

      },
      updateAttribute() { //提交更新到父组件
        if (this.keyOfAttr)
          this.$emit('update', {
            [this.keyOfAttr]: {
              children: this.attr
            }
          })
        else this.$emit('update', this.attr)
      }
    },
    computed: {},
    watch: {
      attributes: {
        deep: true,
        handler(val, oldVal) {
          this.attr = JSON.parse(JSON.stringify(val))
        }
      }
    }
  }
</script>

<style scoped lang="less" type="text/less">
  .attrsCon{

  }
  .ant-form-item{
    margin-bottom: 10px;
  }

</style>
