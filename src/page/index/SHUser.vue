<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="昵称">
              <span>{{ props.row.userName }}</span>
            </el-form-item>
            <el-form-item label="性别">
              <span>{{ props.row.gender }}</span>
            </el-form-item>
            <el-form-item label="年龄">
              <span>{{ props.row.age }}</span>
            </el-form-item>
            <el-form-item label="联系电话">
              <span>{{ props.row.phone }}</span>
            </el-form-item>
            <el-form-item label="现住地址">
              <span>{{ props.row.address }}</span>
            </el-form-item>
            <el-form-item label="身高">
              <span>{{ props.row.height }} cm</span>
            </el-form-item>
            <el-form-item label="体重">
              <span>{{ props.row.weight }} kg</span>
            </el-form-item>
            <el-form-item label="胸围">
              <span>{{ props.row.chest }} cm</span>
            </el-form-item>
            <el-form-item label="臀围">
              <span>{{ props.row.hipLine }} cm</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="用户 ID" prop="userId"></el-table-column>
      <el-table-column label="姓名" prop="userName"></el-table-column>
      <el-table-column label="职业" prop="ctypeName"></el-table-column>
      <el-table-column label="模卡" prop="officialPhotoUrl">
        <template slot-scope="scope">
          <el-popover placement="right" title trigger="click">
            <el-image
              slot="reference"
              fit="contain"
              :src="scope.row.officialPhotoUrl"
              :alt="scope.row.officialPhotoUrl"
              style="max-height: 200px;max-width: 200px"
            ></el-image>
            <div style="max-height: 800px;max-width: 800px">
              <el-image :src="scope.row.officialPhotoUrl" style="height: 100%;width: 100%"></el-image>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="视频" prop="cTypeName">
        <template slot-scope="scope">
          <span
            v-if="scope.row.videoUrl!=null"
            style="color: #66b1ff"
            class="playVideo"
            @click="showVideo(scope.row.videoUrl)"
          >查看</span>
          <span v-if="scope.row.videoUrl==null">暂无</span>
        </template>
      </el-table-column>
      <el-table-column label="年龄" prop="age"></el-table-column>
      <el-table-column label="照片" prop="photoList">
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
                <div style="max-height: 800px;max-width: 800px">
                  <el-image :src="item" style="height: 100%;width: 100%"></el-image>
                </div>
              </el-popover>
            </el-carousel-item>
          </el-carousel>
        </template>
      </el-table-column>
      <el-table-column label="身高" prop="height"></el-table-column>
      <el-table-column label="体重" prop="weight"></el-table-column>
      <el-table-column label="审核" prop="desc">
        <template slot-scope="scope">
          <el-button type="primary" @click="passUser(scope.row)">通过</el-button>
          <el-button type="primary" @click="defaultUser(scope.row)">未通过</el-button>
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
    <!--查看视频-->
    <el-dialog title="视频" :visible.sync="playVideo">
      <div>
        <video :src="isVideo" controls="controls" style="width: 100%;"></video>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="playVideo = false">关闭</el-button>
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
      isVideo: "",
      playVideo: false
    };
  },
  methods: {
    handleSizeChange(val) {},
    handleCurrentChange(val) {
      var that = this;
      this.$http
        .getBossList({
          cid: null,
          state: 1,
          page: that.currentPage3,
          roleType: 3,
          condition: null
        })
        .then(res => {
          that.tableData = res.data;
          if (res.data.length != 0) {
            this.total = res.data[0].ipage.total;
          }
        });
    },
    // 观看video
    showVideo: function(e) {
      this.playVideo = true;
      this.isVideo = e;
    },
    // 审核通过
    passUser(e) {
      this.$http
        .updateUser({
          userId: e.userId,
          state: 2
        })
        .then(res => {
          if (res.success == true) {
            this.handleCurrentChange(1);
            this.$message.success("编辑人员审核通过成功");
          } else {
            this.handleCurrentChange(1);
          }
        });
    },
    // 审核不通过
    defaultUser(e) {
      this.$http
        .updateUser({
          userId: e.userId,
          state: 3
        })
        .then(res => {
          if (res.success == true) {
            this.handleCurrentChange(1);
            this.$message.success("编辑人员审核未通过成功");
          } else {
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
.playVideo:hover {
  text-decoration: underline;
  cursor: pointer;
}
td:hover {
  cursor: pointer;
}
.el-carousel__container {
  height: 208px;
}
</style>
