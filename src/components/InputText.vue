<template>
  <div class="input">
    <input
      :type="type"
      :value="value"
      @input="$emit('input', $event.target.value)"
      autocomplete="off"
    />
  </div>
</template>

<script>
export default {
  props: ["value", "type"]
};
</script>

<style lang='scss' scoped>
.input {
  display: flex;
  input {
    width: 100%;
    padding: 4px 0;
    color: #4b4b4b;
    font-size: 1rem;
    border: none;
    border-bottom: 1.5px solid #ccc;
    &:focus,
    &:active {
      box-shadow: none !important;
      -moz-box-shadow: none !important;
      -webkit-box-shadow: none !important;
      outline: none !important;
      border-bottom: 1.5px solid #7682f1;
    }
  }
}
</style>