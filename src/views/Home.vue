<template>
  <div class="home">
    <HomeHeader home="true"/>
    <div class="search-wapper">
      <div class="search">
        <router-link class="content" to='/Search'>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
            <path fill-opacity=".38" d="M14.778 13.732a.739.739 0 1 1-1.056 1.036l-2.515-2.565a.864.864 0 0 1-.01-1.206 4.894 4.894 0 0 0 1.357-3.651c-.126-2.492-2.156-4.52-4.648-4.647a4.911 4.911 0 0 0-5.16 5.163c.126 2.475 2.13 4.496 4.605 4.642.451.026.896-.008 1.326-.1a.739.739 0 0 1 .308 1.446c-.56.12-1.137.164-1.72.13-3.227-.19-5.83-2.815-5.995-6.042a6.39 6.39 0 0 1 6.71-6.715c3.25.165 5.884 2.8 6.05 6.048a6.37 6.37 0 0 1-1.374 4.3l2.12 2.161z"></path>
          </svg>
          <span>搜索饿了么商家、商品名称</span>
        </router-link>
      </div>
    </div>
    <div class="swiper">
      <mt-swipe :auto="0">
        <mt-swipe-item v-for="(value,itemIndex) in foodClassifyList" :key="itemIndex">
          <router-link to='/' v-for="(item,index) in value" :key="index">
            <div class="container">
              <img :src="imgUrl+item.image_url" alt="foodClaasify_img">
            </div>
            <span class="title">{{item.title}}</span>
          </router-link>
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <ShopList :shopList="shopList" @loadMore='loadMore'/>
    <loadMore v-if="loadMoreShow" />
  </div>
</template>

<script>
import HomeHeader from '@/components/HomeHeader.vue'
import ShopList from '@/components/ShopList.vue'
import loadMore from '@/components/loadMore.vue'
import api from '../config/api.js'
export default {
  name: 'home',
  components: {
    HomeHeader,
    ShopList,
    loadMore
  },
  data(){
    return {
      foodClassifyList:[],
      imgUrl:'https://fuss10.elemecdn.com',
      shopList:[],
      location:'',
      offsetNum:0,
      loadMoreShow:false
    }
  },
  mounted(){
    if(window.localStorage.getItem('store')!==null){
      this.location=JSON.parse(window.localStorage.getItem('store'))
    }
  },
  created(){
    this.getFoodClassify();
    this.getShopList();
  },
  methods:{
    getFoodClassify(){
      this.$http.get(api.foodClassify).then(res=>{    //获取食物分类
        let resLength=res.data.length;
        let resArr=[...res.data];
        let foodArr=[];
        for(let i=0,j=0;i<resLength; i+=10,j++){
          foodArr[j]=resArr.splice(0,10);
        }
        this.foodClassifyList=foodArr;
      })
    },
    getShopList(){
      this.$http.get(api.shoppingList+`latitude=${this.location.latitude}&longitude=${this.location.longitude}&offset=${this.offsetNum}`).then(res=>{   //获取首页的推荐商家  本应是根据定位获取，但是该API只是模拟数据，所以无论是定位到哪里，都是这些商家
        // console.log(res.data)
        
        this.shopList=this.shopList.concat(res.data);
        for(let i=0;i<this.shopList.length;i++){
          this.$set(this.shopList[i],'allList',this.shopList[i].activities.concat(this.shopList[i].supports));      //使用set方法创建新属性  方便vue监听及及时更新视图
          this.$set(this.shopList[i],'show',false);
          this.$set(this.shopList[i],'showItem',1);
        }
        this.loadMoreShow=false;
      })
    },
    loadMore(data){
      // console.log(data);
      this.loadMoreShow=true;
      this.offsetNum+=20;
      this.getShopList();
    }
  },
  
}
</script>


<style scoped>
  .home {
    padding-top: 0.44rem;
    padding-bottom: 0.6rem;
  }
  .search-wapper {
    position: sticky;
    top: 0;
    z-index: 999;
    background: #26A2FF;
  }
  .search {
    padding: 0.075rem 0.14rem;
  }
  .content {
    display: flex;
    box-pack: center;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 0.36rem;
    background: #fff;
    color: #999;
    font-size: 0.14rem;
    text-decoration: none;
  }
  .content svg {
    width: 0.16rem;
    height: 0.16rem;
    margin-right: 0.05rem;
  }
  .content span {
    font-family: simsun;
  }
  .swiper {
    position: relative;
    /* width: 100%; */
    height: 1.77rem;
    background: #fff;
    text-align: center;
    overflow: hidden;
  }
  .swiper a {
    position: relative;
    float: left;
    width: 20%;
    margin-top: 0.11rem;
    text-decoration: none;
    max-height: 0.635rem;
  }
  .swiper .container {
    position: relative;
    /* display: inline-block; */
    margin: 0 auto;
    width: 0.45rem;
    height: 0.45rem;
  }
  .swiper .container img {
    width: 100%;
    height: 100%;
    max-width: 100%;
    vertical-align: top;
  }
  .swiper .title {
    display: block;
    margin-top: 0.05rem;
    color: #666;
    font-size: 0.12rem;
  }
  li {
    list-style: none;
  }
</style>
