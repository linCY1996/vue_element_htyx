<template>
    <el-dialog :title="'海豚印象订单'+oid+'订单详情'" :visible.sync="lookOrders" :before-close="closeDialog">
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
            <el-form :model="qiangForm" class="demo-ruleForm">
              <div style="width: 100%;height: 400px;overflow-y:auto;">
                <div style="text-align: center">已选人员</div>
                <div style="display: flex;flex-direction: row;flex-wrap:wrap ;">
                  <div style="display: inline-block;margin-right: 10px" v-for="(item,index) in selectedList" :key="index">
                    <el-image
                      style="width: 80px; height: 80px"
                      :src="item.photoUrl"
                      fit="cover"></el-image>
                    <div>
                      <span>{{item.cName}}</span>
                      <span>{{item.userName}}</span>
                    </div>
					<div>价格:{{item.price}}</div>
                  </div>
                </div>
              </div>
            </el-form>
          </div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="closeDialog">关闭</el-button>
      </div>
    </el-dialog>
</template>
<script>
export default {
    props:["lookOrders"],
    data(){
        return{
            orderMsg:'',
            selectedList:[],  //已选人员
            oid:'',
            qiangForm:''
        }
    },
    methods:{
        getData(oid) {
            this.oid = oid
            this.$http.lookOrderMsgs({
                oid:oid
            }).then(res => {
                this.orderMsg = res.data
                this.$http.lookMainOrder({
                    oid:oid
                }).then(res => {
                    this.selectedList = res.data
                })
            })
        },
        // 关闭
        closeDialog() {
            this.$emit('update:lookOrders', false)
        }
    },
    mounted() {

    }
}
</script>