<template>
  <div id="app">
    <!-- <transition :name="transitionName">
      <keep-alive>
        <router-view class="router-view" v-if="$route.meta.keepAlive" />
      </keep-alive>
    </transition> -->
    <transition :name="transitionName">
      <router-view class="router-view" />
    </transition>
    <!-- <TabBar class="tabbar"/> -->
  </div>
</template>

<script>
// import TabBar from '@/components/TabBar.vue'
export default {
  name:'app',
  // components:{
  //   TabBar
  // },
  data(){
    return{
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


<style>
*{
  margin: 0;
  padding: 0;
  touch-action: pan-y;
}
body,html {
  width: 100%;
  height: 100%;
  background: #f5f5f5;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  /* color: #2c3e50; */
}
.router-view {
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
.tabbar {
  position: fixed;
  bottom: 0;
  left: 0;
}
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
