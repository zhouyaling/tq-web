<template>
  <div>
    <ta-form :autoFormCreate="(form)=>{this.form = form}">
      <ta-form-item
        label='邮箱'
        fieldDecoratorId="e-mail"
      >
        <ta-input placeholder=''/>
      </ta-form-item>
    </ta-form>
    <ta-table :columns="columns" :dataSource="data" :scroll="{ x: 1500 }">
      <span slot="operate" slot-scope="text, record">
        <ta-table-operate :operateMenu="operateMenu"></ta-table-operate>
      </span>
    </ta-table>
    <ta-button @click="savePage()">保存页面</ta-button>
  </div>
</template>
<script>
  import rePageMixins from '@/common/js/mixins/rePageMixins'

  const columns = [
    {title: 'Full Name', width: 100, dataIndex: 'name', key: 'name', fixed: 'left'},
    {title: 'Age', width: 100, dataIndex: 'age', key: 'age', fixed: 'left'},
    {title: 'Column 1', dataIndex: 'address', key: '1', width: 150},
    {title: 'Column 2', dataIndex: 'address', key: '2', width: 150},
    {title: 'Column 3', dataIndex: 'address', key: '3', width: 150},
    {title: 'Column 4', dataIndex: 'address', key: '4', width: 150},
    {title: 'Column 5', dataIndex: 'address', key: '5', width: 150},
    {title: 'Column 6', dataIndex: 'address', key: '6', width: 150},
    {title: 'Column 7', dataIndex: 'address', key: '7', width: 150},
    {title: 'Column 8', dataIndex: 'address', key: '8'},
    {
      title: 'operate',
      dataIndex: 'operate',
      fixed: 'right',
      width: 100,
      scopedSlots: { customRender: 'operate' },
    },
  ];

  const data = [];
  for (let i = 0; i < 5; i++) {
    data.push({
      key: i,
      name: `Edrward ${i}`,
      age: 32,
      address: `London Park no. ${i}`,
    });
  }

  export default {
    components: {},
    mixins: [rePageMixins],
    data() {
      return {
        data,
        columns,
        operateMenu: [{
          name: 'action',
          onClick: (record) => {
            this.$message.info(JSON.stringify(record))
          }
        }]
      }
    },
    methods: {
      savePage() {
        //调用页面还原,回调返回pageId
        this.saveRePageData().then(pageId => {
          console.log(pageId)
          localStorage.pageId=pageId
          //这里可以自己去保存 pageId
        })


      },


    }
  }
</script>
