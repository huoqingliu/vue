import ajax from "./ajax";

// 获取3级列表
export const reqBaseCategoryList = () => ajax.get('/product/getBaseCategoryList')
// 登录
export const reqLogin = (mobile, password) => ajax.post('/user/passport/login', {mobile, password}) 