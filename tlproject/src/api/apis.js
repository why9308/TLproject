import axios from "axios"
//设置服务器IP地址
axios.defaults.baseURL="http://localhost:5000"

// 后台首页 echarts 
export const API_TOTALDATA=()=>axios.get("/order/totaldata")
// 订单报表 echarts /order/ordertotal
// data 字符串格式数组，如["2019-10-01 00:00:00", "2019-10-10 00:00:00"]
export const API_ORDERTOTAL=(date)=>axios.get("/order/ordertotal",{params:{date}})

// 用户信息

// API登陆
//account 账号
//password 密码
export const API_LOGIN=(account,password)=>axios.post("/users/checkLogin",{account,password})
// API添加账号、
//account 账号
//password 密码
// userGroup用户组
export const API_ADDACC=(account,password,userGroup)=>axios.post("/users/add",{account,password,userGroup})
// API账号列表
//currentPage 当前页码
//pageSize 每页条数
export const API_ACCLIST=(currentPage,pageSize)=>axios.get("/users/list",{params: {currentPage, pageSize}})
// API账号删除
//id 当前删除id
export const API_DELETE=(id)=>axios.get("/users/del",{params: {id}})
// API账号批量删除
// ids 要删除数据的id组成的数组（字符串格式的数组，如: ‘[1, 2, 3]’,需要转为字符串格式）
export const API_BATCHDEL=(ids)=>axios.get("/users/batchdel",{params: {ids}})
// API修改账号
// id 要修改账号的id
// account 账号
// userGroup 用户组
export const API_COMPILE=(id,account,userGroup)=>axios.post("/users/edit",{id,account,userGroup})
// API验证密码
// oldPwd 旧密码
export const API_OLDPWD=(oldPwd,id)=>axios.get("/users/checkoldpwd",{params: {oldPwd,id}})
// API修改密码
// newPwd 新密码
// id 帐号id editpwd
export const API_EDITPWD=(newPwd,id)=>axios.post("/users/editpwd",{newPwd,id})
// API修改密码
// id 帐号id 
export const API_ACCOUNTINFO=(id)=>axios.get("/users/accountinfo",{params: {id}})
// API token验证
// token 令牌
export const API_TOKEN=(token)=>axios.get("/users/checktoken",{params: {token}})

