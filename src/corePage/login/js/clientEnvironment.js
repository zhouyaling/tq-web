/**
 * Created by Administrator on 2016/7/4.
 * 运行环境信息
 */

//获取浏览器信息
function getBrowserInfo() {
  var agent = navigator.userAgent.toLowerCase();
  var Browser = "UNKNOW";
  var Bversion = "";
  var verinNum;
  //IE
  if (agent.indexOf("msie") >= 0) {
    var regStr_ie = /msie [\d]+/gi;
    Browser = "IE";
    Bversion = "" + agent.match(regStr_ie)
  }
  //firefox
  else if (agent.indexOf("firefox") >= 0) {
    var regStr_ff = /firefox\/[\d]+/gi;
    Browser = "firefox";
    Bversion = "" + agent.match(regStr_ff);
  }
  //Chrome
  else if (agent.indexOf("chrome") >= 0) {
    var regStr_chrome;
    if(agent.indexOf("edge") >= 0){
      regStr_chrome = /edge\/[\d]+/gi;
      Browser = "edge";
    }else{
      regStr_chrome = /chrome\/[\d]+/gi;
      Browser = "chrome";
    }

    //var regStr_chrome = /chrome\/[\d.]+/gi;
    //Browser = "chrome";
    Bversion = "" + agent.match(regStr_chrome);
  }
  //Safari
  else if (agent.indexOf("safari") >= 0 && agent.indexOf("chrome") < 0) {
    var regStr_saf = /version\/[\d]+/gi;
    Browser = "safari";
    Bversion = "" + agent.match(regStr_saf);
  }
  //Opera
  else if (agent.indexOf("opera") >= 0) {
    var regStr_opera = /version\/[\d]+/gi;
    Browser = "opera";
    Bversion = "" + agent.match(regStr_opera);
  } else {
    var browser = navigator.appName;
    if (browser == "Netscape") {
      //var version = agent.split(";");
      //var trim_Version = version[7].replace(/[ ]/g,"");
      //var rvStr = trim_Version.match(/[\d\.]/g).toString();
      var rvStr = agent.match(/rv:[\d]+/gi);
      //var rv = rvStr.replace(/[,]/g, "");
      Bversion = rvStr;
      Browser = "IE"
    }
  }
  verinNum = (Bversion + "").replace(/[^0-9.]/ig, "");
  return {
    "Browser" : Browser,
    "verinNum": verinNum
  };
}

function getCurrentSystemInfo() {
  var system = {
    win: false,
    mac: false,
    xll: false,
    iphone: false,
    ipoad: false,
    ipad: false,
    ios: false,
    android: false,
    nokiaN: false,
    winMobile: false,
    wii: false,
    ps: false
  };
  var ua = navigator.userAgent;
  // 检测平台
  var p = navigator.platform;
  system.win = p.indexOf('Win') == 0;
  system.mac = p.indexOf('Mac') == 0;
  system.xll = (p.indexOf('Xll') == 0 || p.indexOf('Linux')
    == 0);
  // 检测Windows操作系统
  if (system.win) {
    if (/Win(?:dows )?([^do]{2})\s?(\d+\.\d+)?/.test(ua))
    {
      if (RegExp['$1'] == 'NT') {
        switch (RegExp['$2']) {
          case '5.0':
            system.win = '2000';
            break;
          case '5.1':
            system.win = 'XP';
            break;
          case '6.0':
            system.win = 'Vista';
            break;
          case '6.1':
            system.win = '7';
            break;
          case '6.2':
            system.win = '8';
            break;
          case '6.3':
          case '10.0':
            system.win = '10';
            break;
          default:
            system.win = 'NT';
            break;
        }
      } else if (RegExp['$1'] == '9x') {
        system.win = 'ME';
      } else {
        system.win = RegExp['$1'];
      }
    }
  }
  // 移动设备
  system.iphone = ua.indexOf('iPhone') > -1;
  system.ipod = ua.indexOf('iPod') > -1;
  system.ipad = ua.indexOf('iPad') > -1;
  system.nokiaN = ua.indexOf('nokiaN') > -1;
  // windows mobile
  if (system.win == 'CE') {
    system.winMobile = system.win;
  } else if (system.win == 'Ph') {
    if (/Windows Phone OS (\d+.\d)/i.test(ua)) {
      system.win = 'Phone';
      system.winMobile = parseFloat(RegExp['$1']);
    }
  }
  // 检测IOS版本
  if (system.mac && ua.indexOf('Mobile') > -1) {
    if (/CPU (?:iPhone )?OS (\d+_\d+)/i.test(ua)) {
      system.ios = parseFloat(RegExp['$1'].replace('_',
        '.'));
    } else {
      system.ios = 2;    // 不能真正检测出来，所以只能猜测
    }
  }
  // 检测Android版本
  if (/Android (\d+\.\d+)/i.test(ua)) {
    system.android = parseFloat(RegExp['$1']);
  }
  // 游戏系统
  system.wii = ua.indexOf('Wii') > -1;
  system.ps = /PlayStation/i.test(ua);


  for(var i in system){
    (system[i] && (system = i+system[i]));
  }
  return {
    "System" : (!(typeof(system) == "object") && system)||'UNKNOW',
    "ScreenSize":(function(){
      return screen.width+","+screen.height;
    })()
  }


}

const BrowserInfo = getBrowserInfo();
const SystemInfo = getCurrentSystemInfo();

// export {
//   //获取浏览器相关信息
//     BrowserInfo,
//   //获取操作系统相关信息
//     SystemInfo
// }

const systemInfo = {
  clientsystem: SystemInfo.System,
  clientscreensize: SystemInfo.ScreenSize,
  clientbrowser: BrowserInfo.Browser
}

export default systemInfo
