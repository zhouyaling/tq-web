import tinymce from 'tinymce/tinymce'
import Editor from '@tinymce/tinymce-vue'
import tyTool from '../../tinymce/tools'
tinymce.PluginManager.add('tyText', function (ed) {
  var number = 1;

  function renderComponent(options) {
    options = options ? options : {};
    var _df = {
      style: {
        border: {
          borderType:"all",//all,bottom,none
          borderWidth:"1px",
          borderStyle:"solid",
          borderColor:"#ccc",
        },
        width: "180px",
        'height': "32px",
        'font-size': '14px',
        'font-family': 'Microsoft YaHei',
        'color': '#606266',
        'background-color': '#ffffff'
      },
      id: "tyText_" + tyTool.guid(),
      value: "",
      title: "单行文本框",
      type: "tyText",
      format: "text",
      isShow:true,//是否显示
    };
    var _style = Object.assign(_df.style, options.style || {});
    var opt = Object.assign(_df, options);
    var sty = (tyTool.styleObjTranslate(_style)).styleStr;
    opt.style = _style;
    var str = [];
    // str.push('&nbsp;');
    str.push('<input class="item-src" contentEditable="false" id="' + opt.id + '" title="' + opt.title + '" data-el="item-src"');
    str.push(' value="' + opt.value + '" ');
    str.push(' style="' + sty + '" ');
    str.push('/>');
    ed.insertContent(str.join(''));
    number++;
    return opt;
  }

  function reRenderComponent(options) {
    var el = tinymce.activeEditor.dom.get(options.id);
    tinymce.activeEditor.dom.setStyles(options.id, tyTool.styleObjTranslate(options.style).styleObj);
    el.value = options.value;

  }

  return {
    renderComponent: renderComponent,
    reRenderComponent: reRenderComponent
  }

})
