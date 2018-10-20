<template>
  <div class="select-city">
    <HomeHeader headerTitle="选择收获地址"></HomeHeader>
    <div class="city">
      <div class="drop-down-menu" @click="toAllCity">
        <span v-if="currentCity===''">选择城市</span>
        <span v-else>{{currentCity}}</span>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 8" class="index-2KCWC_0">
          <path fill="#333" fill-rule="evenodd" d="M5.588 6.588c.78.78 2.04.784 2.824 0l5.176-5.176c.78-.78.517-1.412-.582-1.412H.994C-.107 0-.372.628.412 1.412l5.176 5.176z"></path>
        </svg>
      </div>
      <div class="search-city">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="index-HhHdo_0">
          <path fill-opacity=".38" d="M14.778 13.732a.739.739 0 1 1-1.056 1.036l-2.515-2.565a.864.864 0 0 1-.01-1.206 4.894 4.894 0 0 0 1.357-3.651c-.126-2.492-2.156-4.52-4.648-4.647a4.911 4.911 0 0 0-5.16 5.163c.126 2.475 2.13 4.496 4.605 4.642.451.026.896-.008 1.326-.1a.739.739 0 0 1 .308 1.446c-.56.12-1.137.164-1.72.13-3.227-.19-5.83-2.815-5.995-6.042a6.39 6.39 0 0 1 6.71-6.715c3.25.165 5.884 2.8 6.05 6.048a6.37 6.37 0 0 1-1.374 4.3l2.12 2.161z"></path>
        </svg>
        <input type="text" placeholder="请输入地址" class="city-input" @input="searchAddress" v-model="addressName">
      </div>
    </div>
    <div class="address-list" v-if="addressList.length>0">
      <ul>  
        <li v-for="(item , index) in addressList" :key="index" @click="selectAddress(item)">
          <div class="address-cell">
            <p class="address-name">{{item.name}}</p>
            <p class="detail-address">{{item.address}}</p>
          </div>
        </li>
      </ul> 
    </div>
  </div>
</template>


<script>
import api from '../config/api.js'
import Bus from '../config/eventBus.js'
import HomeHeader from '@/components/HomeHeader.vue'
// import AllCity from '@/components/AllCity.vue'
export default {
  name:'SelectCity',
  components:{
    HomeHeader,
    
  },
  data(){
    return {
      currentCity:'',   //定位到的城市
      groupCityList:[],   //全部的城市数据
      addressName:'',   //v-model 数据
      cityId:'',   //城市id
      addressList:[]    //搜素出来的地址列表
    }
  },
  mounted(){
    
    this.$http.get(api.guessCity).then(res=>{    //获取当前定位到的城市
      
      this.currentCity=res.data.name;
      this.cityId=res.data.id;
    })
    
    this.$http.get(api.groupCity).then(res=>{    //获取全部城市
      
      this.groupCityList=res.data;
      
    })
   
  },
  created(){
     Bus.$on('selectSuccess',data=>{   //接收页面传递过来的参数
      this.currentCity=data.name
      this.cityId=data.id
    })
  },
  methods:{
    toAllCity(){  
      this.$router.push({path:'/AllCity'})
    },
    searchAddress(){     //搜索城市
      this.$http.get(api.searchAddress+`city_id=${this.cityId}&keyword=${this.addressName}&type=search`).then(res=>{
        this.addressList=res.data;
      })
    },
    selectAddress(item){     //点击搜索地址出来结果的列表  添加进本地存储并跳转到首页
      item.cityId=this.cityId;
      window.localStorage.setItem('store',JSON.stringify(item));
      this.addressName='';
      this.addressList.length=0;
      this.$router.push({path:'/'})
    }
  },
  beforeRouteLeave(to,from,next){
    if(to.path==='/AllCity'){
      to.meta.keepAlive=true;
    }else{
      to.meta.keepAlive=false;
    }
    next();
  }
}
</script>

<style scoped>
  .select-city {
    padding-top: 0.44rem;
    padding-bottom: 0.6rem;
    position: relative;
  }
  .current-text {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 0.4rem;
    background: #fff;
    font-size: 0.14rem;
    padding: 0.1rem 0.15rem;
    box-sizing: border-box;
  }
  .current-text span:first-child{
    color: #666;
  }
   .current-text span:last-child{
    color: #9f9f9f;
  }
  .now-city {
    border-top: 1px solid #e4e4e4;
    border-bottom: 2px solid #e4e4e4;
    padding-left: 0.05rem;
    box-sizing: border-box;
  }
  .hot-city {
    margin-top: 0.1rem;
    background: #fff;
  }
  .city-title{
    border-bottom: 1px solid #e4e4e4;
    border-top: 2px solid #e4e4e4;
    color: #666;
    text-indent: 0.15rem;
    
    font-size: 0.15rem;
    padding: 0.06rem 0;
    box-sizing: border-box;
  }
  .hot-city-list,.value-list {
    display: flex;
    flex-wrap: wrap;
    list-style: none;
  }
  .hot-city-list li,.value-list li {
    width: 25%;
    height: 0.4rem;
    text-align: center;
    line-height: 0.4rem;
    font-size: 0.14rem;
    list-style: none;
    color: #3190e8;
    border-bottom: 1px solid #e4e4e4;
    border-right: 1px solid #e4e4e4;
    box-sizing: border-box;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .hot-city-list li:nth-child(4n){
    border-right: 0;
  }
  .all-city {
    margin-top: 0.1rem;
  }
  .all-city-list {
    margin-bottom: 0.1rem;
    background: #fff;
    border-bottom: 1px solid #e4e4e4;
    list-style: none;
  }
  .value-list li {
    color: #666;
  }
  .value-list li:nth-child(4n){
    border-right: 0;
  }
  .city {
    display: flex;
    background: #fff;
    box-sizing: border-box;
  }
  .drop-down-menu {
    display: flex;
    align-items: center;
    padding-left: 0.15rem;
    box-sizing: border-box;
    font-size: 0.12rem;
  }
  .drop-down-menu span {
    width: 0.4rem;
    height: 0.14rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #333;
    text-align: center;
    margin-right: 0.05rem;
  }
  .drop-down-menu svg {
    width: 0.06rem;
    height: 0.06rem;
  }
  .search-city {
    position: relative;
    padding: 0.1rem 0.15rem;
    flex: 1;
    box-sizing: border-box;
  }
  .city-input{
    background: #f2f2f2;
    color: #999;
    border:none;
    /* padding: 0.1rem 0.15rem; */
    width: 91%;
    padding-left: 0.25rem;
    outline: none;
  }
  .city-input input {
    background: #f2f2f2;
  }
  .mint-field-core {
    background: #f2f2f2;
  }
  .search-city svg {
    position: absolute;
    top: 0.21rem;
    left: 0.22rem;
    width: 0.13rem;
    height: 0.13rem;
    /* z-index: 2; */
  }
  li {
    list-style: none;
  }
  .address-list li {
    padding: 0.11rem 0.15rem;
    color: #2a2a2a;
    display: flex;
    font-size: 0.14rem;
    background: #fff;
    border-bottom: 1px solid #F5F5F5;
  }
  .address-name {
    font-weight: 700;
    color: #333;
  }
  .detail-address{
    margin-top: 0.04rem;
    font-size: 0.12rem;
  }
</style>
