import axios from "axios"
//设置服务器IP地址
axios.defaults.baseURL = "http://localhost:5000"


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
export const API_ORDER_SEARCH = (currentPage, pageSize, orderNo, consignee, phone, orderState, date) => axios.get('/order/search', {
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