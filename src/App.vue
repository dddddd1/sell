<template>
  <div id="app">
    <Header :seller="seller"></Header> 
    <div class="tab border-1px">
      <div class="tab-item">
        <!-- <a v-link="{path:'/goods'}">商品</a> -->
         <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
         <router-link to="/ratings">评论</router-link>  
        </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link> 
      </div>
    </div>
     <router-view/>
  </div>
</template>

<script>
import Vue from 'vue'
import Header from './components/header/header.vue'
import axios from 'axios'
const ERR_OK= 0;
var seller = {};

// Vue.use(axios)
Vue.prototype.$http = axios

export default {
  name: 'App',
  components:{
    Header
  },
  created(){
    axios.get('/api/seller')
      .then((response) => {
        console.log(this)
        response = response.data
        console.log(response.errno);
        if (response.errno === ERR_OK){
          this.seller = response.data;
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  },
  data() {
    return {
      seller:{}
    }
  }
}
</script>
<style lang="stylus" scoped>
@import "./common/stylus/mixin.styl"
#app 
  .tab
    display flex
    width 100%
    height 40px
    line-height 40px
    border-1px  rgb(7,17,27)
    .tab-item
      flex:1
      text-align center
      & a
        display :block
        font-size 14px
        color rgb(77,85,93) 
        &.active
          color rgb(240,20,20)
</style>


