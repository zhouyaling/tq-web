import tinymce from 'tinymce/tinymce'
import Editor from '@tinymce/tinymce-vue'
import tyTool from '../../tinymce/tools'
tinymce.PluginManager.add('tyDate', function (ed) {
  var number = 1;

  function renderComponent(options) {
    options = options ? options : {};
    var _df = {
      style: {
        width: "180px",
        'height': "32px",
        'font-size': '14px',
        'font-family': 'Microsoft YaHei',
        'color': '#606266',
        'background-color': '#ffffff'
      },
      id: "tyDate_" + tyTool.guid(),
      value: "",
      title: "日期框",
      type: "tyDate",
      isShow:true,//是否显示
      showTime:true,//是否显示时间选择功能
    };
    var _style = Object.assign(_df.style, options.style || {});
    var opt = Object.assign(_df, options);
    var sty = (tyTool.styleObjTranslate(_style)).styleStr;
    opt.style = _style;
    var str = [];
    // str.push('&nbsp;');
    str.push('<input class="item-src" type="date" contentEditable="false" id="' + opt.id + '" title="' + opt.title + '" data-el="item-src"');
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
