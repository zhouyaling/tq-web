import tinymce from 'tinymce/tinymce'
import Editor from '@tinymce/tinymce-vue'
import tyTool from '../../tinymce/tools'

tinymce.PluginManager.add('tyCheckbox', function (ed) {
  var number = 1;
  function renderComponent(options) {
    options = options ? options : {};
    var _df = {
      style: {
        border: {
          borderType: "none",//all,bottom,none
        },
        'font-size': '14px',
        'font-family': 'Microsoft YaHei',
        'color': '#606266',
        'background-color': '#ffffff',
      },
      itemWidth: "100px",
      itemHeight: "30px",
      id: "tyCheckbox_" + tyTool.guid(),
      title: "多选框_" + number,
      type: "tyCheckbox",
      layout: "horizon",//水平还是垂直 horizon||vertical 默认水平
      selectList: [
        {
          value: '1',//key值
          label: '男'//显示的字符串

        },
        {
          value: '2',//key值
          label: '女'//显示的字符串
        },
        {
          value: '0',//key值
          label: '无'//显示的字符串
        }

      ],
      isShow: true,//是否显示
      value:['1','2'],//设置选中的值
    };
    var _style = Object.assign(_df.style, options.style || {});
    var opt = Object.assign(_df, options);
    var sty = (tyTool.styleObjTranslate(_style)).styleStr;
    opt.style = _style;
    var str = [];


    str.push('&nbsp;');
    str.push('<span style="'+sty+' display: inline-block;padding: 5px" class="item-src" contentEditable="false" id="' + opt.id + '" title="' + opt.title + '" data-el="item-src" >');
    //显示的水平还是 垂直
    var elst = 'display:inline-block;';
    if (opt.layout == "vertical") {
      elst = 'display:block;'
    }
    if(opt.itemHeight){
      elst+='height:'+opt.itemHeight+';'
      elst+='line-height:'+opt.itemHeight+';'
    }
    if(opt.itemWidth){
      elst+='width:'+opt.itemWidth+';'
    }

    for (let i = 0; i < opt.selectList.length; i++) {

      str.push('<label style="' + elst + '" data-el="item-src-select"  ><input  style="cursor: not-allowed" type="checkbox" name="' + opt.id + '"  '+(opt.value.includes(opt.selectList[i].value)?"checked":"")+'/>' + opt.selectList[i].label + '</label>');
    }

    str.push('</span>');
    ed.insertContent(str.join(''));
    number++;
    return opt;
  }

  function reRenderComponent(options) {
    var el = tinymce.activeEditor.dom.get(options.id);
    var opt=options;
    var str = [];
    var elst = 'display:inline-block;';
    if (opt.layout == "vertical") {
      elst = 'display:block;'
    }
    if(opt.itemHeight){
      elst+='height:'+opt.itemHeight+';'
      elst+='line-height:'+opt.itemHeight+';'
    }
    if(opt.itemWidth){
      elst+='width:'+opt.itemWidth+';'
    }
    for (let i = 0; i < opt.selectList.length; i++) {
      str.push('<label style="' + elst + '" data-el="item-src-select"  ><input  style="cursor: not-allowed" type="checkbox" name="' + opt.id + '"  '+(opt.value.includes(opt.selectList[i].value)?"checked":"")+'/>' + opt.selectList[i].label + '</label>');
    }
    tinymce.activeEditor.dom.setHTML(options.id,str.join(''));
    tinymce.activeEditor.dom.setStyles(options.id, tyTool.styleObjTranslate(options.style).styleObj);


  }

  return {
    renderComponent: renderComponent,
    reRenderComponent: reRenderComponent
  }

})
