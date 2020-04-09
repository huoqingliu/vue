import ajax from "./ajax";
import mockAjax from "./mockAjax";

// 获取3级列表
export const reqBaseCategoryList = () => ajax.get('/product/getBaseCategoryList')
// 登录
export const reqLogin = (mobile, password) => ajax.post('/user/passport/login', {
  mobile,
  password
})

// 请求mock接口，获取所有楼层列表
export const reqBanners = () => mockAjax.get('/banners')


// 请求mock接口，获取所有楼层列表数据
export const reqFloors = () => mockAjax.get('/floors')


// reqBanners().then(result => {
//   console.log(result);
// })