<template>
  <div class="shop-list">
    <div class="shopList-title" v-if="$route.path=='/'">
      推荐商家
    </div>
    <ul class="shopList" v-infinite-scroll="loadMore"  infinite-scroll-disabled="loading" infinite-scroll-distance="10">
      <li v-for="(shopItem,index) in shopList" :key="index">
        <div class="section-item-top">
          <div class="logo-container">
            <div class="logo-main">
              <img alt="shopImg" class="logo-logo_3S1eSkn_0" :src="imgUrl+shopItem.image_path">
            </div>
          </div>
          <div class="index-main">
            <section class="index-line" >
              <h3 class="index-shopname">
                <span>{{shopItem.name}}</span>
              </h3>
              <div class="index-menu">
                <span>...</span>
              </div>
            </section>
            <section class="index-line">
              <div class="rateWrap">
                <div class="rating-wrap">
                  <div class="rating-gray">
                    <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iMTAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTU0LjAxNyA4LjA3MmwtMi41NTIgMS41NjFjLS40NzYuMjkxLS43NTguMDk2LS42MjYtLjQ1NWwuNjk2LTIuOTA5LTIuMjczLTEuOTQ0Yy0uNDI0LS4zNjItLjMyNS0uNjkxLjIzOS0uNzM2bDIuOTgyLS4yMzdMNTMuNjMuNTg5Yy4yMTMtLjUxNS41NTctLjUyMy43NzQgMGwxLjE0NiAyLjc2MyAyLjk4Mi4yMzdjLjU1Ni4wNDQuNjcuMzY4LjI0LjczNmwtMi4yNzQgMS45NDQuNjk2IDIuOTFjLjEzLjU0Mi0uMTQzLjc1LS42MjYuNDU0bC0yLjU1MS0xLjU2em0tNDggMEwzLjQ2NSA5LjYzM2MtLjQ3Ni4yOTEtLjc1OC4wOTYtLjYyNi0uNDU1bC42OTYtMi45MDktMi4yNzMtMS45NDRjLS40MjQtLjM2Mi0uMzI1LS42OTEuMjM5LS43MzZsMi45ODItLjIzN0w1LjYzLjU4OWMuMjEzLS41MTUuNTU3LS41MjMuNzc0IDBMNy41NSAzLjM1MmwyLjk4Mi4yMzdjLjU1Ni4wNDQuNjcuMzY4LjI0LjczNkw4LjQ5NyA2LjI2OWwuNjk2IDIuOTFjLjEzLjU0Mi0uMTQzLjc1LS42MjYuNDU0bC0yLjU1MS0xLjU2em0xMiAwbC0yLjU1MiAxLjU2MWMtLjQ3Ni4yOTEtLjc1OC4wOTYtLjYyNi0uNDU1bC42OTYtMi45MDktMi4yNzMtMS45NDRjLS40MjQtLjM2Mi0uMzI1LS42OTEuMjM5LS43MzZsMi45ODItLjIzN0wxNy42My41ODljLjIxMy0uNTE1LjU1Ny0uNTIzLjc3NCAwbDEuMTQ2IDIuNzYzIDIuOTgyLjIzN2MuNTU2LjA0NC42Ny4zNjguMjQuNzM2bC0yLjI3NCAxLjk0NC42OTYgMi45MWMuMTMuNTQyLS4xNDMuNzUtLjYyNi40NTRsLTIuNTUxLTEuNTZ6bTEyIDBsLTIuNTUyIDEuNTYxYy0uNDc2LjI5MS0uNzU4LjA5Ni0uNjI2LS40NTVsLjY5Ni0yLjkwOS0yLjI3My0xLjk0NGMtLjQyNC0uMzYyLS4zMjUtLjY5MS4yMzktLjczNmwyLjk4Mi0uMjM3TDI5LjYzLjU4OWMuMjEzLS41MTUuNTU3LS41MjMuNzc0IDBsMS4xNDYgMi43NjMgMi45ODIuMjM3Yy41NTYuMDQ0LjY3LjM2OC4yNC43MzZsLTIuMjc0IDEuOTQ0LjY5NiAyLjkxYy4xMy41NDItLjE0My43NS0uNjI2LjQ1NGwtMi41NTEtMS41NnptMTIgMGwtMi41NTIgMS41NjFjLS40NzYuMjkxLS43NTguMDk2LS42MjYtLjQ1NWwuNjk2LTIuOTA5LTIuMjczLTEuOTQ0Yy0uNDI0LS4zNjItLjMyNS0uNjkxLjIzOS0uNzM2bDIuOTgyLS4yMzdMNDEuNjMuNTg5Yy4yMTMtLjUxNS41NTctLjUyMy43NzQgMGwxLjE0NiAyLjc2MyAyLjk4Mi4yMzdjLjU1Ni4wNDQuNjcuMzY4LjI0LjczNmwtMi4yNzQgMS45NDQuNjk2IDIuOTFjLjEzLjU0Mi0uMTQzLjc1LS42MjYuNDU0bC0yLjU1MS0xLjU2eiIgZmlsbD0iI0VFRSIgZmlsbC1ydWxlPSJldmVub2RkIi8+PC9zdmc+" alt="rating">
                  </div>
                  <div class="rating-active" :style="{width:shopItem.rating/5*100+'%'}">
                    <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iMTAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IHgxPSIwJSIgeTE9IjUwJSIgeTI9IjUwJSIgaWQ9ImEiPjxzdG9wIHN0b3AtY29sb3I9IiNGRkRFMDAiIG9mZnNldD0iMCUiLz48c3RvcCBzdG9wLWNvbG9yPSIjRkZCMDAwIiBvZmZzZXQ9IjEwMCUiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cGF0aCBkPSJNNTQuMDE3IDguMDcybC0yLjU1MiAxLjU2MWMtLjQ3Ni4yOTEtLjc1OC4wOTYtLjYyNi0uNDU1bC42OTYtMi45MDktMi4yNzMtMS45NDRjLS40MjQtLjM2Mi0uMzI1LS42OTEuMjM5LS43MzZsMi45ODItLjIzN0w1My42My41ODljLjIxMy0uNTE1LjU1Ny0uNTIzLjc3NCAwbDEuMTQ2IDIuNzYzIDIuOTgyLjIzN2MuNTU2LjA0NC42Ny4zNjguMjQuNzM2bC0yLjI3NCAxLjk0NC42OTYgMi45MWMuMTMuNTQyLS4xNDMuNzUtLjYyNi40NTRsLTIuNTUxLTEuNTZ6bS00OCAwTDMuNDY1IDkuNjMzYy0uNDc2LjI5MS0uNzU4LjA5Ni0uNjI2LS40NTVsLjY5Ni0yLjkwOS0yLjI3My0xLjk0NGMtLjQyNC0uMzYyLS4zMjUtLjY5MS4yMzktLjczNmwyLjk4Mi0uMjM3TDUuNjMuNTg5Yy4yMTMtLjUxNS41NTctLjUyMy43NzQgMEw3LjU1IDMuMzUybDIuOTgyLjIzN2MuNTU2LjA0NC42Ny4zNjguMjQuNzM2TDguNDk3IDYuMjY5bC42OTYgMi45MWMuMTMuNTQyLS4xNDMuNzUtLjYyNi40NTRsLTIuNTUxLTEuNTZ6bTEyIDBsLTIuNTUyIDEuNTYxYy0uNDc2LjI5MS0uNzU4LjA5Ni0uNjI2LS40NTVsLjY5Ni0yLjkwOS0yLjI3My0xLjk0NGMtLjQyNC0uMzYyLS4zMjUtLjY5MS4yMzktLjczNmwyLjk4Mi0uMjM3TDE3LjYzLjU4OWMuMjEzLS41MTUuNTU3LS41MjMuNzc0IDBsMS4xNDYgMi43NjMgMi45ODIuMjM3Yy41NTYuMDQ0LjY3LjM2OC4yNC43MzZsLTIuMjc0IDEuOTQ0LjY5NiAyLjkxYy4xMy41NDItLjE0My43NS0uNjI2LjQ1NGwtMi41NTEtMS41NnptMTIgMGwtMi41NTIgMS41NjFjLS40NzYuMjkxLS43NTguMDk2LS42MjYtLjQ1NWwuNjk2LTIuOTA5LTIuMjczLTEuOTQ0Yy0uNDI0LS4zNjItLjMyNS0uNjkxLjIzOS0uNzM2bDIuOTgyLS4yMzdMMjkuNjMuNTg5Yy4yMTMtLjUxNS41NTctLjUyMy43NzQgMGwxLjE0NiAyLjc2MyAyLjk4Mi4yMzdjLjU1Ni4wNDQuNjcuMzY4LjI0LjczNmwtMi4yNzQgMS45NDQuNjk2IDIuOTFjLjEzLjU0Mi0uMTQzLjc1LS42MjYuNDU0bC0yLjU1MS0xLjU2em0xMiAwbC0yLjU1MiAxLjU2MWMtLjQ3Ni4yOTEtLjc1OC4wOTYtLjYyNi0uNDU1bC42OTYtMi45MDktMi4yNzMtMS45NDRjLS40MjQtLjM2Mi0uMzI1LS42OTEuMjM5LS43MzZsMi45ODItLjIzN0w0MS42My41ODljLjIxMy0uNTE1LjU1Ny0uNTIzLjc3NCAwbDEuMTQ2IDIuNzYzIDIuOTgyLjIzN2MuNTU2LjA0NC42Ny4zNjguMjQuNzM2bC0yLjI3NCAxLjk0NC42OTYgMi45MWMuMTMuNTQyLS4xNDMuNzUtLjYyNi40NTRsLTIuNTUxLTEuNTZ6IiBmaWxsPSJ1cmwoI2EpIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz48L3N2Zz4=" alt="rating">
                  </div>
                </div>
                <span class="rating-text">{{shopItem.rating}}</span>
                <span>月售{{shopItem.recent_order_num}}单</span>
              </div>
            </section>
            <section class="index-line">
              <div class="index-moneylimit">
                <span>￥{{shopItem.float_minimum_order_amount}}起送</span>
                <span v-if="shopItem.float_delivery_fee>0">配送费￥{{shopItem.float_delivery_fee}}</span>
                <span v-else>免配送费</span>
              </div>
              <div class="index-timed">
                <span>{{shopItem.distance}}</span>
                <span>{{shopItem.order_lead_time}}</span>
              </div>
            </section>
          </div>
        </div>
        <div class="section-item-bottom">
          <!-- <section class="index-taget">
            <span>包子粥店</span>
          </section> -->
          <span class="line-span">
            <img class="index-dashed" src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjgwIiBoZWlnaHQ9IjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTAgLjI1TDI4MCAwIiBzdHJva2U9IiNDQ0MiIHN0cm9rZS13aWR0aD0iLjUiIGZpbGw9Im5vbmUiIHN0cm9rZS1kYXNoYXJyYXk9IjEiLz48L3N2Zz4=" alt="line">
          </span>
          <section class="index-activities">
            <div class="index-activitiesList">
              <div class="index-actRow" v-for="(iconItem,IconIndex) in shopItem.allList" :key="IconIndex" :class="[IconIndex>shopItem.showItem?'hideItem':'']" :data-index=IconIndex>
                <span class="index-iconWrap" :style="{background:'#'+iconItem.icon_color}">{{iconItem.icon_name}}</span>
                <span class="index-desc">{{iconItem.name}}</span>
              </div>
            </div>
            <div class="index-activitiesBtn" @click="onShowItem(index)" >
              <span>{{shopItem.activities.length+shopItem.supports.length}}个活动</span>
              <img class="activitiesBtnImg" :class="[shopItem.show?'imgRotate':'']" src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iNiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBmaWxsPSIjOTk5IiBkPSJNNC41NzcgNS40MjNjLjc5Ljc3IDIuMDczLjc2NyAyLjg1NyAwbDQuMTItNC4wMjZDMTIuMzQ1LjYyNSAxMi4wOSAwIDEwLjk4NSAwSDEuMDI3Qy0uMDc3IDAtLjMzLjYzLjQ1NyAxLjM5N2w0LjEyIDQuMDI2eiIgZmlsbC1ydWxlPSJldmVub2RkIi8+PC9zdmc+" alt="btn">
            </div>
          </section>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import api from '../config/api.js'
export default {
  name:'shopList',
  data(){
    return {
      location:JSON.parse(window.localStorage.getItem('store')),
      // shopList:[],
      imgUrl:'https://elm.cangdu.org/img/',
      offsetNum:0
    }
  },
  props:{
    shopList:{
      type:Array
    }
  },
  created(){
    // this.$http.get(api.shoppingList+`latitude=${this.location.latitude}&longitude=${this.location.longitude}`).then(res=>{   //获取首页的推荐商家  本应是根据定位获取，但是该API只是模拟数据，所以无论是定位到哪里，都是这些商家
    //   // console.log(res.data)
    //   this.shopList=res.data;
    //   for(let i=0;i<this.shopList.length;i++){
    //     this.$set(this.shopList[i],'allList',this.shopList[i].activities.concat(this.shopList[i].supports));      //使用set方法创建新属性  方便vue监听及及时更新视图
    //     this.$set(this.shopList[i],'show',false);
    //     this.$set(this.shopList[i],'showItem',1);
    //   }
    // })
  },
  methods:{
    onShowItem(index){      //点击展开商家列表的活动
      let tmp=this.shopList[index].show;  
      this.$set(this.shopList[index],'show',!tmp);
      if(this.shopList[index].show===true){
        this.$set(this.shopList[index],'showItem',this.shopList[index].allList.length-1)
      }else{
        this.$set(this.shopList[index],'showItem',1)
      }
    },
    loadMore(){
      this.$emit('loadMore',true)
    }
  }
}
</script>


<style scoped>
  /* .shop-list { */
    /* padding-bottom: 0.6rem; */
  /* } */
  .shopList-title {
    display: flex;
    box-pack: center;
    align-items: center;
    justify-content: center;
    height: 0.36rem;
    font-size: 0.14rem;
    color: #000;
    background: #fff;
  }
  .shopList-title::before,.shopList-title::after{
    display: block;
    content: "";
    width: 0.195rem;
    height: 0.01rem;
    background: #999;
  }
  .shopList-title::before {
    margin-right: 0.13rem;
  }
  .shopList-title::after {    
    margin-left: 0.13rem;
  }
  .shopList{
    background: #fff;
  }
  .shopList>li {
    position: relative;
    border-bottom: 1px solid #eee;
    background: #fff;
    color: #666;
    padding: 0.15rem 0;
    list-style: none;
    line-height: normal;
    list-style: none;
  }
  .section-item-top {
    display: flex;
    box-pack: start;
    justify-content: flex-start;
    box-align: stretch;
    align-items: stretch;
    padding: 0 0.1rem;
  }
  .logo-container {
    position: relative;
    flex: none;
  }
  .index-main {
    display: flex;
    justify-content: space-between;
    box-pack: justify;
    padding-left: 0.1rem;
    overflow: hidden;
    flex-direction: column;
    flex-grow: 1;
    box-flex: 1;
  }
  .logo-main {
    position: relative;
    width: 0.65rem;
    height: 0.65rem;
  }
  .logo-main img {
    display: block;
    width: 100%;
    height: 100%;
    max-width: 100%;
    box-sizing: border-box;
    border: 1px solid rgba(0, 0, 0, .08);
  }
  .index-line {
    display: flex;
    justify-content: space-between;
    box-pack: center;
    overflow: hidden;
    align-items: center;
    box-align: center;
  }
  .index-shopname {
    display: flex;
    margin: 0;
    padding: 0;
    color: #333;
    font-weight: 700;
    font-size: 0.14rem;
    overflow: hidden;
  }
  .index-shopname span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .rateWrap {
    display: flex;
    align-items: center;
    box-align: center;
    font-size: 0.12rem;
  }
  .index-menu {
    display: flex;
    align-items: center;
    box-align: center;
    margin-left: 0.3rem;
  }
  .index-menu span {
    padding: 0 0.05rem;
    margin-left: 0.3rem;
    font-size: 0.14rem;
    font-weight: 700;
  }
  .rating-wrap {
    margin-right: 0.12rem;
    position: relative;
    overflow: hidden;
    display: inline-block;
    vertical-align: middle;
  }
  .rating-gray,.rating-active {
    display: flex;
  }
  .rating-gray img {
    flex: none;
    max-width: none;
    box-flex: 0;
  }
  .rating-active {
    position: absolute;
    top: 0;
    left: 0;
    overflow: hidden;
  }
  .rating-text {
    margin-right: 0.12rem;
  }
  .index-moneylimit,.index-timed {
    display: flex;
    align-content: center;
    font-size: 0.12rem;
  }
  .index-timed {
    color: #999;
  }
  .index-timed span,.index-moneylimit span {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    max-width: 100%;
  }
  .index-moneylimit span:nth-child(2)::before {
    content: "|";
    margin: 0 0.045rem;
  }
  /* .index-timed span:first-child {
    margin-top: 0.022rem;
  } */
  .index-timed span:first-child::after {
    content: "|";
    margin: 0 0.045rem;
  }
  .index-timed span:nth-child(2){
    vertical-align: middle;
  }
  .section-item-bottom {
    padding-left: 0.85rem;
  }
  .index-taget {
    display: flex;
    flex-wrap: wrap;
    box-align: center;
    align-items: center;
    margin: 0.05rem 0.05rem 0 0;
    font-size: 0.12rem;
  }
  .index-taget span {
    margin-bottom: 0.04rem;
    margin-right: 0.5rem;
    white-space: nowrap;
    color: rgb(102, 102, 102);
    /* border: 1px solid #ddd;
    padding: 0 0.008rem; */
  }
  .line-span {
    width: 100%;
    height: 0.135rem;
    display: block;
  }
  .index-dashed{
    width: 100%;
    height: 1px;
    padding-right: 0.1rem;
    box-sizing: border-box;
  }
  .index-activities {
    display: flex;
    position: relative;
    box-pack: justify;
    justify-content: space-between;
    align-content: stretch;
    overflow: hidden;
  }
  .index-activitiesList {
    flex: 1;
    overflow: hidden;
    padding-right: 0.2rem;
  }
  .index-actRow {
    display: flex;
    box-align: center;
    align-items: center;
    font-size: 0.12rem;
    line-height: 0.18rem;
  }
  .index-iconWrap{
    display: inline-block;
    position: relative;
    margin-right: 0.06rem;
    width: 0.14rem;
    height: 0.14rem;
    vertical-align: middle;
    font-size: 0.12rem;
    text-align: center;
    line-height: 0.14rem;
    color: #fff;
  }
  .index-desc {
    display: inline-block;
    box-flex: 1;
    flex: 1;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    vertical-align: middle;
  }
  .index-activitiesBtn {
    padding: 0.03rem 0.1rem;
    color: #999;
    text-align: center;
    font-size: 0.12rem;
    line-height: 1;
  }
  .index-activitiesBtn span {
    vertical-align: middle;
  }
  .activitiesBtnImg {
    width: 0.065rem;
    height: 0.035rem;
    opacity: .9;
    margin-left: 0.04rem;
    transition: all .3s ease-in-out;
    transform: rotate(0deg);
    fill: currentColor;
    will-change: transform;
    vertical-align: middle;
    position: relative;
    z-index: 1;
  }
  .imgRotate {
    transform: rotate(180deg);
  }
  .index-actRow:not(:first-child) {
    margin-top: 0.025rem;
  }
  .hideItem {
    display: none;
  }
</style>
