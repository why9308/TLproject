import axios from "axios"
    // 服务器IP地址
 export const path_IP="http://localhost:5000"
//  服务器上传图片API地址
export const  UPLOAD=path_IP+'/shop/upload'
// 获取服务器图片地址
export const  IMG_UPLOAD=path_IP+'/upload/shop/'
//获取服务器商品添加上传API地址
export const  IMG_ADD=path_IP+'/goods/goods_img_upload'
// 获取服务器个人中心上传API地址
export const  IMG_MYCENTER=path_IP+'/users/avatar_upload'
// 获取商品列表添加图片地址
export const  IMG_PROLIST=path_IP+'/upload/imgs/goods_img/'
//获取商品添加API地址
export const IMG_ADDPORLIST=path_IP+'/goods/goods_img_upload'


 //设置服务器IP地址
axios.defaults.baseURL = path_IP


// 订单管理
// currentPage 当前页码(必要)
// pageSize 每页条数(必要)
// orderNo 订单号
// consignee 收货人
// phone 手机号
// orderState 订单状态
// date  时间范围，字符串格类型如: ["2019-10-05 00:00:00","2019-10-10 00:00:00"]
export const API_ORDERLIST = (currentPage, pageSize) => axios.get("/order/list", {
    params: {
        currentPage,
        pageSize
    }
})

// 订单查询
// currentPage 当前页码
// pageSize 每页条数
// orderNo 订单号
// consignee 收货人
// phone 手机号
// orderState 订单状态 currentPage
// date  时间范围，字符串格类型如: ["2019-10-05 00:00:00","2019-10-10 00:00:00"]
export const API_ORDERLIST1 = (currentPage, pageSize, orderNo, consignee, phone, orderState, date) => axios.get('/order/search', {
    params: {
        currentPage,
        pageSize,
        orderNo,
        consignee,
        phone,
        orderState,
        date
    }
})

// 获取订单详情
export const API_ORDER_DETAIL = (id) => axios.get('/order/detail', {
    params: {
        id
    }
})

// 修改订单信息
// id 要修改账号的id
// orderNo 订单号
// orderTime 下单时间
// phone 电话
// consignee 收货人
// deliverAddress 送货地址
// deliveryTime 送达时间
// remarks 备注
// orderAmount 订单金额
// orderState 订单状态
export const API_ORDER_EDIT = (id, orderNo, orderTime, phone, consignee, deliverAddress, deliveryTime, remarks, orderAmount, orderState) => axios.post("/order/edit", {
    id,
    orderNo,
    orderTime,
    phone,
    consignee,
    deliverAddress,
    deliveryTime,
    remarks,
    orderAmount,
    orderState
})
// 获取店铺详情
export const API_INFO = () => axios.get("/shop/info",{params:{}})

// 店铺内容修改

// id 店铺id
// name	店铺名称
// bulletin	店铺公告
// avatar  店铺头像
// deliveryPrice 起送价格
// deliveryTime	 送达时间
// description	 店铺描述
// score 店铺好评率
// sellCount 店铺销量
// supports	 活动支持
// date	营业时间
// pics	图片
export const API_EDIT=(params)=>axios.post("/shop/edit",params)
//  export const API_EDIT=(id,name,bulletin,avatar,deliveryPrice,deliveryTime,description,score,sellCount,supports,date,pics)=>axios.post("/shop/edit",{id,name,bulletin,avatar,deliveryPrice,deliveryTime,description,score,sellCount,supports,date,pics})
