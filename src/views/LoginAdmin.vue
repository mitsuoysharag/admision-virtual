<template>
  <div class="full">
    <Loading :active="loading" />
    <div class="login card">
      <div class="login__logo">
        <img src="~@/assets/logo.png" alt />
      </div>
      <form @submit.prevent="login()">
        <h1 class="login__title card__title">Iniciar Sesión</h1>
        <div class="error" v-show="error">
          <span>{{error}}</span>
          <i class="fa fa-times" style="cursor: pointer" @click="error = ''"></i>
        </div>
        <div class="login__body">
          <span>Usuario:</span>
          <InputText v-model="user" type="text" />
          <span>Contraseña:</span>
          <InputText v-model="pass" type="password" />
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

import { loginAdmin } from "@/services/loginService";
import { setSession } from "@/services/session";
import { redirect } from "@/services/router";

export default {
  data: () => ({
    user: "",
    pass: "",
    //
    error: "",
    loading: false
  }),
  methods: {
    async login() {
      this.error = "";
      if (this.validate()) {
        this.loading = true;
        let { token, error } = await loginAdmin(this.user, this.pass);
        this.loading = false;
        if (error) {
          this.error = error;
        } else {
          setSession(token, 0);
          redirect("admin");
        }
      } else {
        this.error = "Ingresa todos los datos.";
      }
    },
    validate() {
      return this.user && this.pass;
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
  position: relative;
  height: 100%;
  width: 100%;
  max-width: 340px;
  padding: 0 30px;
  border-radius: 0;
  z-index: 1;
  //
  display: grid;
  grid-template-rows: 3fr 4fr 3fr;
  justify-content: center;
  align-items: center;

  &__logo {
    padding: 30px 0;
    img {
      display: block;
      margin: 0 auto;
      width: 100px;
    }
  }
  form {
    max-width: 360px;
  }
  &__title {
    font-size: 2rem;
    margin-bottom: 24px;
  }
  &__body {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-column-gap: 16px;
    grid-row-gap: 12px;
    align-items: center;
  }
  &__actions {
    margin-top: 20px;
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

@media only screen and (max-width: 955px) {
  .login {
    max-width: 100%;
  }
  .background {
    display: none;
  }
}
</style>