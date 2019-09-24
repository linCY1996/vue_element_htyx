<template>
  <div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="user.userId" label="用户 ID"></el-table-column>
      <el-table-column prop="user.userName" label="昵称"></el-table-column>
      <el-table-column prop="address" label="标签">
        <template slot-scope="scope">
          <span v-for="(oldTag,tagIndex) in scope.row.set" :key="tagIndex">{{oldTag}}、</span>
        </template>
      </el-table-column>
      <el-table-column prop="date" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="showTagArea(scope.row.user.userId)">添加标签</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 添加标签弹窗 -->
    <el-dialog :title="'给用户'+uid+'添加标签'" :visible.sync="showTag" @close="reset()">
      <div>
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item prop="type" style="text-align:center">
            <!--label="活动性质"-->
            <el-checkbox-group v-model="form.type">
              <el-checkbox
                v-for="(item,index) in tagArr"
                :key="index"
                :label="item.elId"
              >{{item.elName}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item style="text-align:center">
            <el-button type="primary" @click="onSubmit">提交</el-button>
            <el-button @click="showTag=false">关闭</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
    <!--分页-->
    <!-- <div class="block" style="text-align:center;">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage3"
        :page-size="20"
        layout="prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      showTag: false,
      tagArr: "", //标签数组
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      uid: "" //用户id
    };
  },
  methods: {
    // 初始化
    getData() {
      this.$http.lookUserTagAll({}).then(res => {
        console.log("Usertag", res.data);
        this.tableData = res.data;
      });
    },
    //添加标签
    showTagArea(oid) {
      this.showTag = true;
      this.uid = oid
    },
    // 关闭添加标签
    reset: function() {
      this.$refs["form"].resetFields();
    },
    //点击提交
    onSubmit() {
      let tagId = this.form.type;
      let tagStr = "";
      let uid = this.uid;

      for (let i in tagId) {
        if (i == 0) {
          tagStr += tagId[i];
        } else {
          tagStr += "-" + tagId[i];
        }
      }
      // console.log("tags", tagStr);
      this.$http
        .updateUserTag({
          userId: uid,
          samIdStr: tagStr
        })
        .then(res => {
          this.showTag = false
          if (res.data == 1) {
            this.$message.success("用户修改标签成功");
            this.getData()
          }
        });
    }
  },
  mounted() {
    this.getData()
    this.$http.lookAlltag({}).then(res => {
      console.log("Alltag", res.data);
      this.tagArr = res.data;
    });
  }
};
</script>

<style lang="less" scoped>
</style>
