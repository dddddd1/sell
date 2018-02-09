<template>
  <div class="goods">
      <div class="menu-wrapper" ref="menuWrapper">
        <ul>
          <li v-for="(item , index) in Goods" :key="index" class="menu-item" :class="{'current':currentIndex===index}" @click="selectMenu(index)">
            <span class="text border-1px">
              <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>
              {{item.name}}
            </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper" ref="foodsWrapper">
        <ul>
          <li v-for="item in Goods" class="food-list food-list-hook">
            <h1 class="title">{{item.name}}</h1>
            <ul>
              <li  @click="selectFood(food)" v-for="food in item.foods" class="food-item">
                <div class="icon">
                  <img :src="food.icon" alt="">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p v-show="food.description" class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="sellCount">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span> 
                  </div>
                  <div class="price">
                    <span class="price_new">￥<span class="price_new_inner">{{food.price}}</span></span><span v-show="food.oldPrice" class="price_old">￥<span class="price_old_inner">{{food.oldPrice}}</span></span>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <shopcart></shopcart>
      <food :food="selectedFood" ></food>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import BScroll from 'better-scroll'
import shopcart from '@/components/shopcart/shopcart'
import food from '@/components/food/food'

const ERR_OK= 0;
Vue.prototype.$http = axios

export default {
  props:{
    seller:{
      type: Object
    }
  },
  data () {
    return {
      Goods: {},
      listHeight:[],     
      scrollY:0,
      selectedFood:{}
    };
  },
  created(){
    axios.get('/api/goods')
      .then((response) => {
        response = response.data
        if (response.errno === ERR_OK){
          this.Goods = response.data;
          this.$nextTick(() => {
            this._initScroll();
            this._calculateHeight();
          })
        }
      })
      .catch(function (error) {
        console.log(error);
      });
      this.classMap = ['decrease','discount','special','invoice','guarantee']
  },
  methods: {
      _initScroll() {
        this.menuScroll = new BScroll(this.$refs.menuWrapper,{
          click :true
        })
      
        this.foodsScroll = new BScroll(this.$refs.foodsWrapper,{
          probeType:3
        })
        this.foodsScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y));   //然后要让左侧的内容与scrollY有一个映射   那么就会用到computed方法
        })
      },
      _calculateHeight() {   
        let foodList = this.$refs.foodsWrapper.getElementsByClassName("food-list-hook")  //选取元素
        let height = 0
        this.listHeight.push(height);
        for(let i=0; i< foodList.length; i++){
          let item = foodList[i];
          height += item.clientHeight;
          this.listHeight.push(height)
        }
      },
      selectMenu(index){
        // console.log(index)
        let foodList = this.$refs.foodsWrapper.getElementsByClassName("food-list-hook")
        let el = foodList[index]
        this.foodsScroll.scrollToElement(el,300)
      },
      selectFood(food){
        this.selectedFood = food;
        this.$refs.food.show();
      }
  },
  computed: {
    currentIndex(){
      for (let i = 0; i < this.listHeight.length; i++) {
        let height1 = this.listHeight[i];
        let height2 = this.listHeight[i + 1];
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
        return i;
        };
      }
      return 0;
    }
  },
  components:{
    shopcart,
    food
  }
}

</script>
<style lang='stylus' scoped>
@import "../../common/stylus/mixin";
.goods
  position absolute
  top 174px
  bottom 58px
  width 100%
  display flex
  overflow hidden
  .menu-wrapper
    flex 0 1 -80
    width 80px
    height 100%
    background #f3f5f7
    .menu-item
      display table
      font-size 12px
      height 54px
      width 56px
      line-height 14px
      padding 0px 12px
      &.current
        background-color #fff
        font-weight 700
        position relative
        // margin-top -1px
        z-index 10
        .text
          border-none()
      .icon
        width 12px
        height 12px
        display inline-block
        background-size:12px 12px
        background-repeat no-repeat
        margin-right 4px
        vertical-align top
        &.decrease
          bg-image('decrease_3')
        &.discount
          bg-image('discount_3')
        &.guarantee
          bg-image('guarantee_3')
        &.invoice
          bg-image('invoice_3')  
        &.special
          bg-image('special_3')  
      .text
        display table-cell
        vertical-align middle
        font-size 12px
        border-1px(rgba(7,17,27,0.1))
  .foods-wrapper
    flex 1
    .food-list
      h1
        border-left 1px solid #d9dde1
        padding-left 14px
        height 26px
        line-height 26px
        background #f3f5f7
        font-size 12px
        color rgb(147,153,159)
      ul
        .food-item
          padding 18px 0px
          overflow hidden
          display flex
          margin 0px 18px
          border-1px(rgba(7,17,27,0.1))
          .icon
            float left
            img
              width 57px
              height 57px
          .content
            float left
            margin-left 10px
            h2
              margin-top 2px
              font-size 14px
              color rgb(7,17,27)
            .desc,.extra
              font-size 10px
              color rgb(147,153,159)
              margin 8px 0px
              line-height 14px
            .extra
              .sellCount
                margin-right 12px
            .price
              .price_new
                font-size 10px
                color #f01414
                font-weight normal
                line-height 12px
                margin-right 8px
                .price_new_inner
                  font-size 14px
                  font-weight 700
              .price_old
                font-size 10px
                text-decoration:line-through;
                color rgb(147,153,159)
                .price_old_inner
                  font-size 14px
                  font-weight 700

</style>