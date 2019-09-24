<template>
  <div>
    <command :type="type" :evaluateType="evaluateType"></command>
  </div>
</template>

<script>
import command from '../../components/command'
export default {
  components:{
    command
  },
  data() {
    return {
      type:'activity',
      evaluateType:1
    };
  },
  methods:{
    
  },
  mounted() {
  }
};
</script>

<style lang="less" scoped>
</style>
