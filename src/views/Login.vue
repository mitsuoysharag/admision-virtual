<template>
  <div class="full">
    <Loading :active="loading" />
    <div class="login card">
      <form @submit.prevent="login()">
        <h1 class="login__title card__title">Iniciar Sesión</h1>
        <div class="error" v-show="error">
          <span>{{error}}</span>
          <i class="fa fa-times" @click="error = ''"></i>
        </div>
        <div class="login__body">
          <span>DNI:</span>
          <InputText v-model="dni" type="text" />
          <span>Cód. de Inscripción:</span>
          <InputText v-model="codigo_inscripcion" type="text" />
        </div>
        <div class="login__actions card__actions">
          <button class="button button--blue">Ingresar</button>
        </div>
      </form>
    </div>
    <!--  -->
    <div class="background"></div>
  </div>
</template>

<script>
import Loading from "@/components/Loading";
import InputText from "@/components/InputText";

import { login } from "@/services/loginService";
import { setSession } from "@/services/session";
import { redirect } from "@/services/router";

export default {
  data: () => ({
    // dni: "76530512",
    // codigo_inscripcion: "aaa",
    dni: "",
    codigo_inscripcion: "",
    //
    error: "",
    loading: false
  }),
  methods: {
    async login() {
      this.error = "";
      if (this.validate()) {
        this.loading = true;
        let { token, error } = await login(this.dni, this.codigo_inscripcion);
        this.loading = false;
        if (error) {
          this.error = error;
        } else {
          setSession(token, 1);
          redirect("panel");
        }
      } else {
        this.error = "Ingresa todos los datos.";
      }
    },
    validate() {
      return this.dni && this.codigo_inscripcion;
    }
  },
  components: {
    InputText,
    Loading
  }
};
</script>

<style lang='scss' scoped>
.full {
  height: 100vh;
  //
  display: flex;
  flex-direction: row;
}
.login {
  height: 100%;
  width: 100%;
  max-width: 400px;
  padding: 20px;
  border-radius: 0;
  z-index: 1;
  //
  display: flex;
  justify-content: center;
  align-items: center;

  &__title {
    font-size: 2rem;
    margin-bottom: 24px;
  }
  &__body {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-column-gap: 20px;
    grid-row-gap: 12px;
    align-items: center;
  }
  &__actions {
    margin-top: 22px;
  }
}
.error {
  margin-bottom: 28px;
  padding: 10px;
  background: #ffb067;
  color: #fff;
  //
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.background {
  overflow: hidden;
  width: 100%;
  // filter: blur(2px);
  background-image: linear-gradient(
      to right,
      rgba(0, 111, 196, 0.75),
      rgba(0, 111, 196, 0.95)
    ),
    url("~@/assets/background/unmsm.jpg");
  background-size: cover;
  background-position: center center;
}
</style>