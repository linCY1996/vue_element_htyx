<template>
  <div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="orderId" label="订单号"></el-table-column>
      <el-table-column prop="companyName" label="公司名称"></el-table-column>
      <el-table-column prop="jointName" label="对接人姓名"></el-table-column>
      <el-table-column prop="phone" label="对接人联系电话"></el-table-column>
      <el-table-column prop="address" label="公司地址"></el-table-column>
      <el-table-column prop="activityName" label="活动名称"></el-table-column>
      <el-table-column prop="beforeTime" label="开始时间"></el-table-column>
      <el-table-column prop="afterTime" label="结束时间"></el-table-column>
      <el-table-column prop="name" label="人员需求">
        <template slot-scope="scope">
          <div style="color: #409EFF;cursor:pointer" @click="showCart(scope.row.list,scope.row.orderId)">查看</div>
        </template>
      </el-table-column>
      <el-table-column prop="sumPrice" label="总价"></el-table-column>
      <el-table-column prop="address" label="审核">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="bossPass(scope.row.orderId)">通过</el-button>
            <el-button type="primary" size="small" @click="changeStatus(scope.row.orderId)">未通过</el-button>
        </template>
      </el-table-column>
    </el-table>
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
    <!--人员需求-->
    <el-dialog :title="'订单号'+oid+'的人员需求'" :visible.sync="isCart">
        <div style="display: flex;flex-direction: row">
          <div v-for="(item,index) in xuqiu" :key="index" style="margin-right: 16px">
            <el-image
              style="width: 100px; height: 100px"
              :src="item.photoUrl"
              fit="contain"></el-image>
            <div>
              &nbsp;&nbsp;<span>{{item.cname}}</span>
              &nbsp;&nbsp;<span>{{item.userName}}</span>
            </div>
            <div>
              &nbsp;&nbsp;<span style="font-size: 18px;margin-top: 10px;color: red">{{item.price}}元</span>
            </div>
          </div>
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
      isCart:false,   //显示需求
      oid:'',
      xuqiu:''
    };
  },
  methods: {
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      var that = this;
      this.$http
        .getOrderList({
          cid: null,
          state: 1,
          page: that.currentPage3,
          orderType: 1,
          condition: null
        })
        .then(res => {
          that.tableData = res.data;
          // console.log("orderList", res.data);
          if(res.data.length != 0) {
            this.total = res.data[0].ipage.total
          }
        });
    },
    // 点击查看显示需求
    showCart:function (list,oid) {
        this.oid=oid;
        this.isCart=true;
        //console.log(list)
        this.xuqiu=list
      },
      // 订单审核通过
      bossPass(e) {
        this.$http.updateOrderState({
          oid:e,
          state:5
        }).then(res => {
          if(res.success == true) {
            this.$message.success("订单审核通过")
            this.handleCurrentChange(1)
          }else {
            this.$message.error("服务器异常")
          }
        })
      },
      //订单审核未通过
      changeStatus(e) {
        this.$http.updateOrderState({
          oid:e,
          state:6
        }).then(res => {
          if(res.success == true) {
            this.$message.success("订单审核未通过")
            this.handleCurrentChange(1)
          }else {
            this.$message.error("服务器异常")
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
</style>
