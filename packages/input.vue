<template>
  <!-- 
  参数支持：
参数名称	参数描述	参数类型	默认值
placeholder	占位符	string	无
type	文本框类型（text/password）	string	text
disabled	禁用	boolean	false
clearable	是否显示清空按钮	boolean	false
show-password	是否显示密码切换按钮	boolean	false
name	name属性	string	无

事件支持：
事件名称	事件描述
blur	失去焦点事件
change	内容改变事件
focus	获取焦点事件
 -->
  <div class="one-input" :style="{'width':width}" :class="{'one-input_suffix':showSuffix}">
    <!-- 如果传了showPassword，再判断是否需要密码的切换 -->
    <input
      class="one-input_inner"
      :class="{ 'is-disabled': disabled }"
      :placeholder="placeholder"
      :type="showPassword ? (passwordVisible ? 'text' : 'password') : type"
      :name="name"
      :value="value"
      @input="handleInput"
      @blur='handleBlur'
      :disabled="disabled"
    />
    <span class="one-input_suffix" v-if="showSuffix">
      <i
        class="on-input_icon one-icon-close"
        v-if="clearable && value"
        @click="clear"
      ></i>
      <i
        class="on-input_icon one-icon-browse"
        v-if="showPassword && type == 'password'"
        @click="handlePassword"
      ></i>
    </span>
  </div>
</template>
<script>
export default {
  name: "oneInput",
  components: {},
  computed:{
    showSuffix(){
      return this.clearable ||  this.showPassword
    }
  },
  props: {
    placeholder: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "text",
    },
    name: {
      type: String,
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    value: {
      type: String,
      default: "",
    },
    clearable: {
      type: Boolean,
      default: false,
    },
    showPassword: {
      type: Boolean,
      default: false,
    },
    width: {
      type: String,
      default: '200px'
    }
  },
  data() {
    return {
      // 用于控制是否显示密码框
      passwordVisible: false
    };
  },
  methods: {
    handleInput(e) {
      this.$emit("input", e.target.value);
    },
    clear(){
      this.$emit("input", '');
    },
    handlePassword(){
      this.passwordVisible = !this.passwordVisible
    },
    handleBlur(e) {
      this.$emit('blur',e)
    }
  },
};
</script>
<style lang="scss" scoped>
.one-input {
  width: 200px;
  position: relative;
  font-size: 14px;
  display: inline-block;
  .one-input_inner {
    -webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 40px;
    line-height: 40px;
    outline: none;
    padding: 0 15px;
    transition: border-color 0.2s cubic-bezier(0.645, 045, 0.355, 1);
    width: 100%;

    &:focus {
      outline: none;
      border-color: #409eff;
    }
    // input禁用样式
    &.is-disabled {
      background-color: #f5f7fa;
      border-color: #e4e7ed;
      color: #c0c4cc;
      cursor: not-allowed;
    }
  }
}
.one-input_suffix{
    .one-input_inner{
      padding-right: 30px;
    }
    .one-input_suffix{
      position: absolute;
      right: 10px;
      height: 100%;
      top: 0;
      line-height: 40px;
      text-align: center;
      color: #c0c4cc;
      transition: all .3s;
      z-index: 900;
      i{
        color: #c0c4cc;
        font-size: 14px;
        cursor: pointer;
        transition: color .2s cubic-bezier(.645,.045,.355,1);
      }
    }
  }
</style>