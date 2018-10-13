<template>
  <div class="tabbar">
    <mt-tabbar v-model="selected" fixed>
      <mt-tab-item id="home">
        <!-- <img slot="icon" src="../assets/TabHomeIcon.png" alt="home"> -->
        首页
      </mt-tab-item>
      <mt-tab-item id="订单">
       
        订单
      </mt-tab-item>
      <mt-tab-item id="发现">
       
        发现
      </mt-tab-item>
      <mt-tab-item id="我的">
       
        我的
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
export default {
  name:'TabBar',
  data() {
    return {
      selected:'home'
    }
  }
}
</script>


<style scoped>
  .mint-tabbar.is-fixed {
    height: 0.6rem;
  }
  
</style>
