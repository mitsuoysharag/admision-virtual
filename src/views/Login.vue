<template>
  <div class="full">
    <Loading :active="loading" />
    <div class="login card">
      <div class="login__logo">
        <img src="~@/assets/logo.png" alt />
      </div>
      <form @submit.prevent="login()">
        <!-- <div class="msg">
          <p>
            <span>Estimado/a postulante: El examen se llevará a cabo hoy 24 de mayo a las 6:00 p.m.</span>
          </p>
          <p>
            <span>Los postulantes que rindieron el examen virtual el día 23 de mayo a las 4:00 p.m, hacer comiso a la comunicación.</span>
          </p>
          <p>
            <span>Si no puede ingresar, por favor, intente omitir los ceros que van delante de su DNI.</span>
          </p>
          <p>
            <span>Si no recuerda su código de postulante, ingrese aquí:</span>
            <br />
            <a href="https://bit.ly/cod-p-unmsm">https://bit.ly/cod-p-unmsm</a>
          </p>
          <div style="margin-bottom: 16px">
            <div style="margin-bottom: 8px">Si tiene algún otro inconveniente para ingresar, comuníquese con nosotros:</div>
            <span>Teléfono: 922536711, 981648674</span>
            <br />
            <span>Whatsapp: 957334134</span>
            <br />
            <span>
              Correo:
              <a href="informatica.dgep@unmsm.edu.pe">informatica.dgep@unmsm.edu.pe</a>
            </span>
          </div>
        </div> -->
        <h1 class="login__title card__title">Iniciar Sesión</h1>
        <div class="error" v-show="error">
          <span>{{error}}</span>
          <i class="fa fa-times" style="cursor: pointer" @click="error = ''"></i>
        </div>
        <div class="login__body">
          <span>Doc. de identidad:</span>
          <InputText v-model="dni" type="text" />
          <span>Cód. postulante:</span>
          <InputText v-model="codigo" type="text" />
        </div>
        <div class="login__actions card__actions">
          <button class="button button--primary">Ingresar</button>
        </div>
      </form>
    </div>
    <!--  -->
    <div class="background">
      <p class="background__title">Proceso de Admisión 2020-I</p>
      <p class="background__subtitle">Maestría</p>
    </div>
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
    dni: "",
    codigo: "",
    //
    error: "",
    loading: false
  }),
  methods: {
    async login() {
      this.error = "";
      if (this.validate()) {
        this.loading = true;
        try {
          let { token, error } = await login(this.dni, this.codigo);
          if (error) {
            this.error = error;
          } else {
            setSession(token, 1);
            redirect("panel");
          }
        } catch (e) {
          this.$root.$children[0].showError();
        }
        this.loading = false;
      } else {
        this.error = "Ingresa todos los datos.";
      }
    },
    validate() {
      return this.dni && this.codigo;
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
  max-width: 360px;
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
    grid-column-gap: 12px;
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

@import "@/styles/color.scss";
.msg {
  // margin-bottom: 28px;
  padding: 0 12px;
  // background: #ffb067;
  color: $color-primary;
  font-size: 0.9rem;
  border: 1px solid $color-primary;
  font-weight: bold;
}

.background {
  overflow: hidden;
  width: 100%;
  // filter: blur(2px);
  background-image: linear-gradient(
      90deg,
      rgba(125, 94, 22, 0.68),
      rgba(115, 85, 18, 0.5)
    ),
    url("~@/assets/background/people.jpg");
  background-size: cover;
  background-position: center center;
  //
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &__title {
    margin: 80px;
    margin-bottom: 0;
    color: #fff;
    font-size: 3.7rem;
    font-weight: bold;
    text-align: center;
  }
  &__subtitle {
    margin: 80px;
    margin-top: 10px;
    color: rgba(255, 255, 255, 0.75);
    font-size: 2.5rem;
    text-align: center;
  }
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