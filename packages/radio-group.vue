<template>
  <div class="one-radio-group">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'OneRadioGroup',
    props:{
      /* 
        radioGroup接收到了 value 的值需要触发当前组件的 input 事件
        跨组件传递参数可以使用 provide 和 inject 实现
      */
      value: null
    },
    provide (){
      return {
        radioGroup: this
      }
    },
    data() {
      return {
        
      }
    }
  }
</script>

<style lang="scss" scoped>
  
</style>