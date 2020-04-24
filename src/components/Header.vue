<template>
  <header class="header">
    <img
      class="header__logo"
      src="https://upload.wikimedia.org/wikipedia/commons/4/46/UNMSM_Escudo_y_Nombre.png"
      alt
    />
  </header>
</template>

<script>
export default {};
</script>

<style lang='scss' scoped>
.header {
  padding: 10px;
  height: 64px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  z-index: 100;
  //
  display: flex;
  align-items: center;

  &__logo {
    height: 100%;
  }
}
</style>