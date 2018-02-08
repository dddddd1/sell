<template>
  <div class="header">
      <div class="content-wrapper">
        <div class="avator">
            <img :src="seller.avatar" alt="">
        </div>
        <div class="content">
            <div class="title">
                <div class="brand"></div>
                <div class="name">{{seller.name}}</div>
            </div>
            <div class="description">
                {{seller.description}}/{{seller.deliveryTime}}分钟送达
              </div>
              <div v-if="seller.supports" class="supports">
                  <span class="icon" :class="classMap[seller.supports[0].type]"></span>
                  <span class="text">{{seller.supports[0].description}}</span>
              </div>
        </div>
        <div v-if="seller.supports" class="support-count" @click="Showdetail()">
          <span class="count">{{seller.supports.length}}个</span>  
          <i class="icon-keyboard_arrow_right"></i>
        </div> 
      </div>
      <div class="bulletin-wrapper" @click="Showdetail()">
        <span class="bulletin-title"></span>
        <span class="bulletin-text">{{seller.bulletin}}</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
      <div class="background">
        <img :src="seller.avatar" alt="">
      </div>
      <transition name="fade">
        <div v-show="detailShow" class="detail">
          <div class="detail-wrapper clearfix">
            <div class="detail-main">
              <h1 class="detail-name">{{seller.name}}</h1>
              <div class="star-wrapper">
                <star :size="48" :score="seller.score"></star>
              </div>
              <div class="title">
                <div class="line"></div>
                <div class="text">优惠信息</div>
                <div class="line"></div>
              </div>
              <ul v-if="seller.supports" class="supports">
                <li class="support-item" v-for="(item, index) in seller.supports">
                  <span class="icon" :class="classMap[seller.supports[index].type]"></span>
                  <span class="text">{{seller.supports[index].description}}</span>
                </li>
              </ul>
              <div class="title">
                <div class="line"></div>
                <div class="text">商家公告</div>
                <div class="line"></div>
              </div>
              <div class="bulletin">{{seller.bulletin}}</div>
                  
              
            </div>
          </div>
          <div class="detail-close">
            <i class="icon-close" @click="Hidedetail()"></i>
          </div>
          <div class="detail-bg"></div>
        </div>
      </transition>
  </div>
</template>

<script>
import star from '@/components/star/star.vue'; 
export default {
  data () {
    return {
      detailShow:false
    };
  },
  props:{
    seller: {
      type: Object
    }
  },
  created(){
    this.classMap = ['decrease','discount','special','invoice','guarantee']
  },
  methods:{
    Showdetail(){
      this.detailShow=true
    },
    Hidedetail(){
      this.detailShow=false
    }
  },
  components:{
    star
  }
}

</script>
<style lang='stylus' scoped>
@import "../../common/stylus/mixin";
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  background rgba(7,17,27,0)
}
.header
  color #fff
  position relative
  background-color :rgba(7,17,27,0.5)
  overflow hidden
  .content-wrapper
    display flex
    position relative
    overflow hidden
    padding 24px 12px 18px 24px
    font-size 0px
    .avator
        display inline-block
        float left 
        img
          width 64px
          height 64px
          border-radius:2px
    .content
        float left
        display inline-block
        font-size 14px
        margin-left 16px
        .title
          display flex
          margin 2px 0px 8px 0px
          .brand  
            width 30px
            height 18px
            display inline-block
            bg-image('brand')
            background-size:30px 18px
            background-repeat no-repeat
            vertical-align top
          .name
            display inline-block
            font-size 16px
            color rgb(255,255,255)
            font-weight:bold
            line-height 18px
            margin-left 6px
        .description
          font-size 12px
          line-height 12px
          margin-bottom 10px
        .supports
          font-size 0px
          .icon
            width 12px
            height 12px
            display inline-block
            background-size:12px 12px
            background-repeat no-repeat
            margin-right 4px
            vertical-align top
            &.decrease
              bg-image('decrease_1')
            &.discount
              bg-image('discount_1')
            &.guarantee
              bg-image('guarantee_1')
            &.invoice
              bg-image('invoice_1')  
            &.special
              bg-image('special_1')  
          .text
            display inline-block
            font-size 12px
            line-height 12px
    .support-count
      position absolute
      width 42px
      height 24px
      right 12px
      bottom 14px
      padding 0px 8px
      border-radius 14px
      line-height 24px
      background-color :rgba(0,0,0,0.2)
      color #fff
      text-align center
      .count
        vertical-align top
        font-size 12px
        margin-left 4px
      .icon-keyboard_arrow_right
        font-size 12px
        margin-left 2px
        line-height 24px
  .bulletin-wrapper
    height 28px
    line-height 28px
    background-color rgba(7,17,27,0.2)   
    white-space: nowrap;
    overflow hidden
    text-overflow:ellipsis;
    position relative
    padding:0px 12px 0px 8px
    .bulletin-title
      bg-image(bulletin)
      width 22px
      height 12px
      display inline-block
      background-size 22px 12px
      vertical-align top
      background-repeat no-repeat
      margin-top 8px
      float left
    .bulletin-text
      padding-left: 4px;
      vertical-align: top;
      font-size: 10px;
      // display: inline-block;
      line-height: 30px;
    .icon-keyboard_arrow_right
      font-size 12px
      line-height 28px
      display inline-block
      position absolute
      top 0px
      right 0px
      padding-right 2px
  .background
    img
      position absolute
      top 0px
      left 0px
      width 100%
      height 100%
      z-index -1
      filter :blur(10px)
  .detail
    position fixed
    z-index 100
    width 100%
    height 100% 
    top 0px
    left 0px
    overflow auto
    background-color :rgba(7,17,27,0.8)
    backdrop-filter blur(10px)   //ios有效果  渐进增强
    .detail-wrapper
      min-height 100%
      width 100%
      .detail-main
        padding 0px 36px
        margin-top 64px
        padding-bottom 64px
        .detail-name
          font-size 16px
          font-weight 700
          line-height 32px
          text-align center
        .star-wrapper
          text-align center
          margin-top 18px
          padding 2px 0px
        .title
          display flex
          width 80%
          margin 28px auto 24px auto 
          .line
            flex 1
            position relative
            top -6px
            border-bottom 1px solid rgba(255,255,255,0.2)
          .text
            padding:0px 12px
            font-weight 700
            font-size:14px
        .supports
          margin-top 24px
          .support-item
            margin-bottom 12px
            font-size 0px
            .icon
              background-size 16px 16px 
              width 16px
              height 16px
              display inline-block
              &.decrease
                bg-image('decrease_2')
              &.discount
                bg-image('discount_2')
              &.guarantee
                bg-image('guarantee_2')
              &.invoice
                bg-image('invoice_2')  
              &.special
                bg-image('special_2')  
            .text
              font-size: 12px;
              vertical-align: top;
              display: inline-block;
              height: 16px;
              line-height: 16px;
              padding-left: 8px;
            &:last-child
              margin-bottom 28px
        .bulletin
          font-size 12px
          line-height 24px
    .detail-close
      position relative
      width 32px
      height 32px
      margin: -48px auto
      clear both
      font-size 32px
      .icon-close
        width 32px
        height 32px
    .detail-bg
      // background-color rgba(7,17,27,0.8)
      filter blur(10px)
      position fixed
      top 0px
      width 100%
      height 100%
      z-index -1
</style>