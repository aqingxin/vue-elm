<template>
  <div class="loadMore">
    <p>
      <mt-spinner type="fading-circle" :size="20"></mt-spinner>
      <span class="loadMore-text">加载中</span>
    </p>
  </div>
</template>


<script>
export default {
  name:'loadMore'
}
</script>


<style scoped>
  .loadMore p {
    margin-top: 0.1rem;
    margin-bottom: 0.1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.16rem;
  }
  .loadMore-text {
    margin-left: 0.1rem;
  } 
</style>
