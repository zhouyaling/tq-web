import tinymce from 'tinymce/tinymce'
import Editor from '@tinymce/tinymce-vue'
import tyTool from '../../tinymce/tools'
tinymce.PluginManager.add('tySelect', function (ed) {
  var number = 1;

  function renderComponent(options) {
    options = options ? options : {};
    var _df = {
      style: {
        'width': "180px",
        'height': "32px",
        'font-size': '14px',
        'font-family': 'Microsoft YaHei',
        'color': '#606266',
        'background-color': '#ffffff',
      },
      itemHeight: "30px",
      id: "tySelect_" + tyTool.guid(),
      title: "下拉选_" + number,
      type: "tySelect",
      options: [
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
      value:['1'],//设置选中的值
    };
    var _style = Object.assign(_df.style, options.style || {});
    var opt = Object.assign(_df, options);
    var sty = (tyTool.styleObjTranslate(_style)).styleStr;
    opt.style = _style;
    var str = [];
    str.push('&nbsp;');
    str.push('<select style="'+sty+'" class="item-src " contentEditable="false" id="' + opt.id + '" title="' + opt.title + '" data-el="item-src" >')
    str.push('</select>');
    ed.insertContent(str.join(''));
    number++;
    return opt;
  }

  function reRenderComponent(options) {
    var el = tinymce.activeEditor.dom.get(options.id);
    tinymce.activeEditor.dom.setStyles(options.id, tyTool.styleObjTranslate(options.style).styleObj);
  }

  return {
    renderComponent: renderComponent,
    reRenderComponent: reRenderComponent
  }

})
