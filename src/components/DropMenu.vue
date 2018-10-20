<template>
  <div class="drop-menu">
    <div class="drop">
      <div class="classify" v-for="(navItem,index) in navList" :key="index" @click="openClassify(index+1)" >
        <span>{{navItem.name}}</span>
        <!-- <span>{{dropText}}</span> -->
        <svg data-v-a5cc4024="" viewBox="0 0 72 32" class="dropdown-icon" :class="[showClassify===index+1?'trans':'']">
          <path data-v-a5cc4024="" d="M36 32l36-32h-72z"></path>
        </svg>
      </div>
    </div>
    <section class="classify-list" :class="[showClassify===1?'open':'']">
      <div>
        <ul>
          <li :class="[activeIndex===AIndex?'active':'']" v-for="(listItem,AIndex) in dropList" :key="AIndex" @click="selectClassify(AIndex)">
            <span>{{listItem.name}}</span>
            <span>{{listItem.count}}</span>
          </li>
        </ul>
        <ul v-if="dropList[activeIndex]!==undefined">
          <li v-for="(listDetail,detailIndex) in dropList[activeIndex].sub_categories" :key="detailIndex">
            <img :src="getImage(listDetail.image_url)" alt="">
            <span>{{listDetail.name}}</span>
            <span>{{listDetail.count}}</span>
          </li>
        </ul>
      </div>
    </section>
    <section class="orderList" :class="[showClassify===2?'open':'']">
      <ul>
        <li>
          <div class="svg">
            <svg viewBox="0 0 33 32" id="default" width="100%" height="100%"><path fill="#3b87c8" d="M13.374 29.064a.94.94 0 0 1-.941-.941V6.476l-7.285 6.899a.942.942 0 0 1-1.299-1.364l8.876-8.424a.94.94 0 0 1 1.59.681v23.855a.94.94 0 0 1-.941.941zM20.904 29.355h-.008a.94.94 0 0 1-.375-.078.943.943 0 0 1-.559-.86V3.944a.94.94 0 1 1 1.882 0v22.287l7.238-6.842a.94.94 0 0 1 1.289 1.366l-8.818 8.338a.943.943 0 0 1-.649.264z"></path></svg>
          </div>
          <p>
            <span>智能排序</span>
          </p>
        </li>
        <li>
          <div class="svg">
            <svg viewBox="0 0 33 32" id="rating" width="100%" height="100%"><path fill="#eba53b" d="M27.087 31.84L16.8 25.553 6.504 31.84l2.824-11.727-9.186-7.878 12.019-.941L16.801.16l4.631 11.134 12.019.941-9.158 7.849zM16.8 23.369l7.407 4.527-2.014-8.471 6.588-5.647-8.659-.696L16.8 5.063l-3.341 8.019-8.659.696 6.588 5.647-2.014 8.471z"></path></svg>
          </div>
          <p>
            <span>评分</span>
          </p>
        </li>
        <li>
          <div class="svg">
            <svg viewBox="0 0 32 32" id="speed" width="100%" height="100%"><path fill="#37c7b7" d="M16 32c8.837 0 16-7.163 16-16S24.837 0 16 0 0 7.163 0 16s7.163 16 16 16zm0-2C8.268 30 2 23.732 2 16S8.268 2 16 2s14 6.268 14 14-6.268 14-14 14z"></path><path fill="#37c7b7" d="M15 7v11.002l5.678 4.882 1.304-1.517-5.33-4.583.348.758V6.999h-2z"></path></svg>
          </div>
          <p>
            <span>配送速度</span>
          </p>
        </li>
        <li>
          <div class="svg">
            <svg viewBox="0 0 32 32" id="distance" width="100%" height="100%"><path fill="#2a9bd3" d="M15.884 31.236l-.042.001a.888.888 0 0 1-.59-.224l-7.91-7.91a7.548 7.548 0 0 1-.498-.471 12.752 12.752 0 0 1-3.747-9.045C3.097 6.523 8.824.796 15.888.796s12.791 5.727 12.791 12.791c0 3.532-1.432 6.73-3.747 9.045-.196.196-.409.391-.613.578l-7.813 7.804a.886.886 0 0 1-.589.223l-.035-.001zm0-28.667C9.818 2.59 4.908 7.513 4.908 13.582c0 3.023 1.218 5.762 3.19 7.752l.461.435 7.316 7.316 7.2-7.2q.284-.249.551-.516a10.977 10.977 0 0 0 3.225-7.787c0-6.066-4.905-10.987-10.965-11.013z"></path> <path fill="#2a9bd3" d="M15.884 18.524a5.707 5.707 0 0 1-4.07-1.732l-.001-.001a5.76 5.76 0 1 1 4.119 1.734h-.05zm-2.817-2.942a3.982 3.982 0 1 0 0-5.626c-.726.717-1.175 1.713-1.175 2.813s.449 2.096 1.175 2.813z"></path></svg>
          </div>
          <p>
            <span>距离最近</span>
          </p>
        </li>
        <li>
          <div class="svg">
            <svg viewBox="0 0 32 32" id="price" width="100%" height="100%"><path fill="#e6b61a" d="M16 32c8.837 0 16-7.163 16-16S24.837 0 16 0 0 7.163 0 16s7.163 16 16 16zm0-2C8.268 30 2 23.732 2 16S8.268 2 16 2s14 6.268 14 14-6.268 14-14 14z"></path><path fill="#e6b61a" d="M23.14 6.06l-5.12 8.65h4.48v1.54h-5.49v2.43h5.49v1.54h-5.49v5.1h-2.02v-5.1H9.53v-1.54h5.46v-2.43H9.53v-1.54h4.45L8.8 6.06h2.24l4.99 8.48 4.93-8.48h2.18z"></path></svg>
          </div>
          <p>
            <span>起送价</span>
          </p>
        </li>
      </ul>
    </section>
    <section class="screen">
      <section>
        <header>
          配送方式
        </header>
      </section>
    </section>
    <div class="mask" :class="[showClassify===1||showClassify===2||showClassify===3?'':'hideMask']" @click="hide"></div>
  </div>
</template>


<script>
import api from '../config/api.js'
export default {
  name:'DropMenu',
  data(){
    return{
      showClassify:0,
      dropList:[],
      activeIndex:0,
      imgUrl:'https://fuss10.elemecdn.com/7/54/',
      dropText:this.$route.query.title,
      navList:[
        {name:'分类'},
        {name:'排序'},
        {name:'筛选'}
      ],
      orderList:[
        {name:'智能排序',id:4},
        {name:'评分',id:3},
        {name:'配送速度',id:2},
        {name:'距离最近',id:5},
        {name:'销量最高',id:6},
        {name:'起送价',id:1},
      ]
    }
  },
  mounted(){
    this.$http.get(api.allCategory).then(res=>{
      this.dropList=res.data;
    })
  },
  methods:{
    openClassify(index){
      if(index===this.showClassify){
        this.showClassify=0;
      }else{
        this.showClassify=index;
      }
    },
    selectClassify(index){
      this.activeIndex=index;
    },
    getImage(path){   
      let suffix;
      if (path.indexOf('jpeg') !== -1) {
				suffix = '.jpeg'
			} else {
				suffix = '.png'
			}
			let url = '/' + path.substr(0, 1) + '/' + path.substr(1, 2) + '/' + path.substr(3) + suffix;
			return 'https://fuss10.elemecdn.com' + url;
    },
    hide(){   //隐藏上面导航栏点击展开的div
      this.showClassify=0;
    }
  },
}
</script>

<style scoped>
  .drop-menu {
    width: 100%;
    position: fixed;
    top: 0.44rem;
    z-index: 5;
  }
  .drop{
    position: relative;
    display: flex;
    width: 100%;
    height: 0.39rem;
    background: #fff;
    border-bottom: 1px solid #ddd;
    box-sizing: border-box;
    z-index: 5;
  }
  .drop-menu>div>div {
    flex: 1;
    text-align: center;
    color: #666;
    position: relative;
    font-size: 0.12rem;
    white-space: nowrap;
    text-overflow: ellipsis;
    line-height: 0.39rem;
  }
  .dropdown-icon {
    width: 0.06rem;
    height: 0.03rem;
    fill: #333;
    will-change: transform;
    margin-left: 0.05rem;
    margin-bottom: 0.02rem;
    transition: transform 0.3s;
    transform: rotate(0deg)
  }
  .classify-list,.orderList,.screen {
    position: absolute;
    /* top: 0.79rem; */
    top: 0.39rem;
    left: 0;
    width: 100%;
    max-height: 0;
    background: #fff;
    opacity: 0;
    visibility: hidden;
    overflow: auto;
    z-index: 5;
    transition: 0.3s;
  }
  .open {
    opacity: 1;
    visibility: visible;
    max-height: 1087%;
  }
  .trans {
    transform: rotate(180deg)
  }
  .classify-list > div {
    display: flex;
  }
  .classify-list ul {
    width: 1.3rem;
    background: #fcfcfc;
  }
  .classify-list ul:nth-child(1) li {
    padding-right: 0.1rem;
  }
  .classify-list li{
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.14rem;
    list-style: none;
    height: 0.47rem;
  }
  .orderList li {
    display: flex;
    align-items: center;
    height: 0.58rem;
    list-style: none;
    font-size: 0.14rem;
  }
  .classify-list li span:nth-child(1){
    padding-left: 0.2rem;
    position: relative;
    flex: 1;
    height: 0.2rem;
  }
  .active {
    background: #fff;
    /* border */
  }
  .active span:nth-child(1)::before{
    content:'';
    position: absolute;
    top: 0;
    left: 0;
    width: 0.04rem;
    height: 0.2rem;
    background: #2395ff;
  }
  .classify-list li span:nth-child(2){
    font-size: 0.12rem;
  }
  .mask {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    background: rgba(0, 0, 0, .5);
    transition: all .3s ease-in-out;
  }
  .hideMask {
    display: none;
  }
  .classify-list ul:nth-child(2){
    flex: 1;
    background: #fff;
    padding: 0 0.15rem 0 0.21rem;
  }
  .classify-list ul:nth-child(2) li {
    justify-content: space-between;
  }
  .classify-list ul:nth-child(2) li span:nth-child(2) {
    flex: 1;
  }
  .classify-list ul:nth-child(2) img {
    width: 0.37rem;
    height: 0.37rem;
    vertical-align: middle;
    margin-right: 0.13rem;
  }
  .orderList {
    display: block;
  }
  .svg {
    width: 0.16rem;
    height: 0.16rem;
    margin: 0 0.09rem 0 0.18rem;
  }
</style>
