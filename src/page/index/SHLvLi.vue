<template>
  <div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="userId" label="用户 ID"></el-table-column>
      <el-table-column prop="userName" label="姓名"></el-table-column>
      <el-table-column prop="ctypeName" label="职业"></el-table-column>
      <el-table-column prop="activityName" label="活动名称"></el-table-column>
      <el-table-column prop="beginTime" label="活动时间"></el-table-column>
      <el-table-column prop="address" label="照片">
        <template slot-scope="scope">
          <el-carousel indicator-position="outside" :height="`192px`">
            <el-carousel-item v-for="item in scope.row.photoUrl" :key="item">
              <el-popover placement="right" title trigger="click">
                <el-image
                  slot="reference"
                  :src="item"
                  :alt="item"
                  style="max-height: 200px;max-width: 200px"
                ></el-image>
                 <div style="max-height: 800px;max-width: 800px">
                  <el-image :src="item" style="height: 100%;width: 100%"></el-image>
                </div>
              </el-popover>
            </el-carousel-item>
          </el-carousel>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="审核">
        <template slot-scope="scope">
          <el-button type="primary" size="small" v-on:click="bossPass(scope.row.rid)">通过</el-button>
          <el-button type="primary" size="small" @click="changeStatus(scope.row.rid)">未通过</el-button>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      currentPage3: 1, //默认展示第几页
      total: 0
    };
  },
  methods: {
    handleSizeChange(val) {
    },
    handleCurrentChange(val) {
      this.$http
        .lookLvli({
          page: this.currentPage3
        })
        .then(res => {
          var list = res.data;
          list.forEach(function (item) {
            item.photoUrl = item.photoUrl.split('-')
          })
          this.tableData = list
          console.log("dataList", this.tableData)
          
          if(res.data.length != 0) {
            this.total = res.data[0].ipage.total
          }
        });
    },
    // 审核通过
    bossPass(e) {
      this.$http
        .SHLvli({
          rid: e,
          state: 2
        })
        .then(res => {
          if (res.data == 1) {
            this.$message.success("履历审核通过");
            this.handleCurrentChange(1);
          }
        });
    },
    // 审核不通过
    changeStatus(e) {
      this.$http
        .SHLvli({
          rid: e,
          state: 3
        })
        .then(res => {
          if (res.data == 1) {
            this.$message.success("履历审核不通过");
            this.handleCurrentChange(1);
          }
        });
    }
  },
  mounted() {
    this.handleCurrentChange(1);
  }
};
</script>

<style lang="less" scoped>
</style>
