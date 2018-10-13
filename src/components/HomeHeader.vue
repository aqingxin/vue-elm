<template>
  <div class="home-header" >
    <mt-header fixed v-if="home">
      <div class="header-left" slot="left" v-if="home" @click="toSelectCity">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 31" class="index-okfdP_0 location-icon">
          <path fill="#FFF" fill-rule="evenodd" d="M22.116 22.601c-2.329 2.804-7.669 7.827-7.669 7.827-.799.762-2.094.763-2.897-.008 0 0-5.26-4.97-7.643-7.796C1.524 19.8 0 16.89 0 13.194 0 5.908 5.82 0 13 0s13 5.907 13 13.195c0 3.682-1.554 6.602-3.884 9.406zM18 13a5 5 0 1 0-10 0 5 5 0 0 0 10 0z"></path>
        </svg>
        <span class="location-name">{{addressText}}</span>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 8" class="index-2iXz3_0 location-select">
          <path fill="#FFF" fill-rule="evenodd" d="M5.588 6.588c.78.78 2.04.784 2.824 0l5.176-5.176c.78-.78.517-1.412-.582-1.412H.994C-.107 0-.372.628.412 1.412l5.176 5.176z"></path>
        </svg>
      </div>
    </mt-header>
    
    <mt-header fixed :title="headerTitle" v-if="headerTitle">
      <router-link :to="routeLink" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
  </div>
</template>


<script>
export default {
  name:'HomeHeader',
  data(){
    return{
      routeLink:'/',
      address:[],
      addressText:'未选择'
    }
  },
  props:{
    headerTitle:{
      type:String
    },
    home:{
      type:String
    }
  },
  mounted(){
    // console.log(this.$route.name)
    if(this.$route.name==='SelectCity'){
      this.routeLink='/';
    }else{
      this.routeLink='/SelectCity';
    }
    if(window.localStorage.getItem('store')!==null){
      this.addressText=JSON.parse(window.localStorage.getItem('store')).name;
      this.address=JSON.parse(window.localStorage.getItem('store'));
    }else{
      this.$router.push({path:'/SelectCity'})
    }
  },
  
  methods:{
    toSelectCity(){
      this.$router.push({path:'/SelectCity'})
    }
  },
  
}
</script>


<style scoped>
  
  .location-icon {
    width: 0.13rem;
    vertical-align: middle;
  }
  .location-name {
    vertical-align: middle;
    margin: 0  0.15rem 0 0.05rem;
    max-width: 80%;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .mint-header {
    height: 0.44rem;
    font-size: 0.18rem;
    padding: 0 0.15rem;
  }
  .header-left {
    width: 100%;
  }
  .location-select {
    width: 0.1rem;
    vertical-align: middle;
  }
</style>
