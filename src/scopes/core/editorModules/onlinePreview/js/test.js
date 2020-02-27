
let  getVueObj=()=> {
	var str = localStorage.getItem("testStr");
	str = str.replace("</template>", "woshizhu");
	str = str.replace("<\/script>", "woshizhu");
	str = str.replace("</style>", "woshizhu");
//console.log(str);
	var list = str.split("woshizhu")
	console.log(list)
	var vueObj = {};
	for (var i = 0; i < list.length; i++) {
		if (list[i].indexOf('<template>') >= 0) {
			vueObj.template = list[i].replace(`<template>`, '');
			continue;
		}
		if (list[i].indexOf('<script>') >= 0) {
			vueObj.js = list[i].replace(`<script>`, '');
			continue;
		}
		if (list[i].indexOf('<style') >= 0) {
			vueObj.style = list[i].replace(/<style(.*)>/, '');
			continue;
		}
	}
	var jsStr, jsObj;
	vueObj.js = vueObj.js.replace(/export(.*)default/, 'woshizhu');
	//没有export
	if(vueObj.js.indexOf('woshizhu')<0){
		jsStr=vueObj.js;
		jsObj="{}"
	}else {
		var jslist = vueObj.js.split("woshizhu");
		if (jslist.length == 1) {
			jsStr='';
			jsObj = jslist[0]
		} else if (jslist.length == 2) {
			jsStr = jslist[0];
			jsObj = jslist[1]
		}
	}
	vueObj.js.replace("woshizhu",'')
	vueObj.jsStr=jsStr;
	vueObj.jsObj=jsObj;
	return vueObj

}

export default getVueObj




