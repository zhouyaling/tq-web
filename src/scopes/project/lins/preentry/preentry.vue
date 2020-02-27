<template>
  <div style="flex: auto">
    <ta-layout>
      <ta-layout-content :layout="{footer:'70px'}" :style="{ margin: '16px 16px', padding: '16px', background: '#fff'}">
          <ta-table  :columns="columnsPreEntryUsers" :pagination=false :dataSource="dataEmployeeInfo" >
            <template  slot="operation" slot-scope="text, record, index">
              <router-link
                :to="{ name: 'editEmployeeView', query: { humanId: record.humanId,humanName:record.humanName, _modulePartId_: '1'}}"
                class="operate">编辑
              </router-link>
            </template>
          </ta-table>
          <ta-pagination style="float: right; margin-top: 10px;"
                         showSizeChanger
                         showQuickJumper
                         :dataSource.sync="dataEmployeeInfo"
                         :defaultPageSize="10"
                         :params="employeePageParams"
                         :url="userSearchUrl"
                         ref="gridPager"/>
      </ta-layout-content>
    </ta-layout>
  </div>
</template>

<script>

    import picListShow from "@projectCommon/picListShow.vue";
  const columnsPreEntryUsers = [
    {title: 'A', width: '12%', dataIndex: 'humanName'},
    {
      title: '操作',
      dataIndex: 'operation',
      align: 'center',
      width: '15%',
      scopedSlots: {customRender: 'operation'}
    }
  ];

  export default {
    name: 'demo-fixed-top',
    components:{picListShow},
    data() {
      return {
        columnsPreEntryUsers,
          dataEmployeeInfo: [{humanName: '你好', humanId:'123'}],
        userSearchUrl: 'test/query',
      }
    },
    mounted() {
      this.queryEmployeeList();
    },
    methods: {
      queryEmployeeList() {
        this.$nextTick(() => {
          this.$refs.gridPager.loadData();
          this.isLoading = false;
        });
      },
      employeePageParams() {
        let param = {};
        return param
      }
    }
  }
</script>

<style type="scss">
  .ant-radio-button-wrapper-checked {
    background: #fff;
    border-color: #1890ff;
    color: #1890ff;
    box-shadow: -1px 0 0 0 #1890ff;
    z-index: 1;
  }
</style>
