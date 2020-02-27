// import {Vue, taMixins} from 'common/js/public-ant.js'// 引入公共文件
import {Vue, store, taMixins} from 'common/js/public-ant-modules.js'// 引入模块化公共文件
//把组件化页面挂载到节点app上
import $ from 'jquery';
import componentDeal from './js/componentDeal'
import './formPreview.less'
import moment from 'moment';
let ht='',da={}
let urlParam = Base.getNowPageParam();

if (Object.keys(urlParam).length > 0 && urlParam['formId']) {
  $.ajax({
    type: "POST",
    headers: {
      'X-XSRF-TOKEN': getToken('XSRF-TOKEN')
    },
    url:faceConfig.basePath+"/templateMg/templateMgRestService/getOnlineFormVoByFormId",
    data: {
      formId: urlParam.formId,
      _modulePartId_:urlParam._modulePartId_,
      frontUrl:window.location.href
    },
    xhrFields:{
      withCredentials:true
    },
    async:false,
    success: function(data){
      try {
        ht =  data.data.formVo.formHtml || '';
        da= JSON.parse( data.data.formVo.formData)
      }catch (e) {
        ht='';da={}
      }
    }
  });
}else {
   da = JSON.parse(localStorage.getItem('da'));
   ht = localStorage.getItem('ht');
}
//获取token方法
function getToken(){
  let strCookie = document.cookie;//获取cookie字符串
  let arrCookie = strCookie.split("; ");//分割
  //遍历匹配
  let token = "";
  arrCookie.map((value) => {
    if(value.indexOf("XSRF-TOKEN")!==-1){
      token = value.slice("XSRF-TOKEN".length + 1);
    }
  });
  return token;
}


 //装组件data属性的
  var cptda = {}
//装组件的方法
  var cptMethods = {}
//装组件html的
  var $pnode = $('<div></div>');
  $pnode.append(ht);
  while ($pnode.find('.item-src').length > 0) {
    let $node = $pnode.find('.item-src:first');
    let cpt = da[$node.attr('id')];
    let rs = componentDeal[cpt.type](cpt);
    cpt && $node.replaceWith(rs.str);
    cptda[cpt.id] = rs.data;
    rs.methods && (cptMethods = Object.assign(cptMethods, rs.methods));
  }
  new Vue({
    el: '#app',
    mixins: [taMixins],
    data() {
      return {
        //验证
        format: {
          phone: {rules: [{pattern: /^1[3|4|5|7|8|9][0-9]\d{8}$/, message: '请输入正确的电话号码'}]},
          number: {rules: [{pattern: /^[0-9]+$/, message: '请输入数值'}]},
          email: {rules: [{type: 'email', message: '请输入正确的email'}]},
          text: {}
        },
        moment: moment,
        ...cptda
      }
    },
    mounted() {

    },
    methods: {
      ...cptMethods,
      getVal() {

      }
    },
    template:
      `<ta-form layout="inline" :autoFormCreate="(form)=>{this.form = form}">
<div style="padding: 10px">` + $pnode.html() + `</div>
</ta-form>`,
  })



