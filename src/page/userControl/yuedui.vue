<template>
  <div>
    <staff :isType="types"></staff>
  </div>
</template>

<script>
import staff from '@/components/staff.vue'
export default {
  components: {
    staff
  },
  data() {
    return {
      types: 'yuedui'
    };
  },
  methods: {
    
  },
  mounted() {
   
  }
};
</script>

<style lang="less" scoped>
</style>
