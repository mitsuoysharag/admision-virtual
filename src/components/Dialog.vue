<template>
  <div v-show="value" class="dialog" @click="$emit('input', $event.target.value)">
    <div class="card" @click="prueba($event)">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: ["value"],
  methods: {
    prueba(e) {
      e.stopPropagation();
    }
  }
};
</script>

<style lang='scss' scoped>
.dialog {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  .card {
    width: 100%;
    max-width: 400px;
  }
}
</style>