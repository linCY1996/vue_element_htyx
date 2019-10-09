<template>
  <div>
    <el-table :data="tableData" border style="width: 100%">
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
          <el-button type="primary" @click="alterBoss(scope.row)">修改</el-button>
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
    <!-- 弹出修改框 -->
    <el-dialog title="修改信息" :visible.sync="isAlter" width="70%">
      <el-form ref="form" label-width="140px">
        <el-form-item label="公司名称">
          <el-input v-model="userName"></el-input>
        </el-form-item>
        <el-form-item label="对接人姓名">
          <el-input v-model="jointName"></el-input>
        </el-form-item>
        <el-form-item label="对接人联系电话">
          <el-input v-model="phone"></el-input>
        </el-form-item>
        <el-form-item label="公司地址">
          <el-input v-model="address"></el-input>
        </el-form-item>
        <el-form-item label="营业执照">
          <el-image
            style="width: 200px;height: 200px"
            :src="businessUrl"
            :alt="businessUrl"
            fit="contain"
          ></el-image>
          <input type="file" accept="image/*" multiple @change="headImgChange" id="zhizhao" />
        </el-form-item>
      </el-form>
      <div class="el-dialog__footer" style="text-align:center;">
        <span slot="footer" class="dialog-footer">
          <el-button @click="isAlter = false">取 消</el-button>
          <el-button type="primary" @click="upBoss">确 定</el-button>
        </span>
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
      isAlter: false, //显示编辑更新
      isImgUrl:'',   //上传更新的营业执照
      userId:'',  //用户ID
      userName: "",  //公司名称
      jointName: "",   //对接人姓名
      phone: "",    //电话
      address: "",   //地址
      businessUrl: "",   //展示营业执照
    };
  },
  methods: {
    handleSizeChange(val) {
    },
    handleCurrentChange(val) {
      var that = this;
      this.$http
        .getBossList({
          cid: null,
          state: 2,
          page: that.currentPage3,
          roleType: 2,
          condition: null
        })
        .then(res => {
          that.tableData = res.data;
          if(res.data.length != 0) {
            this.total = res.data[0].ipage.total
          }
        });
    },

    // 修改信息
    alterBoss(row) {
      this.isAlter = true;
      this.userId = row.userId;
      this.userName = row.userName;
      this.jointName = row.jointName;
      this.phone = row.phone;
      this.address = row.address;
      this.businessUrl = row.businessUrl;
    },

    // base64转码
    headImgChange(e) {
      let that = this;
      let reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = function(e) {
        // console.log("e", e.target.result)
        that.isImgUrl = e.target.result; //img base64
        // console.log("imgs", this.isImgUrl)
      };
    },

    // 确认上传信息
    upBoss: function() {
      var file = document.getElementById("zhizhao").files[0];
      //console.log(file)
      if (this.businessUrl == null || this.businessUrl == undefined) {
        this.businessUrl = "";
      }

      //原生ajax实现文件上传
      var formData = new FormData();
      formData.append("file", file);
      formData.append("userId", this.userId);
      formData.append("businessUrl", this.businessUrl);
      formData.append("userName", this.userName);
      formData.append("jointName", this.jointName);
      formData.append("phone", this.phone);
      formData.append("address", this.address);
      formData.append("jobType", 1);

      let _this = this;
      _this
        .$ajax({
          url: _this.Global.host + "/user/updateUser",
          method: "POST",
          data: formData,
          processData: false, //  告诉jquery不要处理发送的数据
          contentType: false // 告诉jquery不要设置content-Type请求头
        })
        .then(res => {
          if (res.data.success == true) {
            _this.$message.success("信息修改成功");
            _this.handleCurrentChange(1);
          } else {
            _this.$message.error("信息修改失败");
          }
          _this.isAlter = false;
        });
    },
    // 禁用
    changeStatus(row) {
      var that = this;
      that.reload();
    }
  },
  mounted() {
    this.handleCurrentChange(1);
  }
};
</script>

<style lang="less" scoped>
</style>
