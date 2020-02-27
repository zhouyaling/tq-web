import tyTool from '../../formDesign/js/tinymce/tools'
import moment from 'moment';
import 'moment/locale/zh-cn';
//处理之后返回两个值{str:组件构成字符串,data:组件初始化数据}
function tyText(options) {
  var str = `<ta-form-item 
     field-decorator-id="` + options.id + `" 
     :field-decorator-options="{initialValue:'`+(options.value||"")+`',...format.` + (options.format || "text") + `}"
      style="width:` + options.style.width + `"
     :wrapper-col="{span:24}"
     v-show="` + options.isShow + `"
     ><ta-input 
     id="` + options.id + `"
     style="` + tyTool.styleObjTranslate(options.style).styleStr + `"

      
    /></ta-form-item>`;

  return {
    str: str,
    data: {}
  }
}

function tyGrid(options) {
  var str = `<ta-table
    id="` + options.id + `"
    size="small"
    style="` + tyTool.styleObjTranslate(options.style).styleStr + `"
    :bordered="` + options.bordered + `"
    :pagination="` + options.id + `.pagination"
    v-show="` + options.isShow + `"
    :columns="` + options.id + `.columns"
    :data-source="` + options.id + `.data"
    >
    <template v-for="col in ` + options.id + `.columns" :slot="col.dataIndex" slot-scope="text, record, index">
      <div>
        <div v-if="col.dataIndex=='opt'" >     
   
         <span v-if="record.editable">
          <a style="margin-right: 8px" @click="` + options.id + `_save(record)"><ta-icon type="enter" /></a>
          <a style="margin-right: 8px" @click="` + options.id + `_cancel(record)"><ta-icon type="rollback" /></a>         
        </span>
        <span v-else>
          <a style="margin-right: 8px"  @click="` + options.id + `_edit(record)"><ta-icon type="edit" /></a>
        </span>
         
         <a style="margin-right: 8px"  @click="` + options.id + `_add(record,index)" title="添加行">
          <ta-icon type="plus-circle-o" />  
         </a>            
         <a style="margin-right: 8px"  @click="` + options.id + `_delete(record,index)" title="删除行">
          <ta-icon type="minus-circle-o" /> 
         </a>             
        </div>
        <div v-else-if="col.dataIndex=='no_sn'"  > 
          {{index+1}}
        </div>
        <div v-else>              
          <ta-form-item
             v-if="record.editable" 
             :field-decorator-id="'` + options.id + `'+col.dataIndex+'_'+index"
             :field-decorator-options="{initialValue:text,...format[col.format]||{}}"
             >
            <ta-input  :value="text" @change="e => ` + options.id + `_handleChange(e.target, record, col,index)"></ta-input>
          </ta-form-item>
          <template v-else>{{text}}</template>
        </div>
      </div>
  
    </template>
</ta-table>`;
  //初始化默认行
  var da = [];
  for (let i = 0; i < options.defaultRows; i++) {
    var rw = {};
    for (let j = 0; j < options.columns.length; j++) {
      rw[options.columns[j].dataIndex] = options.columns[j].value || "";
    }
    da.push({key: i, ...rw})
  }


  //初始化列
  var columns = options.columns.map((el) => {
    return {
      scopedSlots: {customRender: el.dataIndex},
      ...el
    }
  }) || [];
  //添加序号列
  if (options.isIndex) {
    columns = [{
      title: "序号",
      width: 100,
      dataIndex: "no_sn",
      scopedSlots: {customRender: "no_sn"},
    }, ...columns]
  }

  //添加编辑列
  columns.push({
    title: "编辑",
    // fixed: 'right',
    width: 200,
    dataIndex: "opt",
    scopedSlots: {customRender: "opt"},
  })
  var md = {};
  //点击进入编辑
  md[options.id + `_edit`] = function (record) {
    this.$set(record, 'editable', true);
  }
  //修改change事件
  md[options.id + `_handleChange`] = function (el, record, column, index) {
    record[column.dataIndex] = el.value;

  }
  //点击进入保存
  md[options.id + `_save`] = function (record) {

    let newdata = this[options.id]['cacheData'].map(item => {
      if (item.key == record.key) {
        return record
      } else {
        return item;
      }
    });
    this[options.id]['cacheData'] = newdata.map(item => ({...item}))
    this.$set(record, 'editable', false);
  }
  //点击进入取消保存
  md[options.id + `_cancel`] = function (record) {
    this[options.id]['cacheData'].map(item => {
      if (item.key == record.key) {
        for (let i in item) {
          this.$set(record, i, item[i]);
        }
      }
    });
    this.$set(record, 'editable', false);
  }
  //点击进入添加行
  md[options.id + `_add`] = function (record, index) {
    var newrow = {};
    for (let i = 0; i < this[options.id]['columns'].length; i++) {
      var el = this[options.id]['columns'][i];
      if (el.dataIndex !== 'opt' && el.dataIndex !== 'no_sn' && el.dataIndex !== 'key') {
        newrow[el.dataIndex] = '';
      }
    }
    newrow = {
      key: this[options.id]['maxKey']++,
      editable: true,
      ...newrow
    }
    this[options.id].data.splice(index + 1, 0, newrow);
    this[options.id].cacheData.splice(index + 1, 0, newrow);

  }
  //点击删除行
  md[options.id + `_delete`] = function (record, index) {
    this[options.id].data.splice(index, 1);
    this[options.id].cacheData.splice(index, 1);
  }
  return {
    str: str,
    data: {
      pagination: options.pagination ? {pageSize: options.pageSize || 5} : false,
      columns: columns,
      maxKey: da.length || 0,//最大行号
      data: da,
      cacheData: da.map(item => ({...item}))
    },
    methods: md
  }
}

function tyTextarea(options) {
  var str = `<ta-form-item 
         style="width:` + options.style.width + `"
         :wrapper-col="{span:24}"
         field-decorator-id="` + options.id + `" 
         v-show="` + options.isShow + `"
    >
    <ta-textarea 
     id="` + options.id + `"
     style="` + tyTool.styleObjTranslate(options.style).styleStr + `"
      ></ta-textarea></ta-form-item>`;
  return {
    str: str,
    data: {}

  }
}

function tyRadio(options) {


  var elst = '';
  if (options.layout == "vertical") {
    elst = 'display:block;'
  }
  if (options.itemHeight) {
    elst += 'height:' + options.itemHeight + ';'
    elst += 'line-height:' + options.itemHeight + ';'
  }
  if (options.itemWidth) {
    elst += 'width:' + options.itemWidth + ';'
  }
  var str = `<ta-form-item 
      field-decorator-id="` + options.id + `" 
      v-show="` + options.isShow + `"
      :field-decorator-options="{initialValue:'`+options.value+`'}"
     >
       <ta-radio-group 
        id="` + options.id + `"  
        name="` + options.id + `"      
        style="` + tyTool.styleObjTranslate(options.style).styleStr + `"

        >
        <ta-radio 
         v-for="item in ` + options.id + `.selectList" 
          :value="item.value" 
          :key="item.value" 
          style="` + elst + tyTool.styleObjTranslate(options.style).styleStr + `"
        
        >
          {{item.label}}
        </ta-radio>
       </ta-radio-group>
    </ta-form-item>`;
  return {
    str: str,
    data: {
      selectList: options.selectList,
      value: options.value
    }
  }

}

function tyCheckbox(options) {


  var elst = '';
  if (options.layout == "vertical") {
    elst = 'display:block;'
  }
  if (options.itemHeight) {
    elst += 'height:' + options.itemHeight + ';'
    elst += 'line-height:' + options.itemHeight + ';'
  }
  if (options.itemWidth) {
    elst += 'width:' + options.itemWidth + ';'
  }
  var str = `<ta-form-item 
      field-decorator-id="` + options.id + `" 
      :field-decorator-options="{initialValue:'`+options.value+`'}"
      v-show="` + options.isShow + `"
     >
       <ta-checkbox-group 
         id="` + options.id + `"  
        name="` + options.id + `"     
        style="` + tyTool.styleObjTranslate(options.style).styleStr + `"

        >
        <ta-checkbox
         v-for="item in ` + options.id + `.selectList" 
          :value="item.value" 
          :key="item.value" 
          style="` + elst + tyTool.styleObjTranslate(options.style).styleStr + `"
       
        >{{item.label}}</ta-checkbox>
       </ta-checkbox-group>
    </ta-form-item>`;
  return {
    str: str,
    data: {
      selectList: options.selectList,
      value: options.value || []
    }
  }

}

function tySelect(options) {
  var str = `<ta-form-item 
      field-decorator-id="` + options.id + `" 
      v-show="` + options.isShow + `"
      style="width:` + options.style.width + `"
     :wrapper-col="{span:24}"
      :field-decorator-options="{initialValue:` + options.id + `.value}"
     >
     <ta-select
      id="` + options.id + `"
      style="` + tyTool.styleObjTranslate(options.style).styleStr + `"  
       mode="multiple"
     >
      <ta-select-option  v-for="item in ` + options.id + `.options" 
      :key="item.value"
      :value="item.value"      
      >
      {{item.label}}
      </ta-select-option>      
     </ta-select>
       
    </ta-form-item>`;
  return {
    str: str,
    data: {
      options: options.options,
      value: options.value || []
    }
  }
}
function tyDate(options) {
  var now = moment(options.value);
   now._d=='Invalid Date' && (now=moment());
  var str = `<ta-form-item 
     field-decorator-id="` + options.id + `" 
      :field-decorator-options="{initialValue:` + options.id + `.defaultValue}"
      style="width:` + options.style.width + `"
     :wrapper-col="{span:24}"
     v-show="` + options.isShow + `"
     ><ta-date-picker
     id="` + options.id + `"
     style="` + tyTool.styleObjTranslate(options.style).styleStr + `"   
     :show-time="`+options.showTime+`"
    /></ta-form-item>`;
  return {
    str: str,
    data: {
      defaultValue:now
    }
  }
}
var componentDeal = {
  tyText,
  tyTextarea,
  tyGrid,
  tyRadio,
  tyCheckbox,
  tySelect,
  tyDate
}

export default componentDeal;
