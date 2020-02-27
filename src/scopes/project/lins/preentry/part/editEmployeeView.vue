<template>
  <div>
    <div style=" padding: 20px;">
      <ta-row :gutter="16">
        <ta-col :span="20">
          <employee-base-info :humanId="humanId"/>
        </ta-col>
      </ta-row>
    </div>
  </div>
</template>

<script>
import employeeBaseInfo from "./employeeBaseInfo"
  export default {
    name: "editEmployeeView",
      components:{employeeBaseInfo},
    data() {
      return {
          humanName:"",
        humanId: ''
      }
    },
    beforeMount() {
      this.humanId = this.$route.query.humanId;
      this.humanName = this.$route.query.humanName;
    },
    methods: {
      back() {
        this.$destroy(true);
        this.$router.back(-1);
      }
    }
  }
</script>

<style>

</style>
