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
      <el-table-column label="总价" prop="sumPrice"></el-table-column>
      <el-table-column label="甲方需求" prop="desc">
        <template slot-scope="scope">
          <td
            style="color:#409EFF;cursor:pointer"
            class="showcart"
            @click="showCart(scope.row.list,scope.row.activityName,scope.row.activityAddress,scope.row.beforeTime,scope.row.afterTime,scope.row.orderRemark)"
          >查看</td>
        </template>
      </el-table-column>
      <el-table-column label="订单状态" prop="orderState"></el-table-column>
      <!-- <el-table-column label="我方发布" prop="orderState">
        <template slot-scope="scope">
          <td style="color:#409EFF;cursor:pointer" class="showcart" @click="showRealCart(scope.row)">查看</td>
        </template>
      </el-table-column>-->
      <el-table-column label="操作" prop="desc" width="250px">
        <template slot-scope="scope">
          <td v-if="scope.row.orderState=='待处理'">
            <el-button type="primary" size="small" @click="changeStatus(scope.row.orderId)">发布订单</el-button>
          </td>
          <td v-if="scope.row.orderState=='抢单中'">
            <el-button type="primary" size="small" @click="showOneOrder(scope.row.orderId)">抢单情况</el-button>
            <el-button type="primary" size="small" @click="toStart(scope.row.orderId)">结束抢单</el-button>
          </td>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
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
    <!--弹出框-->
    <el-dialog :visible.sync="isShown">
      <div>
        <div style="font-weight: 600;margin-bottom: 10px">
          <span>{{isName}}未通过说明</span>
        </div>
        <form action>
          <div>
            <textarea name id style="width: 300px;height: 200px"></textarea>
          </div>
          <div style="margin-top: 8px">
            <input
              type="submit"
              style="width: 70px;height: 32px;background-color: #569eef;outline: none;color: white"
              value="发送"
            />
          </div>
        </form>
      </div>
    </el-dialog>

    <!--甲方选择的人员-->
    <el-dialog title="甲方需求" :visible.sync="isCart">
      <div style="display: flex;flex-direction: row">
        <div v-for="(item,index) in cartList" :key="index" style="margin-right: 16px">
          <el-image style="width: 100px; height: 100px" :src="item.photoUrl" fit="contain"></el-image>
          <div>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <span>{{item.cname}}</span>
            &nbsp;&nbsp;
            <span>{{item.userName}}</span>
          </div>
          <div style="text-align:center">价格:{{item.price}}</div>
          <div style="text-align:center">
            <span style="font-size: 18px;margin-top: 10px;color: red">{{item.price}}元</span>
          </div>
        </div>
      </div>
      <div style="margin-top: 20px;text-align:center">
        <el-button type="primary" style="color: white;" v-on:click="isCart=false">关闭</el-button>
      </div>
    </el-dialog>

    <!--查看抢单状态-->
    <el-dialog :title="'海豚印象订单'+oneOrder.oid+'的抢单情况'" :visible.sync="dialogVisible">
      <div style="display: flex;flex-direction: column;align-items: flex-start;font-weight: 700">
        <div>
          <span>活动地址:</span>
          <span>{{oneOrder.address}}</span>
        </div>
        <el-divider></el-divider>
        <div>
          <span>活动时间:</span>
          <span>{{oneOrder.beginTime}}至{{oneOrder.afterTime}}</span>
        </div>
        <el-divider></el-divider>
        <div>
          <span>活动备注:</span>
          <span>{{oneOrder.orderRemark}}</span>
        </div>
        <el-divider></el-divider>
        <div>
          <div>
            <el-form :model="qiangForm" class="demo-ruleForm">
              <el-form-item label="人员选择" prop="type" id="priceDiv">
                <el-checkbox-group
                  v-model="qiangForm.userId"
                  style="width: 100%;height: 400px;overflow-y:auto;display: flex;flex-direction: row;flex-wrap: wrap;"
                >
                  <el-checkbox
                    v-for="(item,index) in staffA"
                    :label="item.userId"
                    name="type"
                    :key="index"
                  >
                    <div>
                      <el-image style="width: 80px; height: 80px" :src="item.photoUrl" fit="cover"></el-image>
                      <div>
                        <span>{{item.cname}}</span>
                        <span>{{item.userName}}</span>
                      </div>
                      <div>价格:{{item.price}}</div>
                    </div>
                  </el-checkbox>
                </el-checkbox-group>
              </el-form-item>

              <el-button type="primary" size="small" @click="selected">确认加入</el-button>
              <el-divider></el-divider>
              <div style="width: 100%;height: 400px;overflow-y:auto;">
                <div style="display: flex;flex-wrap: wrap;">
                  <div style="text-align: left">已选人员</div>
                  <div
                    style="display: inline-block;margin-right: 10px"
                    v-for="(item,index) in selectedList"
                    :key="index"
                  >
                    <el-image style="width: 80px; height: 80px" :src="item.photoUrl" fit="cover"></el-image>
                    <div>
                      <span>{{item.cname}}</span>
                      &nbsp;&nbsp;<span>{{item.userName}}</span>
                    </div>
                    <div>价格:{{item.price}}</div>
                  </div>
                </div>
              </div>
            </el-form>
          </div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer" style="text-align:center">
        <el-button @click.native="dialogVisible = false" @click="qiang=0">关闭</el-button>
      </div>
    </el-dialog>

    <!--发布订单-->
    <el-dialog title="发布订单" :visible.sync="isShowOrder">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="活动名称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="活动地点" prop="name">
          <el-input v-model="ruleForm.address"></el-input>
        </el-form-item>
        <el-form-item label="活动时间" required>
          <el-col :span="8">
            <el-form-item prop="date1">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
                v-model="ruleForm.date1"
                style="width: 100%;"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :sm="1">
            <span>至</span>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="date1">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
                v-model="ruleForm.date2"
                style="width: 100%;"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="选择职业" prop="type" id="priceDiv">
          <el-checkbox-group v-model="ruleForm.type">
            <el-checkbox v-for="(item,index) in jobType" :label="item.cid" name="type" :key="index">
              <span>{{item.cname}}</span>
              &nbsp;&nbsp;&nbsp;
              <input
                type="text"
                class="priceInput"
                v-model="item.price"
                placeholder="价格"
                style="width: 40px;height: 20px"
              />元
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="活动备注" prop="desc">
          <el-input type="textarea" v-model="ruleForm.desc"></el-input>
        </el-form-item>
        <el-form-item style="text-align:center">
          <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
          <el-button @click="resetForm()">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  inject: ["reload"],
  data() {
    return {
      tableData: [],
      currentPage3: 1, //默认展示第几页
      total: 0,
      isShown: false,
      dataList: "",
      dialogVisible: false,
      isImgUrl: "",
      isName: "",
      isShowOrder: false,
      ruleForm: {
        name: "",
        address: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      rules: {
        name: [
          {
            required: true,
            message: "请输入活动名称",
            trigger: "blur"
          },
          {
            min: 1,
            max: 50,
            message: "长度在 1 到 50 个字符",
            trigger: "blur"
          }
        ],
        region: [
          {
            required: true,
            message: "请选择活动区域",
            trigger: "change"
          }
        ],
        date1: [
          {
            type: "string",
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        date2: [
          {
            type: "string",
            required: true,
            message: "请选择时间",
            trigger: "change"
          }
        ],
        type: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个活动性质",
            trigger: "change"
          }
        ],
        resource: [
          {
            required: true,
            message: "请选择活动资源",
            trigger: "change"
          }
        ],
        desc: [
          {
            required: true,
            message: "请填写活动形式",
            trigger: "blur"
          }
        ]
      },
      jobType: [],
      oid: "",
      oneOrder: "",
      qiang: 0,
      staffA: [], //所有可选择的人员
      qiangForm: {
        userId: []
      },
      selectedList: [], //所有可选择抢单人员
      isCart: false,
      cartList: "",
      setIime:{},
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
        .getOrderList({
          cid: null,
          state: 5,
          page: that.currentPage3,
          orderType: 1,
          condition: null
        })
        .then(res => {
          that.tableData = res.data;
          console.log("waitingList", res.data);
        });
    },
    // 显示甲方需求
    showCart(cartList, aname, activityAddress, beforetime, aftertime, remark) {
      this.isCart = true;
      this.cartList = cartList;
      this.aname = aname;
      this.activityAddress = activityAddress;
      this.beforetime = beforetime;
      this.aftertime = aftertime;
      this.remark = remark;
    },
    //查看我方发布
    showRealCart(e) {
      this.isRealCart = true;
      this.mySend = e;
    },
    // 发布订单
    changeStatus: function(oid) {
      if (this.isShowOrder) {
        this.isShowOrder = false;
      } else {
        this.isShowOrder = true;
      }
      //this.isName=name;
      this.oid = oid;
    },
    // 创建订单
    submitForm(formName) {
      let job = this.ruleForm.type;
      let str = "";
      for (var i = 0; i < job.length; i++) {
        for (var j = 0; j < this.jobType.length; j++) {
          if (job[i] == this.jobType[j].cid) {
            console.log("here");
            if (i == 0) {
              str += "c" + job[i] + "-" + this.jobType[j].price;
            } else {
              str += "_" + "c" + job[i] + "-" + this.jobType[j].price;
            }
          }
        }
      }
      // console.log("str", this.ruleForm.date1);
      this.$http
        .createOrder({
          activityName: this.ruleForm.name,
          activityBeginTime: this.ruleForm.date1,
          activityAfterTime: this.ruleForm.date2,
          activityAddress: this.ruleForm.address,
          orderRemark: this.ruleForm.desc,
          cTypeStr: str,
          orderId: this.oid,
          orderType: 1
        })
        .then(res => {
          if (res.success == true) {
            this.$message.success("订单创建成功");
            this.handleCurrentChange(1);
            this.isShowOrder = false;
          }
        });
    },
    resetForm() {
      var that = this;
      console.log("456");
      that.reload();
    },
    // 查看抢单情况
    async showOneOrder(e) {
      var that = this;
      await that.$http
        .updateOrdering({
          oId: e
        })
        .then(res => {
          that.oneOrder = res.data;
          that.dialogVisible = true;
          that.qiang = 1;
          var oid = that.oneOrder.oid;
          that.setIime = setInterval(function() {
            that.$http
              .finddependOrderUser({
                oid: oid
              })
              .then(res => {
                console.log("UserList", res.data);
                that.staffA = res.data;
              });
          }, 10000);
          // 查看已选人员
          this.$http
            .lookMainOrder({
              oid: this.oneOrder.oid
            })
            .then(res => {
              console.log("endRes", res);
              this.selectedList = res.data;
            });
        });
    },
    // 确认加入
    selected() {
      console.log("true", this.qiangForm.userId);
      let uid = this.qiangForm.userId;
      let uidStr = "";
      for (let i in uid) {
        if (i == 0) {
          uidStr += uid[i];
        } else {
          uidStr += "-" + uid[i];
        }
      }
      let oid = this.oneOrder.oid;
      this.$http
        .addUserGoOrder({
          oid: oid,
          userIdStr: uidStr
        })
        .then(res => {
          console.log("resData", res);
          if (res.data == 1) {
            this.$http
              .lookMainOrder({
                oid: this.oneOrder.oid
              })
              .then(res => {
                console.log("endRes", res);
                this.selectedList = res.data;
              });
          }
        });
    },
    // 结束抢单
    toStart(oid) {
      this.$http
        .updatesOrder({
          oId: oid
        })
        .then(res => {
          console.log("res", res.data);
          if (res.data == 1) {
            clearInterval(this.setIime)
            this.$message.success("成功结束抢单");
            this.handleCurrentChange(1);
          }
        });
    }
  },
  mounted() {
    this.handleCurrentChange(1);
    this.$http.getType({}).then(res => {
      var list = res.data;
      list.forEach(function(item) {
        item.price = 0;
      });
      this.jobType = list;
      // console.log("jobType", this.jobType);
    });
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
.showcart:hover {
  cursor: pointer;
}
</style>
