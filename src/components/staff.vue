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
      <el-table-column label="职业" prop="ctypeName"></el-table-column>
      <el-table-column label="模卡" prop="officialPhotoUrl">
        <template slot-scope="scope">
          <el-popover placement="right" title trigger="click">
            <el-image
              slot="reference"
              :src="scope.row.officialPhotoUrl"
              :alt="scope.row.officialPhotoUrl"
              style="max-height: 200px;max-width: 200px"
            ></el-image>
            <el-image :src="scope.row.officialPhotoUrl"></el-image>
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
                <el-image :src="item"></el-image>
              </el-popover>
            </el-carousel-item>
          </el-carousel>
        </template>
      </el-table-column>
      <el-table-column label="身高" prop="height"></el-table-column>
      <el-table-column label="体重" prop="weight"></el-table-column>
      <el-table-column label="审核" prop="desc">
        <template slot-scope="scope">
          <el-button type="primary" @click="updateUser(scope.row)">修改</el-button>
          <!-- <el-button type="primary" @click="defaultUser(scope.row)">禁用</el-button> -->
        </template>
      </el-table-column>
    </el-table>
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
    <!--查看视频-->
    <el-dialog title="视频" :visible.sync="playVideo">
      <div>
        <video :src="isVideo" controls="controls" style="width: 100%;"></video>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="playVideo = false">关闭</el-button>
      </div>
    </el-dialog>

    <!-- 修改 -->
    <el-dialog :title="'修改兼职'+userId+'的信息'" :visible.sync="xiugai">
      <div style="display: flex;flex-direction: column;align-items: flex-start;font-weight: 600">
        <div>
          <span>昵称:</span>
          <input class="userMsg" type="text" v-model="userName" />
        </div>
        <el-divider></el-divider>

        <div>
          <span>性别:</span>
          <input
            style="width: 60px;height: 18px"
            id="r1"
            type="radio"
            v-model="gender"
            value="男"
            name="gender"
          />男
          <input
            style="width: 60px;height: 18px"
            id="r2"
            type="radio"
            v-model="gender"
            value="女"
            name="gender"
          />女
        </div>
        <el-divider></el-divider>

        <div>
          <span>年龄:</span>
          <input class="userMsg" type="text" v-model="age" />
        </div>
        <el-divider></el-divider>

        <div>
          <span>电话:</span>
          <input class="userMsg" type="text" v-model="phone" />
        </div>
        <el-divider></el-divider>

        <div>
          <span>职业:</span>
          <div style="display: inline-block" v-for="(item,index) in jobType" :key="index">
            <input
              style="width: 60px;height: 18px"
              type="radio"
              v-model="cTypeName"
              :value="item.cname"
              name="job"
            />
            {{item.cname}}
          </div>
        </div>
        <el-divider></el-divider>

        <div>
          <span>住址:</span>
          <input class="userMsg" style="width: 400px" type="text" v-model="address" />
        </div>
        <el-divider></el-divider>
        <div>
          <span>视频:</span>
          <video :src="videoUrl" controls="controls" style="width: 200px;height: 200px"></video>
          <input type="file" id="staffvideo" name="videoUrl" />
        </div>
        <el-divider></el-divider>
        <div>
          <span>海豚认证视频:</span>
          <video :src="dolphinVideoUrl" controls="controls" style="width: 200px;height: 200px"></video>
          <input type="file" id="dolphinVideo" name="dolphinUrl" />
          <el-button
            size="mini"
            style="position: relative;top: 0px;left: 10px"
            @click="video(dolphinVideoUrl)"
          >上传</el-button>
        </div>
        <el-divider></el-divider>

        <div>
          <span>个人模卡:</span>
          <el-image
            :src="officialPhotoUrl"
            id="img4"
            style="width: 80px;height: 80px"
            fit="contain"
          ></el-image>
          <input type="file" id="newimg4" name="card" />
          <el-button
            size="mini"
            style="position: relative;top: 0px;left: 10px"
            @click="img4(officialPhotoUrl)"
          >上传</el-button>
        </div>
        <el-divider></el-divider>

        <div style="display: flex;flex-direction: row">
          <div>
            <span>个人照片:</span>
          </div>

          <div style="margin-right: 20px;display: flex;flex-direction: column">
            <el-image :src="photoList1" id="img1" style="width: 80px;height: 80px" fit="contain"></el-image>
            <input type="file" id="newimg1" style="font-size: 10px" name="file" />
            <el-button size="mini" style="width: 60px;margin-top: 20px" @click="img1(photoList1)">上传</el-button>
          </div>

          <div style="margin-right: 20px;display: flex;flex-direction: column">
            <el-image :src="photoList2" id="img2" style="width: 80px;height: 80px" fit="contain"></el-image>
            <input type="file" id="newimg2" style="font-size: 10px" name="file" />
            <el-button size="mini" style="width: 60px;margin-top: 20px" @click="img2(photoList2)">上传</el-button>
          </div>
          <div style="margin-right: 20px;display: flex;flex-direction: column">
            <el-image :src="photoList3" id="img3" style="width: 80px;height: 80px" fit="contain"></el-image>
            <input type="file" id="newimg3" style="font-size: 10px" name="file" />
            <el-button size="mini" style="width: 60px;margin-top: 20px" @click="img3(photoList3)">上传</el-button>
          </div>
        </div>
        <el-divider></el-divider>

        <div style="display: flex;flex-direction: row">
          <div>
            <span>海豚认证:</span>
          </div>

          <div style="margin-right: 20px;display: flex;flex-direction: column">
            <el-image
              :src="dolphinPicList1"
              id="img5"
              style="width: 80px;height: 80px"
              fit="contain"
            ></el-image>
            <input type="file" id="newimg5" style="font-size: 10px" name="file" />
            <el-button
              size="mini"
              style="width: 60px;margin-top: 20px"
              @click="img5(dolphinPicList1)"
            >上传</el-button>
          </div>

          <div style="margin-right: 20px;display: flex;flex-direction: column">
            <el-image
              :src="dolphinPicList2"
              id="img6"
              style="width: 80px;height: 80px"
              fit="contain"
            ></el-image>
            <input type="file" id="newimg6" style="font-size: 10px" name="file" />
            <el-button
              size="mini"
              style="width: 60px;margin-top: 20px"
              @click="img6(dolphinPicList2)"
            >上传</el-button>
          </div>
          <div style="margin-right: 20px;display: flex;flex-direction: column">
            <el-image
              :src="dolphinPicList3"
              id="img7"
              style="width: 80px;height: 80px"
              fit="contain"
            ></el-image>
            <input type="file" id="newimg7" style="font-size: 10px" name="file" />
            <el-button
              size="mini"
              style="width: 60px;margin-top: 20px"
              @click="img7(dolphinPicList3)"
            >上传</el-button>
          </div>
        </div>
        <el-divider></el-divider>

        <div
          style="display: flex;flex-direction: row;justify-content: flex-start;align-items: center;"
        >
          <span style="flex-grow: 1;">身高:</span>
          <input
            style="flex-grow: 2;width: 60px;margin-right: 10px;height: 22px"
            type="text"
            v-model="height"
          />

          <span style="flex-grow: 1;">体重:</span>
          <input
            style="flex-grow: 2;width: 60px;margin-right: 10px;height: 22px"
            type="text"
            v-model="weight"
          />

          <span style="flex-grow: 1;">胸围:</span>
          <input
            style="flex-grow: 2;width: 60px;margin-right: 10px;height: 22px"
            type="text"
            v-model="chest"
          />

          <span style="flex-grow: 1;">臀围:</span>
          <input
            style="flex-grow: 2;width: 60px;margin-right: 10px;height: 22px"
            type="text"
            v-model="hipLine"
          />
        </div>
        <el-divider></el-divider>

        <div>
          <span>单价:</span>
          <input type="text" style="width: 60px;margin-right: 10px;height: 22px" v-model="price" />
        </div>
        <div>
          <el-button
            style="margin-left: 400px;margin-top: 30px"
            @click="submitForm(videoUrl)">确认提交</el-button>
          <span id="result" style="margin-left: 80px"></span>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  inject: ["reload"],
  props: {
    isType: String
  },
  data() {
    return {
      tableData: [],
      currentPage3: 1, //默认展示第几页
      total: 0,
      isVideo: "",
      playVideo: false,
      cid: 0, //查询不同人员信息的所需ID
      xiugai: false,
      userId: "",
      userName: "",
      gender: "",
      age: "",
      phone: "",
      cTypeName: "",
      address: "",
      videoUrl: "",
      officialPhotoUrl: "",
      photoList: "",
      photoList1: "",
      photoList2: "",
      photoList3: "",
      dolphinPicList: "",
      dolphinPicList1: "",
      dolphinPicList2: "",
      dolphinPicList3: "",
      height: "",
      weight: "",
      chest: "",
      hipLine: "",
      price: "",
      jobType: [],
      input1: "",
      dolphinVideoUrl: ""
    };
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      // var that = this;
      this.$http
        .getBossList({
          cid: this.cid,
          state: 2,
          page: this.currentPage3,
          roleType: 3,
          condition: null
        })
        .then(res => {
          this.tableData = res.data;
          console.log("staffList", res.data);
        });
    },
    // 观看video
    showVideo: function(e) {
      console.log("e", e);
      this.playVideo = true;
      this.isVideo = e;
    },
    // 修改信息
    updateUser(e) {
      console.log(e);
      this.xiugai = true;
      this.userId = e.userId;
      this.userName = e.userName;
      this.gender = e.gender;
      this.age = e.age;
      this.phone = e.phone;
      this.cTypeName = e.ctypeName;
      this.address = e.address;
      this.videoUrl = e.videoUrl;
      this.officialPhotoUrl = e.officialPhotoUrl;
      this.dolphinVideoUrl = e.dolphinVideoUrl;
      this.photoList = e.photoList;
      this.photoList1 = e.photoList[0];
      this.photoList2 = e.photoList[1];
      this.photoList3 = e.photoList[2];
      this.dolphinPicList = e.dolphinPicList;
      this.dolphinPicList1 = e.dolphinPicList[0];
      this.dolphinPicList2 = e.dolphinPicList[1];
      this.dolphinPicList3 = e.dolphinPicList[2];
      this.height = e.height;
      this.weight = e.weight;
      this.chest = e.chest;
      this.hipLine = e.hipLine;
      this.price = e.price;
      this.$http.getType({}).then(res => {
        this.jobType = res.data;
      });
    },
    // 上传视频
    video(dolphinVideoUrl) {
      var file = document.getElementById("dolphinVideo").files[0];
      // console.log(img4)
      if (dolphinVideoUrl == null || dolphinVideoUrl == undefined) {
        dolphinVideoUrl = "";
      }
      //原生ajax实现文件上传
      var formData = new FormData();
      formData.append("file", file);
      formData.append("userId", this.userId);
      let that = this;
      that
        .$ajax({
          method: "post",
          url: that.Global.host + "/user/updateDolphinUrl",
          data: formData,
          processData: false, //  告诉jquery不要处理发送的数据
          contentType: false // 告诉jquery不要设置content-Type请求头
        })
        .then(res => {
          console.log("res", res);
          if (res.data.success == true) {
            that.$message.success("视频添加成功");
            that.dolphinVideoUrl = res.data.data;
            that.reload();
          } else {
            _this.$message.error("视频添加失败");
          }
        });
    },
    // 个人照片上传
    img1: function(img1) {
      var file = document.getElementById("newimg1").files[0];
      // console.log(img4)
      if (img1 == null || img1 == undefined) {
        img1 = "";
      }
      //原生ajax实现文件上传
      var formData = new FormData();
      formData.append("Url", img1); // 可以增加表单数据
      formData.append("file", file);
      formData.append("userId", this.userId);
      formData.append("pType", 3);

      let _this = this;
      _this
        .$ajax({
          url: _this.Global.host + "/user/updateFile",
          method: "POST",
          data: formData,
          processData: false, //  告诉jquery不要处理发送的数据
          contentType: false // 告诉jquery不要设置content-Type请求头
        })
        .then(res => {
          console.log("imgs=", res);
          if (res.data.success == true) {
            _this.photoList1 = res.data.data;
            _this.$message.success("图片修改成功");
            _this.reload();
          } else {
            _this.$message.error("图片修改失败");
          }
        });
    },
    img2: function(img2) {
      var file = document.getElementById("newimg2").files[0];
      // console.log(img4)
      if (img2 == null || img2 == undefined) {
        img2 = "";
      }

      //原生ajax实现文件上传
      var formData = new FormData();
      formData.append("Url", img2); // 可以增加表单数据
      formData.append("file", file);
      formData.append("userId", this.userId);
      formData.append("pType", 3);

      let _this = this;
      _this
        .$ajax({
          url: _this.Global.host + "/user/updateFile",
          method: "POST",
          data: formData,
          processData: false, //  告诉jquery不要处理发送的数据
          contentType: false // 告诉jquery不要设置content-Type请求头
        })
        .then(res => {
          if (res.data.success == true) {
            _this.photoList2 = res.data.data;
            _this.$message.success("图片修改成功");
            _this.reload();
          } else {
            _this.$message.error("图片修改失败");
          }
        });
    },
    img3: function(img3) {
      var file = document.getElementById("newimg3").files[0];
      // console.log(img4)
      if (img3 == null || img3 == undefined) {
        img3 = "";
      }

      //原生ajax实现文件上传
      var formData = new FormData();
      formData.append("Url", img3); // 可以增加表单数据
      formData.append("file", file);
      formData.append("userId", this.userId);
      formData.append("pType", 3);

      let _this = this;
      _this
        .$ajax({
          url: _this.Global.host + "/user/updateFile",
          methods: "POST",
          data: formData,
          processData: false, //  告诉jquery不要处理发送的数据
          contentType: false // 告诉jquery不要设置content-Type请求头
        })
        .then(res => {
          if (res.data.success == true) {
            _this.photoList3 = res.data.data;
            _this.$message.success("图片修改成功");
            _this.reload();
          } else {
            _this.$message.error("图片修改失败");
          }
        });
    },
    //模卡
    img4: function(img4) {
      var file = document.getElementById("newimg4").files[0];
      // console.log(img4)
      if (img4 == null || img4 == undefined) {
        img4 = "";
      }

      //原生ajax实现文件上传
      var formData = new FormData();
      formData.append("Url", img4); // 可以增加表单数据
      formData.append("file", file);
      formData.append("userId", this.userId);
      formData.append("pType", 2);

      let _this = this;
      _this
        .$ajax({
          url: _this.Global.host + "/user/updateFile",
          method: "POST",
          data: formData,
          processData: false, //  告诉jquery不要处理发送的数据
          contentType: false // 告诉jquery不要设置content-Type请求头
        })
        .then(res => {
          if (res.data.success == true) {
            _this.officialPhotoUrl = res.data.data;
            _this.$message.success("图片修改成功");
            _this.reload();
          } else {
            _this.$message.error("图片修改失败");
          }
        });
    },
    //海豚认证
    img5: function(img5) {
      var file = document.getElementById("newimg5").files[0];
      // console.log(img4)
      if (img5 == null || img5 == undefined) {
        img5 = "";
      }

      //原生ajax实现文件上传
      var formData = new FormData();
      formData.append("Url", img5); // 可以增加表单数据
      formData.append("file", file);
      formData.append("userId", this.userId);
      formData.append("pType", 5);

      let _this = this;
      _this
        .$ajax({
          url: _this.Global.host + "/user/updateFile",
          method: "POST",
          data: formData,
          processData: false, //  告诉jquery不要处理发送的数据
          contentType: false // 告诉jquery不要设置content-Type请求头
        })
        .then(res => {
          if (res.data.success == true) {
            _this.dolphinPicList1 = res.data.data;
            _this.$message.success("图片修改成功");
            _this.reload();
          } else {
            _this.$message.error("图片修改失败");
          }
        });
    },
    img6: function(img6) {
      var file = document.getElementById("newimg6").files[0];
      // console.log(img4)
      if (img6 == null || img6 == undefined) {
        img6 = "";
      }

      //原生ajax实现文件上传
      var formData = new FormData();
      formData.append("Url", img6); // 可以增加表单数据
      formData.append("file", file);
      formData.append("userId", this.userId);
      formData.append("pType", 5);

      let _this = this;
      _this.$ajax({
        url: _this.Global.host + "/user/updateFile",
        method: "POST",
        data: formData,
        processData: false, //  告诉jquery不要处理发送的数据
        contentType: false, // 告诉jquery不要设置content-Type请求头
      }).then(res => {
        if (res.data.success == true) {
            _this.dolphinPicList2 = res.data.data;
            _this.$message.success("图片修改成功");
            _this.reload();
          } else {
            _this.$message.error("图片修改失败");
          }
      })
    },
    img7: function(img7) {
      var file = document.getElementById("newimg7").files[0];
      // console.log(img4)
      if (img7 == null || img7 == undefined) {
        img7 = "";
      }
      //原生ajax实现文件上传
      var formData = new FormData();
      formData.append("Url", img7); // 可以增加表单数据
      formData.append("file", file);
      formData.append("userId", this.userId);
      formData.append("pType", 5);

      let _this = this;
      _this.$ajax({
        url: _this.Global.host + "/user/updateFile",
        method: "POST",
        data: formData,
        processData: false, //  告诉jquery不要处理发送的数据
        contentType: false, // 告诉jquery不要设置content-Type请求头
      }).then(res => {
        if (res.data.success == true) {
            _this.dolphinPicList3 = res.data.data;
            _this.$message.success("图片修改成功");
            _this.reload();
          } else {
            _this.$message.error("图片修改失败");
          }
      })
    },
    //上传表单
    submitForm: function(videoUrl) {
      console.log("45454")
      let file = document.getElementById("staffvideo").files[0];
      //console.log(file)
      if (videoUrl == null || videoUrl == undefined) {
        videoUrl = "";
      }
      //原生ajax实现文件上传
      var formData = new FormData();
      formData.append("file", file);
      formData.append("userId", this.userId);
      formData.append("userName", this.userName);
      formData.append("gender", this.gender);
      formData.append("age", this.age);
      formData.append("cTypeName", this.cTypeName);
      formData.append("phone", this.phone);
      formData.append("address", this.address);
      formData.append("height", this.height);
      formData.append("weight", this.weight);
      formData.append("chest", this.chest);
      formData.append("hipLine", this.hipLine);
      formData.append("price", this.price);
      formData.append("jobType", 2);
      console.log(formData);
      let _this = this;
      _this.$ajax({
        url: _this.Global.host + "/user/updateUser",
        method: "POST",
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        processData: false,
        
      }).then(res => {
        if(res.data.success == true) {
          _this.$message.success("用户信息修改成功")
          _this.handleCurrentChange(1)
        }else {
          _this.$message.error("用户信息修改失败")
        }
        _this.xiugai = false
        
      })
    }
  },
  mounted() {
    console.log("types", this.isType);
    switch (this.isType) {
      case "liyi":
        this.cid = 1;
        break;
      case "mote":
        this.cid = 2;
        break;
      case "yuedui":
        this.cid = 3;
        break;
      case "wutuan":
        this.cid = 4;
        break;
    }
    this.handleCurrentChange(1);
    // this.$http.getType({}).then(res => {

    // })
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

.el-carousel {
  height: 225px;
}
</style>
