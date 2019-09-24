<template>
  <div>
    <command :type="type" :evaluateType="evaluateType" />
  </div>
</template>

<script>
import command from "../../components/command";
export default {
  components: {
    command
  },
  data() {
    return {
      type: "user",
      evaluateType: 2
    };
  },
  methods: {},
  mounted() {}
};
</script>

<style lang="less" scoped>
</style>
