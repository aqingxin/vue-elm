<template>
  <div class="classify-detail">
    <HomeHeader class="head" :headerTitle="headerTitle" />
    <DropMenu />
    <ShopList class="shoplist" :shopList="shopList" />
  </div>
</template>


<script>
import HomeHeader from '@/components/HomeHeader.vue'
import api from '../config/api.js'
import ShopList from '@/components/ShopList.vue'
import DropMenu from '@/components/DropMenu.vue'
export default {
  name:'ClassifyDetail',
  components:{
    HomeHeader,
    ShopList,
    DropMenu
  },
  data(){
    return{
      headerTitle:this.$route.query.title,
      dataList:[],
      location:'',
      shopList:[],
    }
  },
  created(){
    if(window.localStorage.getItem('store')!==null){
      this.location=JSON.parse(window.localStorage.getItem('store'))
    }
    this.onGetData();
  },
  methods:{
    onGetData(){
     this.$http.get(api.shoppingList+`latitude=${this.location.latitude}&longitude=${this.location.longitude}&offset=${this.offsetNum}`).then(res=>{
        this.shopList=this.shopList.concat(res.data);
        for(let i=0;i<this.shopList.length;i++){
          this.$set(this.shopList[i],'allList',this.shopList[i].activities.concat(this.shopList[i].supports));      //使用set方法创建新属性  方便vue监听及及时更新视图
          this.$set(this.shopList[i],'show',false);
          this.$set(this.shopList[i],'showItem',1);
        }
     })
    }
  }
}
</script>


<style scoped>
  .classify-detail {
    padding-top: 0.44rem;
  }
  .head {
    z-index: 5;
  }
  .shoplist {
    margin-top: 0.4rem;
  }
</style>
