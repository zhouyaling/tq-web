<template>
  <ta-form-item
               label='字体'
               :labelCol="{ span: 6 }"
               :wrapperCol="{ span: 18 }"
  >

    <ta-select :value="fontFamily" @change="fontFamily_deal">
      <ta-select-option v-for="item in fontFamilyList" :value="item" :key="item"><span :style="{fontFamily:item}">字体 &nbsp;&nbsp;{{item}}</span>
      </ta-select-option>
    </ta-select>

  </ta-form-item>
</template>

<script>
    export default {
        name: "attr-font-family",
      props: {
        fontFamily: {
          type: String,
          default: ""
        },
        label: {
          type: String,
          default: '字体'
        }
      },
      data() {
        return {
          fontFamilyList:['Microsoft YaHei', 'PingFang SC', 'Hiragino Sans GB', '微软雅黑', 'Arial', 'sans-serif',
            'SimSun', 'SimHei', 'Microsoft Yahei', 'Microsoft JhengHei', 'KaiTi', 'NSimSun', 'FangSong',
            'YouYuan', 'LiSu', 'STXihei', 'STKaiti', 'STSong', 'STFangsong', 'STZhongsong', 'STCaiyun', 'STHupo', 'STXinwei', 'STLiti', 'STXingkai', 'FZShuTi', 'FZYaoti'
          ]
        }
      },

      methods:{
        fontFamily_deal(value) {
          this.$emit('update:fontFamily', value);
        },
      }
    }
</script>

<style scoped>

</style>
