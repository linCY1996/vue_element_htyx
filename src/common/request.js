import httpRequest from '../common/api';

function timestamp(url) {
    //  var getTimestamp=Math.random();
    var getTimestamp = new Date().getTime();
    if (url.indexOf("?") > -1) {
      url = url + "×tamp=" + getTimestamp;
    } else {
      url = url + "?timestamp=" + getTimestamp;
    }
    return url;
  }

  export default {
        // 登录
        login: l => httpRequest.post('/user/login', l),

        // 获取审核中心--甲方审核信息
        getBossList: l => httpRequest.post('/user/list', l),

        // 获取审核中心--人员审核
        // getStaffList: l => httpRequest.post('/user/list', l),

        //获取审核中心--订单审核
        getOrderList: l => httpRequest.post('/order/list', l),

        //获取审核中心--履历审核
        getLvliList: l => httpRequest.post('/record/list', l),

        // 获取职业类型
        getType: l => httpRequest.post('/careerType/getType', l),

        //修改甲方审核信息 
        updateBossMsg: l => httpRequest.post('/user/updateUser', l),

        //人员审核通过(status=2)/不通过(status=3)
        updateUser: l => httpRequest.post('/user/updateState', l),

        // 审核订单状态，通过state = 5,    未通过state = 6
        updateOrderState: l => httpRequest.post('/order/updateOrderState', l),

        //修改订单状态为结束
        endOrder: l => httpRequest.post('/order/overOrder', l),

        //修改订单状态  加入进行中。。
        updateOrdering: l => httpRequest.post('/order/findRevOrder', l),

        //查询所有可以选择的人员
        finddependOrderUser: l => httpRequest.post('/order/findindependentOrderUser', l),

        //查看订单人选
        lookMainOrder: l => httpRequest.post('/order/findOrderUserList', l),

        // 创建并发布订单
        createOrder: l => httpRequest.post('/order/createOrder', l),

        // 修改订单状态为进行中
        updatesOrder: l => httpRequest.post('/order/updateState', l),

        //选择兼职添加到订单正式人选中
        addUserGoOrder: l => httpRequest.post('/order/insertUser', l),

        //查询审核通过的兼职列表及其个人标签
        lookUserTagAll: l => httpRequest.post('/user/eUserList', l),

        //查询所有的标签
        lookAlltag: l => httpRequest.post('/evaluateLabel/list', l),

        //更新用户标签
        updateUserTag: l => httpRequest.post('/user/updateSamIdList', l),

        //查看履历列表
        lookLvli: l => httpRequest.post('/record/list', l),

        //审核履历
        SHLvli: l => httpRequest.post('/record/update', l),

        //查询评价列表    evaluateType:::1为对兼职的评价，2为对公司的评价
        showCommandList: l => httpRequest.post('/evaluate/list', l),

        //删除一条评价记录
        delCommand: l => httpRequest.post('/evaluate/del', l),

        //查询抢单列表   state 3抢单中 2进行中 4已结束
        showOrderList: l => httpRequest.post('/order/findindependentOrder', l),

        //根据订单编号查询订单信息
        lookOrderMsgs: l => httpRequest.post('/order/findByIdOrder', l),

        //删除订单
        delOrder: l => httpRequest.post('/order/delOrder', l),

        //创建一个平台给兼职的独立订单
        createIndepentOrder: l => httpRequest.post('/order/createIndependent', l),

        // 删除已选人员
        delSelectUser: l => httpRequest.post('/order/delByUserId', l),
  }