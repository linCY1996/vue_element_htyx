<template>
  <div>
    <el-button type="primary" size="small" @click="changeStatus">发布订单</el-button>
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
      <el-table-column prop="orderState" label="订单状态"></el-table-column>
      <el-table-column prop="address" label="操作" width="250px;">
        <template slot-scope="scope">
          <el-button style="margin-right: 10px" type="primary" size="small" @click="showOneOrder(scope.row.orderId)">查看</el-button>
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
    <!-- 发布订单 -->
    <sendOrder ref="sendChild" :isShowOrder.sync="isShowOrder"></sendOrder>
    <!-- 查看订单 -->
    <qiang ref="children" :dialogVisible.sync="dialogVisible"></qiang>
  </div>
</template>

<script>
import sendOrder from '../../components/sendOrder'
import qiang from '../../components/qiangOrder'
export default {
   components:{
    sendOrder,
    qiang
  },
  data() {
    return {
      tableData: [],
      currentPage3: 1, //默认展示第几页
      total: 0,
      isShowOrder:false,  //发布订单
      dialogVisible:false,   //查看订单
    };
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      var that = this;
      this.$http
        .showOrderList({
          state: 2,
          page: that.currentPage3
        })
        .then(res => {
          that.tableData = res.data;
          console.log("bossList", res.data);
          if(res.data.length != 0) {
            this.total = res.data[0].ipage.total
          }
        });
    },
     // 发布订单
    changeStatus() {
      this.isShowOrder = true
      // this.$refs.sendChild
    },
    //查看订单
    showOneOrder(oid) {
      this.dialogVisible = true
      this.oid = oid
      this.$refs.children.showData(oid)
    },
    //结束订单
    joinEnd(oid) {
      this.$http.endOrder({
        oid:oid
      }).then(res=> {
        if(res.data == 1) {
          this.$message.success("成功结束订单")
          this.handleCurrentChange(1)
        }
      })
    } 
  },
  mounted() {
    this.handleCurrentChange(1)
  }
};
</script>

<style lang="less" scoped>
</style>
