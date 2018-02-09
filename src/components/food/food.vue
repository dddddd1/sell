<template>
  <div v-show="showFlag" class="food">

  </div>
</template>

<script>
export default {
  data () {
    return {
        showFlag:false
    };
  },
  props:{
      food:{
          type :Object
      }
  },
  methods:{
     show() {
         this.showFlag = true
         alert (1)
     } 
  }
}

</script>
<style lang='stylus' scoped>
    .food
        position fixed
        left 0px
        top 0px
        bottom 48px
        z-index 30
        width 100%
        background #fff
</style>