import Vue from 'vue'
import Router from 'vue-router'

import header from '@/components/header/header'
import goods from '@/components/goods/goods'
import ratings from '@/components/ratings/ratings'
import seller from '@/components/seller/seller'
import star from '@/components/star/star'
Vue.use(Router)

export default new Router({
  routes: [
    //地址为空时跳转(重定向)goods页面
    {
      path: '',   
      redirect: '/goods'
    },
    //头部公共
    {
      path: '/header',
      component: header
    },
    //商品页面
    {
      path: '/goods',
      component: goods
    },
    //评价页面
    {
      path: '/ratings',
      component: ratings
    },
    //商家页面
    {
      path: '/seller',
      component: seller
    },
    //star页面
    {
      path: '/star',
      component: star
    }
  ],
  linkExactActiveClass:'active'
})



