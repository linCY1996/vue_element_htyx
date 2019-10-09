<template>
  <!--查看抢单状态-->
  <el-dialog
    :title="'海豚印象订单'+orderMsg.orderId+'的抢单情况'"
    :visible.sync="dialogVisible"
    :before-close="closeDialog"
  >
    <div style="display: flex;flex-direction: column;align-items: flex-start;font-weight: 700">
      <div>
        <span>活动地址:</span>
        <span>{{orderMsg.activityAddress}}</span> 
      </div>
      <el-divider></el-divider>
      <div>
        <span>活动时间:</span>
        <span>{{orderMsg.beginTime}}至{{orderMsg.afterTime}}</span>
      </div>
      <el-divider></el-divider>
      <div>
        <span>活动备注:</span>
        <span>{{orderMsg.orderRemark}}</span>
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
                      &nbsp;
                      <span>{{item.cname}}</span>
                      &nbsp;
                      <span>{{item.userName}}</span>
                    </div>
                    <div style="text-align:center">价格:{{item.price}}</div>
                  </div>
                </el-checkbox>
              </el-checkbox-group>
            </el-form-item>

            <el-button type="primary" size="small" @click="selected">确认加入</el-button>
            <el-divider></el-divider>
            <el-form-item label="人员选择" prop="type" id="priceDiv">
              <el-checkbox-group
                v-model="qiangForm.outUserId"
                style="width: 100%;height: 400px;overflow-y:auto;display: flex;flex-direction: row;flex-wrap: wrap;"
              >
                <el-checkbox
                  v-for="(item,index) in selectedList"
                  :label="item.userId"
                  name="type"
                  :key="index"
                >
                  <div>
                    <el-image style="width: 80px; height: 80px" :src="item.photoUrl" fit="cover"></el-image>
                    <div>
                      &nbsp;
                      <span>{{item.cname}}</span>
                      &nbsp;
                      <span>{{item.userName}}</span>
                    </div>
                    <div style="text-align:center">价格:{{item.price}}</div>
                  </div>
                </el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-button type="primary" size="small" @click="goOutSelected()">确认移出</el-button>
            <!-- <div style="width: 100%;height: 400px;overflow-y:auto;">
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
                    &nbsp;
                    <span>{{item.userName}}</span>
                  </div>
                  <div style="text-align:center">价格:{{item.price}}</div>
                </div>
              </div>
            </div> -->
          </el-form>
        </div>
      </div>
    </div>
    <div slot="footer" class="dialog-footer" style="text-align:center">
      <el-button @click="closeDialog">关闭</el-button>
    </div>
  </el-dialog>
</template>

<script>
import Vue from "vue";
export default {
  props: ["dialogVisible"],
  inject:["reload"],
  data() {
    return {
      orderMsg: {},
      qiang: 0,
      staffA: [], //查询可选人员
      qiangForm: {
        userId: [],   //已选人员
        outUserId:[]   //删除人员
      },
      oid:'',   //订单id
      selectedList: [], //查看订单人选
      setIime: {},
      str: false
    };
  },
  methods: {
    closeDialog() {
      clearInterval(this.setIime);
      this.$emit("update:dialogVisible", false);
    },
    // 查看抢单情况
    showData(oid) {
      var that = this;
      that.oid = oid;
      that.staffA = [];
      that.selectedList = [];
      that.$http
        .lookOrderMsgs({
          oid: that.oid
        })
        .then(res => {
          // console.log("msgs", res.data);
          that.orderMsg = res.data;
          that.$http
            .lookMainOrder({
              oid: that.oid
            })
            .then(res => {
              // console.log("res", res);
              // 查询订单人选
              if (res.data != -1) {
                that.selectedList = res.data;
              }
              that.$http
                .finddependOrderUser({
                  oid: that.oid
                })
                .then(res => {
                  // 查询所有可选人员
                  // console.log("canChoooseuser", res.data);
                  that.staffA = res.data;
                });
              that.setIime = setInterval(function() {
                that.$http
                  .finddependOrderUser({
                    oid: that.oid
                  })
                  .then(res => {
                    // 查询所有可选人员
                    // console.log("canChoooseuser", res.data);
                    that.staffA = res.data;
                  });
              }, 10000);
            });
        });
    },
    // 确认加入
    selected() {
      // console.log("true", this.qiangForm.userId);
      let uid = this.qiangForm.userId;
      let uidStr = "";
      for (let i in uid) {
        if (i == 0) {
          uidStr += uid[i];
        } else {
          uidStr += "-" + uid[i];
        }
      }
      this.$http
        .addUserGoOrder({
          oid: this.oid,
          userIdStr: uidStr
        })
        .then(res => {
          // console.log("resData", res);
          if (res.data == 1) {
            this.$http
              .lookMainOrder({
                oid: this.oid
              })
              .then(res => {
                this.reload()
                // console.log("endRes", res);
                this.showData(this.oid)
                this.selectedList = res.data;
              });
          }
        });
    },
    // 确定移除
    goOutSelected() {
      // console.log("out", this.qiangForm.outUserId[0])
      // console.log("orderId", this.orderMsg.orderId)
      this.$http.delSelectUser({
        userId:this.qiangForm.outUserId[0],
        orderId:this.orderMsg.orderId
      }).then(res => {
        this.showData(this.oid)
        this.qiangForm.outUserId = []
        console.log("res", res)
      })
    }
  },
  mounted() {}
};
</script>

<style scoped>
.el-dialog__headerbtn {
  display: none;
}
</style>