import axios from "axios"
//设置服务器IP地址
axios.defaults.baseURL="http://localhost:5000"

// 商品管理

// API添加分类
// cateName 分类名称
// state 是否启用
export const API_ADDCATE=(cateName,state)=>axios.post("/goods/addcate",{cateName,state})

// API获取分类
//currentPage 当前页码
//pageSize 每页条数
export const API_CATELIST=(currentPage,pageSize)=>axios.get("/goods/catelist",{params: {currentPage, pageSize}})

// API获取商品列表
// currentPage 当前页码
// pageSize 每页条数
export const API_LIST=(currentPage,pageSize)=>axios.get("/goods/list",{params: {currentPage, pageSize}})

//API 删除商品分类
//id  分类id delcate
export const API_DELCATE=(id)=>axios.get("/goods/delcate",{params:{id}})

//API 修改分类
//id 分类id
// cateName 分类名称
export const API_EDITCATE=(id,cateName,state)=>axios.post("/goods/editcate",{id,cateName,state})

//API 查询分类
export const API_INQUIRE=()=>axios.get("/goods/categories")

//API 添加商品
// name 商品名称
// category 商品分类
// price 商品价格
// imgUrl 商品图片地址
// goodsDesc 商品描述
export const API_ADDGOODS=(name,category,price,imgUrl,goodsDesc)=>axios.post("/goods/add",{name,category,price,imgUrl,goodsDesc})

// API删除商品
// id 要删除商品的ID
export const API_DEL=(id)=>axios.get("/goods/del",{params:{id}})

// 修改商品
// name 商品名称 
// category 商品分类
// price  商品价格
// imgUrl商品图片地址
// goodsDesc 商品描述
// id 商品ID
export const API_EDIT=(name,category,price,imgUrl,goodsDesc,id)=>axios.post("/goods/edit",{name,category,price,imgUrl,goodsDesc,id})
