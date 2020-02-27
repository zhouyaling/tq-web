import tinymce from 'tinymce/tinymce'
import Editor from '@tinymce/tinymce-vue'
import tyTool from '../../tinymce/tools'
tinymce.PluginManager.add('tyGrid', function (ed) {
  var number = 1;

  function renderComponent(options) {
    options = options ? options : {};
    var _df = {
      style: {
        'width': "100%",
        'height': "250px"
      },
      id: "tyGrid_" + tyTool.guid(),
      title: "表格",
      type: "tyGrid",
      isShow: true,//是否显示
      isIndex: true,//是否显示序号列
      pagination:true,//是否显示分页
      pageSize:5,//分页大小
      defaultRows:5,//默认数据有多少行
      bordered:true,//是否显示列边框

      //源组件自身的样式不会在预览中显示出来的,而在编辑中显示出来的样式
      cptSrcStyle: 'border:1px solid #ccc; ',
      columns: [
        {
          title: '学号',//列名
          dataIndex: 'id',//索引
          width:'',//宽度
          align:'',//内容对齐方式
          format:'',//编辑器类型默认text
          value:'',//默认值
        },
        {
          title: '姓名',
          dataIndex: 'name',//索引
        },
        {
          title: '性别',
          dataIndex: 'sex',//索引
        },
      ],//表格列信息
    };
    var _style = Object.assign(_df.style, options.style || {});
    var opt = Object.assign(_df, options);
    var sty = (tyTool.styleObjTranslate(_style)).styleStr;
    sty = sty + opt.cptSrcStyle;

    opt.style = _style;
    var str = [];
    str.push(`<div class="item-src tyGrid" contentEditable="false" id="` + opt.id + `" title="` + opt.title + `" data-el="item-src" style="` + sty + `">`);
    str.push(`<div class="tyGrid_header">`)
    opt.isIndex && str.push(`<div class="tyGrid_header_item tyGrid_index" >序号</div>`)
    for (let i = 0; i < opt.columns.length; i++) {
      str.push(`<div class="tyGrid_header_item" data-index="`+opt.columns[i].dataIndex+`">` + opt.columns[i].title + `<span class="mce-ico mce-i-line" title="点击设置列属性" data-id="`+opt.id+`" data-el="tyGrid_header_item" data-i="`+i+`">　</span></div>`
      )
    }
    str.push(`</div>`);
    str.push(`</div>`);

    ed.insertContent(str.join(``));
    number++;
    return opt;
  }

  function reRenderComponent(options) {
    var el = tinymce.activeEditor.dom.get(options.id);
    var str = [];
    str.push(`<div class="tyGrid_header">`)
    options.isIndex && str.push(`<div class="tyGrid_header_item tyGrid_index" >序号</div>`);
    for (let i = 0; i < options.columns.length; i++) {
      str.push(`<div class="tyGrid_header_item" data-index="`+options.columns[i].dataIndex+`">` + options.columns[i].title + `<span class="mce-ico mce-i-line" title="点击设置列属性" data-id="`+options.id+`" data-el="tyGrid_header_item" data-i="`+i+`">　</span></div>`
      )
    }
    str.push(`</div>`);
    tinymce.activeEditor.dom.setHTML(options.id,str.join(``));
    tinymce.activeEditor.dom.setStyles(options.id, tyTool.styleObjTranslate(options.style).styleObj);

  }

  return {
    renderComponent: renderComponent,
    reRenderComponent: reRenderComponent
  }

})
