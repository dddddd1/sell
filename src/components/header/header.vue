<template>
  <div class="header">
      <div class="content-wrapper">
        <div class="avator">
            <img :src="seller.avatar" alt="">
        </div>
      </div>
      <div class="bulletin-wrapper">

      </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    };
  },
  props:{
    seller: {
      type: Object
    }
  }
}

</script>
<style lang='stylus' scoped>
</style>