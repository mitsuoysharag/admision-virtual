<template>
  <div class="loading" :class="{'loading--active': active}">
    <div class="loading__icon"></div>
  </div>
</template>

<script>
export default {
  props: ["active"]
};
</script>

<style lang='scss' scoped>
.loading {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  opacity: 0;
  transition: all 1.2s;
  z-index: 50;
  pointer-events: none;
  //
  display: flex;
  justify-content: center;
  align-items: center;
  &__icon {
    border: 4px solid #f3f3f3;
    border-radius: 50%;
    border-top: 4px solid rgb(151, 49, 51);
    width: 90px;
    height: 90px;
    animation: rotate 0.9s linear infinite;
  }
  &--active {
    background: rgba(255, 255, 255, 0.8);
    opacity: 1;
    pointer-events: all;
  }
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>