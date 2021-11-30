<template>
  <!-- 
参数支持：
参数名	参数描述	参数类型	默认值
v-model	双向绑定	布尔类型	false
name	name属性	string	text
activeColor	自定义的激活颜色	string	#1ec63b
inactiveColor	自定义的不激活颜色	string	#dd001b

事件支持：
事件名称	事件描述
change	change时触发的事件
 -->
  <div class="one-switch" :class="{ 'is-checked': value }" @click="handleClick">
    <span class="one-switch_core" ref="core">
      <span class="one-switch_button"></span>
    </span>
    <!-- 通过input框保存表单元素的name属性 -->
    <input type="checkbox" :name='name' ref='input' class="one-switch-input">
  </div>
</template>

<script>
export default {
  name: "OneSwitch",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    activeColor: {
      type: String,
      default: "",
    },
    inactiveColor: {
      type: String,
      default: "",
    },
    name:{
      type: String,
      default: ''
    }
  },
  data() {
    return {};
  },
  methods: {
    async handleClick() {
      this.$emit("input", !this.value);
      /* 
        点击的时候，修改传入的背景色
        通过 $nextTick()，数据修改后，并且DOM更新，再修改按钮的颜色
        nextTick() 会返回一个 promise的实例，所以可以使用 async await 语法
      */
      /* this.$nextTick().then(() => {
       this.changeColor()
     }) */
      await this.$nextTick();
      this.changeColor();
      this.$refs.input.checked = this.value;
    },
    changeColor() {
      if (this.activeColor || this.inactiveColor) {
        let color = this.value ? this.activeColor : this.inactiveColor;
        this.$refs.core.style.borderColor = color;
        this.$refs.core.style.backgroundColor = color;
      }
    },
  },
  mounted() {
    this.changeColor();
    this.$refs.input.checked = this.value;
  },
  watch: {
    /* 通过watch监听也是可行的
      value(newVal){
      if (this.activeColor || this.inactiveColor) {
        let color = newVal ? this.activeColor : this.inactiveColor;
        this.$refs.core.style.borderColor = color;
        this.$refs.core.style.backgroundColor = color;
      }
    }, */
  },
};
</script>

<style lang="scss" scoped>
.one-switch {
  display: inline-block;
  align-items: center;
  position: relative;
  font-size: 14px;
  line-height: 20px;
  vertical-align: middle;
  .one-switch-input{
    position: absolute;
    widows: 0;
    height: 0;
    opacity: 0;
    margin: 0;
  }
  .one-switch_core {
    margin: 0;
    display: inline-block;
    position: relative;
    width: 40px;
    height: 20px;
    border: 1px solid #dcdfe6;
    outline: none;
    border-radius: 10px;
    box-sizing: border-box;
    background: #dcdfe6;
    cursor: pointer;
    transition: border-color 0.3s, background-color 0.3s;
    vertical-align: middle;
    .one-switch_button {
      position: absolute;
      top: 1px;
      left: 1px;
      border-radius: 100%;
      transition: all 0.3s;
      width: 16px;
      height: 16px;
      background-color: #fff;
    }
  }
}
// 选中样式
.is-checked {
  .one-switch_core {
    border-color: #409eff;
    background-color: #409eff;
    .one-switch_button {
      transform: translateX(20px);
    }
  }
}
</style>
 