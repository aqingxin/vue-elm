<template>
  <div class="search">
    <div class="search-header">
      <mt-button icon="back" class="search-icon" @click="backHome"></mt-button>
      <div class="search-div">
        <svg data-v-fae5bece="" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
          <path data-v-fae5bece="" fill-opacity=".38" d="M14.778 13.732a.739.739 0 1 1-1.056 1.036l-2.515-2.565a.864.864 0 0 1-.01-1.206 4.894 4.894 0 0 0 1.357-3.651c-.126-2.492-2.156-4.52-4.648-4.647a4.911 4.911 0 0 0-5.16 5.163c.126 2.475 2.13 4.496 4.605 4.642.451.026.896-.008 1.326-.1a.739.739 0 0 1 .308 1.446c-.56.12-1.137.164-1.72.13-3.227-.19-5.83-2.815-5.995-6.042a6.39 6.39 0 0 1 6.71-6.715c3.25.165 5.884 2.8 6.05 6.048a6.37 6.37 0 0 1-1.374 4.3l2.12 2.161z"></path>
        </svg>
        <input type="text" class="search-form" placeholder="输入商家、商品名称" v-model="searchValue" @keydown.enter="search" @input="onSearchInput">
        <button class="submit-btn" @click="search">搜索</button>
      </div>
    </div>
    <div class="search-content">
      <section class="search-history" v-if="searchHistory.length>0&&!searchSuccess">
        <header>
          <span>历史搜索</span>
          <div class="clear-icon" @click="clearHistory">
            <svg viewBox="0 0 512 512" id="bin" width="100%" height="100%"><path d="M64 160v320c0 17.6 14.4 32 32 32h288c17.6 0 32-14.4 32-32V160H64zm96 288h-32V224h32v224zm64 0h-32V224h32v224zm64 0h-32V224h32v224zm64 0h-32V224h32v224zM424 64H320V24c0-13.2-10.8-24-24-24H184c-13.2 0-24 10.8-24 24v40H56c-13.2 0-24 10.8-24 24v40h416V88c0-13.2-10.8-24-24-24zm-136 0h-96V32.401h96V64z"></path></svg>
          </div>
        </header>
        <section class="search-history-item">
          <div v-for="(item,index) in searchHistory" :key="index" @click="addHistory(item)">{{item.name}}</div>
        </section>
      </section>
      <section class="hot-search" v-if="!searchSuccess">
        <header>热门搜索</header>
        <section class="hot-search-item">
          <div v-for="(item,index) in hotSearch" :key="index" @click="addHistory(item)">{{item.name}}</div>
        </section>
      </section>
      <section class="search-sucess" v-if="shopList.length>0&&searchSuccess">
        <ShopList :shopList="shopList" />
      </section>
      <section class="no-result" v-if="shopList.length===0&&searchSuccess">
        <div>
          <img src="data:image/png;base64,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" alt="">
          <div>
            <p>附近没有搜索结果</p>
            <p>换个关键词试试吧</p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import api from '../config/api.js'
import ShopList from '@/components/ShopList.vue'
export default {
  name:'search',
  data(){
    return {
      hotSearch:[    //热门搜索   因为API接口没有提供，所以只能以静态的形式
        {name:'咖啡'},
        {name:'奶茶'},
        {name:'鱼粉'},
        {name:'寿司'},
        {name:'热干面'},
        {name:'木桶饭'},
        {name:'星巴克'},
        {name:'酸辣粉'},
        {name:'蛋糕'},
      ],
      searchHistory:[],    //搜索历史
      searchValue:'',   //搜索框值
      location:JSON.parse(window.localStorage.getItem('store')),
      shopList:[],     //搜索出来的列表数据
      searchSuccess:false    //是否搜索成功 
    }
  },
  components:{
    ShopList,
  },
  created(){
    if(window.localStorage.getItem('history')!==null){    //获取历史搜索记录
      this.searchHistory=JSON.parse(window.localStorage.getItem('history'));
    }
  },
  methods:{
    backHome(){    //返回上一页
      this.$router.back(-1)
    },
    addHistory(item){     //点击热门搜索进行搜索
      this.searchValue=item.name;
      this.searchFor();
      this.addStorage(item);
      // this.$http.get(api.search)
    },
    addStorage(item){     //将搜索的内容写进localstorage
      let tmp=[];
      let searchStorage=window.localStorage.getItem('history');
      if(searchStorage!==null){
        if(searchStorage.indexOf(item.name)>-1){
          return;
        }
        tmp=JSON.parse(searchStorage);
        tmp.unshift(item);
        window.localStorage.setItem('history',JSON.stringify(tmp));
      }else{
        tmp.unshift(item);
        window.localStorage.setItem('history',JSON.stringify(tmp));
      }
      this.searchHistory=JSON.parse(window.localStorage.getItem('history'));
    },
    clearHistory(){    //清除历史搜索记录(localstorage)
      window.localStorage.removeItem('history');
      this.searchHistory=[];
    },
    search(){
      if(this.searchValue.replace(/(^\s*)|(\s*$)/g, "")){    //判断input框值不为空
        let tmpObj={
          name:this.searchValue
        }
        this.addStorage(tmpObj);
        this.searchFor();
      }
    },
    searchFor(){
      this.$http.get(api.search+`geohash=${this.location.latitude},${this.location.longitude}&keyword=${this.searchValue}`).then(res=>{
        // console.log(res);
        this.shopList=res.data;
        for(let i=0;i<this.shopList.length;i++){
          this.$set(this.shopList[i],'allList',this.shopList[i].activities.concat(this.shopList[i].supports));      //使用set方法创建新属性  方便vue监听及及时更新视图
          this.$set(this.shopList[i],'show',false);
          this.$set(this.shopList[i],'showItem',1);
        }
        this.searchSuccess=true;
      })
    },
    onSearchInput(){
      if(this.searchValue.length===0){
        this.searchSuccess=false;
      }
    }
  },
}
</script>

<style scoped>
  .search {
    width: 100%;
    height: 100vh;
    background: #fff;
  }
  .search-header {
    display: flex;
    align-items: center;
  }
  .search-div {
    position: relative;
    padding: 0.11rem 0.11rem 0.11rem 0;
    display: flex;
    flex-grow: 1;
    margin-left: 0.11rem;
  }
  .search-form {
    padding: 0.065rem 0.15rem 0.065rem 0.3rem;
    background: #f8f8f8;
    border: none;
    flex-grow: 1;
    color: #666;
    outline: none;
  }
  .submit-btn {
    font-size: 0.16rem;
    font-weight: 600;
    margin-left: 0.11rem;
    color: #333;
    vertical-align: middle;
    background: none;
    border: none;
    outline: none;
    /* padding-right: 0.11rem; */
  }
  .search-div svg {
    width: 0.13rem;
    height: 0.13rem;
    position: absolute;
    top: 0.185rem;
    left: 0.11rem;
  }
  .search-content header{
    font-size: 0.16rem;
    padding: 0.075rem 0.125rem;
    font-weight: 700;
    color: #666;
  }
  .hot-search {
    margin-top: 0.15rem;
  }
  .hot-search-item,.search-history-item {
    padding: 0 0.125rem 0.125rem 0.125rem;
    display: flex;
    flex-wrap: wrap;
  }
  .hot-search-item div,.search-history-item div {
    display: inline-block;
    padding: 0.075rem 0.1rem;
    font-size: 0.14rem;
    margin-top: 0.125rem;
    margin-right: 0.125rem;
    color: #666;
    background: #f7f7f7;
    border-radius: 3px;
  }
  .search-history header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .clear-icon {
    width: 0.12rem;
    height: 0.19rem;
  }
  .clear-icon svg {
    color: #cecece;
    fill:currentColor
  }
  .no-result>div{
    width: 100%;
    height: 1.18rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #fff;
  }
  .no-result>div img {
    width: 0.9rem;
    height: 0.66rem;
    flex: none;
  }
  .no-result>div>div p:nth-child(1){
    color: #666;
    font-size: 0.16rem;
    margin-bottom: 0.06rem;
  }
  .no-result>div>div p:nth-child(2){
    color: #999;
    font-size: 0.12rem;
    /* margin-bottom: 0.06rem; */
  }
</style>
