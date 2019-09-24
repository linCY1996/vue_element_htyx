<template>
  <el-table :data="tableData" border style="width: 100%">
    <el-table-column prop="date" label="订单号"></el-table-column>
    <el-table-column prop="name" label="公司名称"></el-table-column>
    <el-table-column prop="address" label="对接人姓名"></el-table-column>
	<el-table-column prop="date" label="对接人联系电话"></el-table-column>
    <el-table-column prop="name" label="公司地址"></el-table-column>
    <el-table-column prop="address" label="活动名称"></el-table-column>
	<el-table-column prop="address" label="开始时间"></el-table-column>
    <el-table-column prop="date" label="结束时间"></el-table-column>
    <el-table-column prop="name" label="订单状态"></el-table-column>
    <el-table-column prop="address" label="操作"></el-table-column>
  </el-table>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
      }
    }
  }
</script>

<style lang="less" scoped>

</style>
