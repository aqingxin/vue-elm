<template>
  <div class="index">
    <transition :name="transitionName">
      <keep-alive>
        <router-view class="router-view aa" v-if="$route.meta.keepAlive" />
      </keep-alive>
    </transition>
    <transition :name="transitionName">
      <router-view class="router-view" v-if="!$route.meta.keepAlive" />
    </transition>
    <TabBar />
  </div>
</template>


<script>
import TabBar from '@/components/TabBar.vue'
export default {
  name:'Index',
  components:{
    TabBar
  },
  data(){
    return {
      transitionName:''
    }
  },
  watch:{
   $route(to,from){
     if(to.meta.index>from.meta.index){
       this.transitionName='slide-left';
     }else if(to.meta.index===from.meta.index){
       this.transitionName='';
     }else{
       this.transitionName='slide-right';
     }
   }
  }
}
</script>


<style scoped>
  .slide-right-enter-active,
  .slide-right-leave-active,
  .slide-left-enter-active,
  .slide-left-leave-active {
    will-change: transform;
    transition: all .3s;
    position: absolute;
    width:100%;
    left:0;
  }
  .slide-right-enter {
    transform: translateX(-100%);
  }
  .slide-right-leave-active {
    transform: translateX(100%);
  }
  .slide-left-enter {
    transform: translateX(100%);
  }
  .slide-left-leave-active {
    transform: translateX(-100%);
  }
</style>

