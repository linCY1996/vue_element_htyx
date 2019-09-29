<template>
  <div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="eid" label="订单号"></el-table-column>
      <el-table-column prop="companyName" v-if="type == 'activity'" label="公司名称"></el-table-column>
      <el-table-column prop="companyName" v-if="type == 'user'" label="人员昵称"></el-table-column>
      <el-table-column prop="activityName" label="活动名称"></el-table-column>
      <el-table-column prop="beginTime" label="开始时间"></el-table-column>
      <el-table-column prop="afterTime" label="结束时间"></el-table-column>
      <el-table-column prop="address" label="活动照片">
          <template slot-scope="scope">
          <el-carousel indicator-position="outside" :height="`192px`">
            <el-carousel-item v-for="item in scope.row.photoList" :key="item">
              <el-popover placement="right" title trigger="click">
                <el-image
                  slot="reference"
                  :src="item"
                  :alt="item"
                  style="max-height: 200px;max-width: 200px"
                ></el-image>
                <el-image :src="item"></el-image>
              </el-popover>
            </el-carousel-item>
          </el-carousel>
        </template>
      </el-table-column>
      <el-table-column prop="evaluateMessage" label="评价内容"></el-table-column>
      <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
              <el-button type="primary" size="small" @click="delPing(scope.row.eid)">删除</el-button>
          </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
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
  props: ["type", "evaluateType"],
  data() {
    return {
      tableData: [],
      currentPage3: 1, //默认展示第几页
      total: 0
    };
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.$http
        .showCommandList({
          page: this.currentPage3,
          evaluateType: this.evaluateType
        })
        .then(res => {
          this.tableData = res.data;
          console.log("CommandList", res.data);
          if(res.data.length != 0) {
            this.total = res.data[0].ipage.total
          }
        });
    },
    // 删除
    delPing(e) {
        console.log("e", e)
        this.$http.delCommand({
            eId:e
        }).then(res => {
            console.log("res", res)
            if(res.success == true) {
                this.$message.success("评论删除成功")
                this.handleCurrentChange(1)
            }else {
                this.$message.error("服务器异常")
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
