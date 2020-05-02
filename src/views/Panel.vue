<template>
  <div>
    <Header />
    <Loading :active="loading" />
    <!-- PROFILE -->
    <section class="profile card">
      <p class="profile__welcome">Bienvenido</p>
      <p
        class="profile__name"
      >{{profile.apellido_paterno}} {{profile.apellido_materno}}, {{profile.nombre}}</p>
      <section class="profile__content">
        <!--  -->
        <i class="fa fa-id-card"></i>
        <span class="profile__item">DNI:</span>
        <span class="profile__value">{{profile.dni}}</span>
        <!--  -->
        <i class="fa fa-graduation-cap"></i>
        <span class="profile__item">Cód. Postulante:</span>
        <span class="profile__value">{{profile.codigo_postulante}}</span>
        <!--  -->
        <hr class="profile__divider" />
        <!--  -->
        <i class="fa fa-question"></i>
        <span class="profile__item">N° Preguntas:</span>
        <span class="profile__value">{{examen.tamaño}}</span>
        <!--  -->
        <i class="fas fa-clock"></i>
        <span class="profile__item">Inicio:</span>
        <span class="profile__value">{{examen.tiempo_inicio}}</span>
        <!--  -->
        <i class="fas fa-clock"></i>
        <span class="profile__item">Fin:</span>
        <span class="profile__value">{{examen.tiempo_fin}}</span>
      </section>
      <div class="profile__actions card__actions" @click="select()">
        <button class="button button--blue">Ingresar</button>
      </div>
    </section>
  </div>
</template>

<script>
import Header from "@/components/Header";
import Loading from "@/components/Loading";

import { obtenerPerfil } from "@/services/postulanteService";
import { obtenerExamenDatos } from "@/services/examenService";
import { redirect } from "@/services/router";

export default {
  data: () => ({
    examen: {},
    profile: {},
    loading: true
  }),
  async mounted() {
    this.profile = await obtenerPerfil();
    this.examen = await obtenerExamenDatos();
    if (this.examen) {
      this.examen.tiempo_inicio = this.dateFormat(this.examen.tiempo_inicio);
      this.examen.tiempo_fin = this.dateFormat(this.examen.tiempo_fin);
    }
    this.loading = false;
  },
  methods: {
    select() {
      redirect("examen");
    },
    dateFormat(date) {
      date = new Date(date);
      let day = this.format_two_digits(date.getDate());
      let month = this.format_two_digits(date.getMonth() + 1);
      let year = date.getFullYear();
      let hours = this.format_two_digits(date.getHours());
      let minutes = this.format_two_digits(date.getMinutes());
      date = `${day}/${month}/${year} ${hours}:${minutes}`;
      return date;
    },
    format_two_digits(n) {
      return n < 10 ? "0" + n : n;
    }
  },
  components: {
    Header,
    Loading
  }
};
</script>

<style lang='scss' scoped>
.profile {
  max-width: 540px;
  margin: 20px auto;
  padding: 28px;
  color: #313435;

  &__welcome {
    margin: 0 0 2px 0;
    color: #7db1f7;
    font-size: 1.8rem;
    font-weight: bold;
  }
  &__name {
    margin: 0 0 30px 0;
    font-size: 1.8rem;
    font-weight: bold;
  }
  &__content {
    //
    display: grid;
    grid-template-columns: auto auto 1fr;
    row-gap: 18px;
    column-gap: 8px;
    align-items: center;
  }
  &__item {
    margin-right: 18px;
    font-size: 0.95rem;
    font-weight: bolder;
  }
  &__value {
    padding: 10px 16px;
    // background: #f6f6f6;
    background: #f2f7fc;
    // color: #00000079;
    font-size: 0.95rem;
    // font-weight: bold;
    border-radius: 4px;
  }
  &__divider {
    grid-column: 1 / 4;
    width: 100%;
    // margin: 0;
    border: 0.5px solid #ececec;
  }
  &__actions {
    margin-top: 24px;
  }
}
</style>