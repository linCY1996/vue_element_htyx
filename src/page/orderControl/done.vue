<template>
  <div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="orderId" label="订单号"></el-table-column>
      <el-table-column prop="companyName" label="公司名称"></el-table-column>
      <el-table-column prop="jointName" label="对接人姓名"></el-table-column>
      <el-table-column prop="phone" label="对接人联系电话"></el-table-column>
      <el-table-column prop="address" label="公司地址"></el-table-column>
      <el-table-column prop="activityAddress" label="活动地址"></el-table-column>
      <el-table-column prop="activityName" label="活动名称"></el-table-column>
      <el-table-column prop="beforeTime" label="开始时间"></el-table-column>
      <el-table-column prop="afterTime" label="结束时间"></el-table-column>
      <el-table-column prop="address" label="甲方需求">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="small"
            @click="showCart(scope.row.list,scope.row.activityName,scope.row.activityAddress,scope.row.beforeTime,scope.row.afterTime,scope.row.orderRemark)"
          >查看</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="sumPrice" label="总价"></el-table-column>
      <el-table-column prop="orderState" label="订单状态"></el-table-column>
    </el-table>
    <!--分页-->
    <div class="block" style="text-align:center;">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage3"
        :page-size="20"
        layout="prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
    <!--甲方选择的人员-->
    <el-dialog title="甲方需求" :visible.sync="isCart">
      <div style="display: flex;flex-direction: column;align-items: flex-start">
        <div>
          <span>活动名称:</span>
          <span>{{aname}}</span>
        </div>
        <el-divider></el-divider>
        <div>
          <span>活动地址:</span>
          <span>{{activityAddress}}</span>
        </div>
        <el-divider></el-divider>
        <div>
          <span>活动时间:</span>
          <span>{{beforetime}}至{{aftertime}}</span>
        </div>
        <el-divider></el-divider>
        <div>
          <span>活动备注:</span>
          <span>{{remark}}</span>
        </div>
        <el-divider></el-divider>
      </div>
      <div
        style="height: 600px;overflow-y: auto;display: flex;flex-direction: row;flex-wrap: wrap;"
      >
        <div
          v-for="(item,index) in cartList"
          :key="index"
          style="display: inline-block;margin-right: 10px"
        >
          <div>
            <el-image style="width: 80px; height: 80px" :src="item.photoUrl" fit="fill"></el-image>
            <div>
              &nbsp;
              <span>{{item.cname}}</span>
              &nbsp;
              <span>{{item.userName}}</span>
            </div>
            <div style="text-align:center">价格:{{item.price}}</div>
          </div>
        </div>
      </div>
      <div style="margin-top: 20px;text-align:center">
        <el-button type="primary" style="color: white;" @click="isCart=false">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      currentPage3: 1, //默认展示第几页
      total: 0,
      isCart: false, //显示甲方需求
      cartList: [], //甲方需求人员列表
      beforetime: "", //甲方开始时间
      aname: "", //  活动名称
      activityAddress: "", //活动地址
      aftertime: "", //结束时间
      remark: "" //活动备注
    };
  },
  methods:{
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      var that = this;
      this.$http
        .getOrderList({
          cid: null,
          state: 4,
          page: that.currentPage3,
          orderType: 1,
          condition: null
        })
        .then(res => {
          that.tableData = res.data;
          console.log("doneList", res.data);
        });
    },
    //点击查看甲方需求
    showCart(cartList, aname, activityAddress, beforetime, aftertime, remark) {
      this.isCart = true;
      this.cartList = cartList;
      this.aname = aname;
      this.activityAddress = activityAddress;
      this.beforetime = beforetime;
      this.aftertime = aftertime;
      this.remark = remark;
    },
  },
  mounted() {
    this.handleCurrentChange(1)
  }
};
</script>

<style lang="less" scoped>
</style>
