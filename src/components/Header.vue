<template>
  <header class="header">
    <img
      class="header__logo"
      src="~@/assets/logo-unmsm.png"
      alt
    />
    <button class="button" @click="logout()">Cerrar Sesión</button>
  </header>
</template>

<script>
import { getSession, removeSession } from "@/services/session";
import { redirect } from "@/services/router";

export default {
  methods: {
    logout() {
      let type = getSession()["type"];
      removeSession();
      if (type == 0) {
        redirect("login-admin");
      } else {
        redirect("login");
      }
    }
  }
};
</script>

<style lang='scss' scoped>
.header {
  padding: 10px;
  padding-left: 0;
  height: 64px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  z-index: 100;
  //
  display: flex;
  align-items: center;
  justify-content: space-between;

  &__logo {
    height: 100%;
  }
}
</style>