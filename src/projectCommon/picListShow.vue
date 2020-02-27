<template>
  <ta-modal title="图片" :visible="visible" :width="width" :height="400" class="tongkuang-madal"  @cancel="closeModal">
       <ta-timeline>
        <ta-timeline-item v-for="(item ,index) in pic" :key="index">
          <ta-icon slot="dot" type="clock-circle-o" style="fontSize: '16px'"/>
          <div class="header-info">
            <div class="img-box" >
              <img class="header-img" v-bind:src="item.ossUrl" alt="">
            </div>
            <div class="header-text">
              <p><span>&nbsp;&nbsp;{{item.cameraName}}</span></p>
              <p><span>&nbsp;&nbsp;{{item.createTime}}</span></p>
            </div>
          </div>
        </ta-timeline-item>
         </ta-timeline>
    <template slot="footer">
      <ta-button type="primary" @click="closeModal">确定</ta-button>
    </template>
  </ta-modal>
</template>
<script>
export default {
  name: "showModalPic",
  props: ["visible", "pic", "width", "height"],
  data() {
    return {};
  },
  methods: {
    closeModal() {
      this.$emit("close");
    }
  }
};
</script>
<style type="text/less" lang="less">
.tongkuang-madal .ant-modal-body{
  overflow-x: hidden;
  overflow-y: scroll!important;
}
</style>

<style type="text/less" lang="less" scoped>

.header-info {
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
}

.header-info p {
  margin: 0 !important;
}

.img-box {
  width: 100px;
  height: 100px;
  border: 1px solid #ccc;
  border-radius: 4px;
  position: relative;
}

.img-box .header-img {
  width: 100%;
  height: 100%;
  border-radius: 4px;
}

.img-box .tag {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  position: absolute;
  left: -20px;
  top: -20px;
}

.header-text {
  display: flex;
  flex-direction: column;
  margin-left: 4%;
  width: 65%;
  font-size: 16px;
  color: #001629;
}

.header-text p {
  margin-bottom: 10px !important;
}

.header-text .header-label {
  font-size: 14px;
  color: #979797;
}

.visit-info {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 33%;
  font-size: 16px;
}

.visit-info p {
  margin-bottom: 10px !important;
}

.spec-number {
  font-family: din;
  font-size: 30px;
  color: #1890ff;
  display: inline-block;
  margin: 0 10px;
}

.spec-number1 {
  font-family: din;
  font-size: 14px;
  color: #1890ff;
  letter-spacing: 0;
  margin: 0 2px;
}

.time-card {
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
}

.time-tip {
  font-family: pingfang-light;
  font-size: 14px;
  color: #c9c9c9;
  letter-spacing: 0;
  margin: 0 23px 0 10px;
  width: 14px;
  line-height: 20px;
  text-align-last: center;
  text-align: center;
}

.list-box ul li:nth-child(1) .time-tip {
  color: #2079f9 !important;
}
.list-box {
  margin-top: 30px;
}

.time-card-box {
  background: #ffffff;
  box-shadow: 0 2px 20px 0 rgba(48, 153, 251, 0.13);
  border-radius: 4px;
  min-width: 170px;
  padding-left: 20px;
  padding-top: 15px;
  width: 100%;
}

.time-group {
  display: flex;
  flex-direction: row;
  align-items: center;
  font-family: din;
  font-size: 16px;
  color: #001629;
  letter-spacing: 0;
}

.time-group img {
  margin-right: 12px;
}

.time-group .arrow-right {
  margin-left: 14px;
}

.detail-info {
  margin-top: 15px;
  display: inline-block;
}

.detail-item {
  font-family: pingfang-light;
  font-size: 16px;
  color: #979797;
  letter-spacing: 0;
  margin-right: 30px;
  display: inline-block;
  float: left;
  margin-bottom: 14px;
}

.item-value {
  font-family: pingfang-light;
  font-size: 16px;
  color: #001629;
  letter-spacing: 0;
}

.attention {
  font-family: pingfang-light;
  font-size: 12px;
  color: #ff5151;
  letter-spacing: 0;
}

.list-wrap {
  height: 530px;
  overflow-x: hidden;
  overflow-y: scroll;
  padding-right: 12px;
  padding-left: 10px;
}

.list-wrap::-webkit-scrollbar {
  display: none;
}
</style>

<style type="text/less" lang="less">
.ant-modal-body {
  overflow: hidden !important;
}
</style>
