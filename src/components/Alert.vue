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
@import "@/styles/color.scss";

.alert {
  padding: 12px 18px;
  color: $color-primary;
  border: 1px solid $color-primary;
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