<template>
  <div class="all-city">
    <HomeHeader headerTitle="城市选择"/>
    <div class="all-city-search">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="city-1r2VH_0">
        <path fill-opacity=".38" d="M14.778 13.732a.739.739 0 1 1-1.056 1.036l-2.515-2.565a.864.864 0 0 1-.01-1.206 4.894 4.894 0 0 0 1.357-3.651c-.126-2.492-2.156-4.52-4.648-4.647a4.911 4.911 0 0 0-5.16 5.163c.126 2.475 2.13 4.496 4.605 4.642.451.026.896-.008 1.326-.1a.739.739 0 0 1 .308 1.446c-.56.12-1.137.164-1.72.13-3.227-.19-5.83-2.815-5.995-6.042a6.39 6.39 0 0 1 6.71-6.715c3.25.165 5.884 2.8 6.05 6.048a6.37 6.37 0 0 1-1.374 4.3l2.12 2.161z"></path>
      </svg>
      <input type="text" placeholder="输入城市名、拼音或首字母查询" class="city-seatch-input" v-model="sCitySearch" @input="citySearch">
    </div>
    <mt-index-list v-show="searchCitySuccess.length===0">
      <mt-index-section :index="key" v-for="(value,key,index) in sortgroupcity" :key="key">
        <mt-cell :title="item.name" v-for="(item,index) in value" :key="index" @click.native="selectCity(item)"></mt-cell>
      </mt-index-section>  
    </mt-index-list>
    <div class="search-suceess" v-show="searchCitySuccess.length>0">
      <ul>
        <li class="search-list" v-for="(item , index) in searchCitySuccess" :key="index" @click="selectCity(item)">
          <span>{{item.name}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import api from '../config/api.js'
import HomeHeader from '@/components/HomeHeader.vue'
import Bus from '../config/eventBus.js'
export default {
  name:'AllCity',
  components:{
    HomeHeader
  },
  data(){
    return{
      groupCityList:[],
      sCitySearch:'',
      searchCitySuccess:[],
      
    }
  },
  created(){
    this.$http.get(api.groupCity).then(res=>{    //获取全部城市
      this.groupCityList=res.data;
    })
  },
  computed:{
    //将获取的数据按照A-Z字母开头排序
    sortgroupcity(){
      let sortobj = {};
      for (let i = 65; i <= 90; i++) {
        if (this.groupCityList[String.fromCharCode(i)]) {
            sortobj[String.fromCharCode(i)] = this.groupCityList[String.fromCharCode(i)];
        }
      }
      return sortobj
    }
  },
  methods:{
    citySearch(){     //输入框输入搜索时
      let that=this;
      if(this.sCitySearch.length===0){
        that.searchCitySuccess.length=0;
      }else{
        Object.keys(this.sortgroupcity).map(function(e){    //循环所有的数据
          that.sortgroupcity[e].find(function(i){
            if(i.name.indexOf(that.sCitySearch)>-1){
              that.searchCitySuccess.push(i)
            }
          })
        })
      }
    },
    selectCity(item){   //点击列表将数据传递给上一个页面
      Bus.$emit('selectSuccess',item)
      this.$router.back(-1)
    }
  },
  beforeRouteLeave(to,from,next){
    if(to.path==='/SelectCity'){
      to.meta.keepAlive=true;
    }else{
      to.meta.keepAlive=false;
    }
    next();
  }
}
</script>


<style scoped>
  .all-city {
    
    padding-top: 0.44rem;
    padding-bottom: 0.6rem;
    
    box-sizing: border-box;
  }
  .all-city-search {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 0.44rem;
    background: #26a2ff;
    text-align: center;
  }
  .all-city-search svg {
    position: absolute;
    top:0.15rem;
    left: 0.37rem;
    width: 0.13rem;
    height: 0.13rem;
    z-index: 0;
  }
  .city-seatch-input {
    width: 3.2rem;
    min-height: 0.29rem;
    border-radius: 35px;
    height: 0.29rem;
    padding-left: 0.3rem;
    box-sizing: border-box;
    border: none;
    outline: none;
  }
  li {
    list-style: none;
  }
  .search-list {
    width: 100%;
    height: 0.49rem;
    font-size: 0.16rem;
    line-height: 0.49rem;
    padding-left: 0.18rem;
    box-sizing: border-box;
  }
  .search-list span {
    display: inline-block;
    width: 100%;
    height: 100%;
    border-bottom: 1px solid #ddd;
  }
</style>

