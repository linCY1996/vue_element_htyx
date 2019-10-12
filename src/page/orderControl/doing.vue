<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="订单号">
              <span>{{ props.row.orderId }}</span>
            </el-form-item>
            <el-form-item label="公司名称">
              <span>{{ props.row.companyName }}</span>
            </el-form-item>
            <el-form-item label="对接人姓名">
              <span>{{ props.row.jointName }}</span>
            </el-form-item>
            <el-form-item label="对接人联系电话">
              <span>{{ props.row.phone }}</span>
            </el-form-item>
            <el-form-item label="公司地址">
              <span>{{ props.row.address }}</span>
            </el-form-item>
            <el-form-item label="活动地址">
              <span>{{ props.row.activityAddress }}</span>
            </el-form-item>
            <el-form-item label="活动名称">
              <span>{{ props.row.activityName }}</span>
            </el-form-item>
            <el-form-item label="开始时间">
              <span>{{ props.row.beforeTime }}</span>
            </el-form-item>
            <el-form-item label="结束时间">
              <span>{{ props.row.afterTime }}</span>
            </el-form-item>
            <el-form-item label="总价">
              <span>{{ props.row.sumPrice }}</span>
            </el-form-item>
            <el-form-item label="订单状态">
              <span>{{ props.row.orderState }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="订单号" prop="orderId"></el-table-column>
      <el-table-column label="公司名称" prop="companyName"></el-table-column>
      <el-table-column label="对接人姓名" prop="jointName"></el-table-column>
      <el-table-column label="对接人联系电话" prop="phone"></el-table-column>
      <el-table-column label="活动地址" prop="activityAddress"></el-table-column>
      <el-table-column label="活动名称" prop="activityName"></el-table-column>
      <el-table-column label="甲方需求" prop="sumPrice">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="small"
            @click="showCart(scope.row.list,scope.row.activityName,scope.row.activityAddress,scope.row.beforeTime,scope.row.afterTime,scope.row.orderRemark)"
          >查看</el-button>
        </template>
      </el-table-column>
      <el-table-column label="总价" prop="sumPrice"></el-table-column>
      <el-table-column label="订单状态" prop="orderState"></el-table-column>
      <!-- <el-table-column label="甲方需求" prop="desc"></el-table-column> -->
      <!-- <el-table-column label="我方发布" prop="desc"></el-table-column> -->
      <el-table-column label="操作" prop="desc" width="250px">
        <template slot-scope="scope" style="display:flex;justify-content: space-between">
          <el-button type="primary" size="small" @click="showRealCart(scope.row.orderId)">查看</el-button>
          <el-button type="primary" size="small" @click="joinEnd(scope.row.orderId)">结束订单</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <div class="block" style="text-align:center;">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage3"
        :page-size="11"
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

    <!--我方发布-->
    <el-dialog title="我方发布" :visible.sync="isRealCart">
      <div style="display: flex;flex-direction: column;align-items: flex-start">
        <div>
          <span>活动地址:</span>
          <span>{{realXuqiu.address}}</span>
        </div>
        <el-divider></el-divider>
        <div>
          <span>活动时间:</span>
          <span>{{realXuqiu.beginTime}}至{{realXuqiu.afterTime}}</span>
        </div>
        <el-divider></el-divider>
        <div>
          <span>活动备注:</span>
          <span>{{realXuqiu.orderRemark}}</span>
        </div>
        <el-divider></el-divider>
      </div>
      <div
        style="height: 600px;overflow-y: auto;display: flex;flex-direction: row;flex-wrap: wrap;"
      >
        <div
          v-for="(item,index) in realStaff"
          v-show="realStaff.length!=0"
          :key="index"
          style="display: inline-block;margin-right: 10px"
        >
          <div>
            <el-image style="width: 80px; height: 80px" :src="item.photoUrl" fit="cover"></el-image>
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
        <el-button type="primary" style="color: white;" @click="isRealCart=false">关闭</el-button>
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
      isRealCart: false, //显示我方发布
      realXuqiu: {}, //我方部分需求信息
      realStaff: [], //所需员工列表
      aname: "", //  活动名称
      activityAddress: "", //活动地址
      aftertime: "", //结束时间
      remark: "" //活动备注
    };
  },
  methods: {
    handleSizeChange(val) {
    },
    handleCurrentChange(val) {
      var that = this;
      this.$http
        .getOrderList({
          cid: null,
          state: 2,
          page: that.currentPage3,
          orderType: 1,
          condition: null
        })
        .then(res => {
          that.tableData = res.data;
          if(res.data.length != 0) {
            this.total = res.data[0].ipage.total
          }
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
    // 点击查看我方发布
    showRealCart(e) {
      this.isRealCart = true;
      this.realXuqiu = this.tableData[0];
      this.$http
        .updateOrdering({
          oId: e
        })
        .then(res => {
          var orderMsgs = res.data;
          this.realXuqiu = orderMsgs;
          this.$http
            .lookMainOrder({
              oid: orderMsgs.oid
            })
            .then(res => {
              if(res.data != -1) {
                this.realStaff = res.data;
              }
            });
        });
    },
    // 结束订单
    joinEnd(e) {
      this.$http.endOrder({
        oid:e
      }).then(res => {
        if(res.data == 1) {
          this.$message.success("成功结束订单")
          this.handleCurrentChange(1)
        }
      })
    }
  },
  mounted() {
    this.handleCurrentChange(1);
  }
};
</script>

<style lang="less" scoped>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>
