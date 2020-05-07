<template>
  <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
  </div>-->
  <div>
    <router-view />

    <!-- Dialog Error -->
    <m-dialog v-model="dialog_error">
      <p style="margin: 10px 10px 20px 10px">{{dialog_msg}}</p>
      <div class="card__actions">
        <button class="button" @click="dialog_error = false">Cerrar</button>
      </div>
    </m-dialog>
  </div>
</template>

<script>
export default {
  data: () => ({
    dialog_error: false,
    dialog_msg: ""
  }),
  methods: {
    showError(msg) {
      this.dialog_error = true;
      this.dialog_msg = msg || 'Error al conectarse al servidor.';
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
