const BASE_URL="/test/";


export default {
  saveEmployeeBaseInfo(data,callBack){
    Base.submit(null, {url: BASE_URL + 'saveEmployeeBaseInfo', data: data}, {
      successCallback: (data) => callBack(data)
    });
  }
}
