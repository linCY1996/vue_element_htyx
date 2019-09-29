<template>
  <div>
    <el-table :data="tableData" border style="width: 100%;">
      <el-table-column prop="userId" label="用户ID" width="100"></el-table-column>
      <el-table-column prop="userName" label="公司名称"></el-table-column>
      <el-table-column prop="jointName" label="对接人姓名"></el-table-column>
      <el-table-column prop="phone" label="对接人联系电话"></el-table-column>
      <el-table-column prop="address" label="公司地址"></el-table-column>
      <el-table-column prop="businessUrl" label="营业执照">
        <template slot-scope="scope">
          <el-popover placement="right" title trigger="click">
            <el-image
              slot="reference"
              :src="scope.row.businessUrl"
              :alt="scope.row.businessUrl"
              style="max-height: 200px;max-width: 200px"
            ></el-image>
            <el-image :src="scope.row.businessUrl"></el-image>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="审核">
        <template slot-scope="scope">
          <el-button type="primary" @click="passUser(scope.row)">通过</el-button>
          <el-button type="primary" @click="defaultUser(scope.row)">未通过</el-button>
          <!-- <el-button type="primary" @click="changeStatus(scope.row)">禁用</el-button> -->
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
    
  </div>
</template>

<script>
import Vue from 'vue';
export default {
  inject:['reload'],
  data() {
    return {
      tableData: [],
      currentPage3: 1, //默认展示第几页
      total: 0,
    };
  },
  methods: {
    // 加载
    openFullScreen() {
      this.loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      var that = this;
      this.$http
        .getBossList({
          cid: null,
          state: 1,
          page: that.currentPage3,
          roleType: 2,
          condition: null
        })
        .then(res => {
          that.tableData = res.data;
          console.log("bossList", res.data);
          if(res.data.length != 0) {
            this.total = res.data[0].ipage.total
          }
        });
    },
    
     // 审核通过
    passUser(e) {
      this.$http.updateUser({
        userId:e.userId,
        state:2
      }).then(res => {
         if(res.success == true) {
          this.handleCurrentChange(1)
          this.$message.success("编辑甲方审核通过成功")
        } else {
          this.handleCurrentChange(1)
        }
        console.log("res", res)
      })
    },
    // 审核不通过
    defaultUser(e) {
      // console.log(e);
      this.$http.updateUser({
        userId:e.userId,
        state:3
      }).then(res => {
        if(res.success == true) {
          this.handleCurrentChange(1)
          this.$message.error("编辑甲方审核未通过成功")
        } else {
          this.handleCurrentChange(1)
        }
      })
    },
    
  },
  mounted() {
    this.handleCurrentChange(1);
  }
};
</script>

<style lang="less" scoped>
// .Inputs input {
//   width: 80%;
//   border-bottom: 1px solid rgb(190, 190, 190);
// }
</style>
