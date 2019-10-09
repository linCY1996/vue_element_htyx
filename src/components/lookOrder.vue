<template>
  <el-dialog :title="'海豚印象订单'+oid+'订单详情'" :visible.sync="dialogVisible" :before-close="closeDialog">
    <div style="display: flex;flex-direction: column;align-items: flex-start;font-weight: 700">
      <div>
        <span>活动地址:</span>
        <span>{{orderMsg.activityAddress}}</span>
      </div>
      <el-divider></el-divider>
      <div>
        <span>活动时间:</span>
        <span>{{orderMsg.beforeTime}}至{{orderMsg.afterTime}}</span>
      </div>
      <el-divider></el-divider>
      <div>
        <span>活动备注:</span>
        <span>{{orderMsg.orderRemark}}</span>
      </div>
      <el-divider></el-divider>
      <div>
        <div>
          <el-form  class="demo-ruleForm">
            <div style="width: 100%;height: 400px;overflow-y:auto;">
              <div style="text-align: center">已选人员</div>
              <div style="display: flex;flex-direction: row;flex-wrap:wrap ;">
                <div
                  style="display: inline-block;margin-right: 10px"
                  v-for="(item,index) in selectedList"
                  :key="index"
                >
                  <el-image style="width: 80px; height: 80px" :src="item.photoUrl" fit="cover"></el-image>
                  <div>
                    &nbsp;&nbsp;<span>{{item.cname}}</span>
                    &nbsp;&nbsp;<span>{{item.userName}}</span>
                  </div>
                  <div style="text-align:center">价格:{{item.price}}</div>
                </div>
              </div>
            </div>
          </el-form>
        </div>
      </div>
    </div>
    <div slot="footer" class="dialog-footer" style="text-align:center">
      <el-button @click.native="closeDialog">关闭</el-button>
    </div>
  </el-dialog>
</template>
<script>
import Vue from 'vue';
export default {
  props: ["dialogVisible"],
  data() {
    return {
      orderMsg: "",
      selectedList: [], //已选人员
      oid: "",
      qiangForm: ""
    };
  },
  methods: {
    getData(oid) {
      var that = this;
      that.oid = oid;
      // console.log("oid", that.oid)
      that.$http
        .lookOrderMsgs({
          oid: oid
        })
        .then(res => {
          // console.log("msgs", res.data);
          that.orderMsg = res.data;
          that.selectedList = [];
          that.$http
            .lookMainOrder({
              oid: that.oid
            })
            .then(res => {
              // console.log("====", res);
              // 查询订单人选
              if (res.data != -1) {
                that.selectedList = res.data;
              }
            });
        });
    },
    // 关闭
    closeDialog() {
      this.$emit("update:dialogVisible", false);
    }
  },
  mounted() {}
};
</script>