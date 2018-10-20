import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import SelectCity from './views/SelectCity.vue'
import AllCity from './views/AllCity.vue'
// import App from './App.vue'
import Search from './views/Search.vue'
import Index from './views/Index.vue'
import ClassifyDetail from './views/ClassifyDetail.vue'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      meta:{
        index:0
      },
      children:[
        {
          path: '/',
          name: 'Home',
          component: Home,
          meta:{
            index:0
          },
        },
        {
          path: '/SelectCity',
          name: 'SelectCity',
          component: SelectCity,
          meta:{
            keepAlive:true,
            index:1
          }
        },
        {
          path:'/AllCity',
          name:'AllCity',
          component: AllCity,
          meta:{
            keepAlive:true,
            index:1
          }
        },
      ]
    },
    {
      path:'/Search',
      name:'Search',
      component: Search,
      meta:{
        index:1
      }
    },
    {
      path:'/ClassifyDetail',
      name:'ClassifyDetail',
      component: ClassifyDetail,
      meta:{
        index:1
      }
    }
  ]
})
