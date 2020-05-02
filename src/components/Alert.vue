<template>
  <div v-show="value" class="alert">
    <slot></slot>
    <i class="fa fa-times alert__close" @click="$emit('input', false)"></i>
  </div>
</template>

<script>
export default {
  props: ["value"]
};
</script>

<style lang='scss' scoped>
.alert {
  padding: 16px 20px;
  background: #5f88f8;
  color: #fff;
  font-weight: bold;
  //
  display: flex;
  justify-content: space-between;
  align-items: center;

  &__close {
    margin-left: 20px;
    font-size: 1.1rem;
    cursor: pointer;
  }
}
</style>