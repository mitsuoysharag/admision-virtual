<template>
  <div>
    <Loading :active="loading" />
    <div class="container" style="padding: 0">
      <div class="row no-gutters">
        <div class="col-12 col-lg-6" style="padding: 20px">
          <!-- EXAM -->
          <section class="exam card" v-if="examen">
            <div class="exam__title">Examen</div>
            <div class="exam__content">
              <!--  -->
              <i class="fa fa-question"></i>
              <div class="exam__item">N° Preguntas:</div>
              <div class="exam__value">{{examen.tamaño}}</div>
              <!--  -->
              <i class="fas fa-clock"></i>
              <div class="exam__item">Inicio:</div>
              <div class="exam__value">{{examen.tiempo_inicio}}</div>
              <!--  -->
              <i class="fas fa-clock"></i>
              <div class="exam__item">Fin:</div>
              <div class="exam__value">{{examen.tiempo_fin}}</div>
            </div>
            <div class="exam__actions card__actions" @click="select()">
              <button class="button button--blue">Ingresar</button>
            </div>
          </section>
          <!-- NO EXAM -->
          <section v-else class="no-exam card">
            <span>Aún no se ha registrado un examen.</span>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from "@/components/Loading";

import { obtenerExamenDatos } from "@/services/examenService";
import { redirect } from "@/services/router";

export default {
  data: () => ({
    examen: null,
    loading: true
  }),
  async mounted() {
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
      let day = date.getDate();
      let month = this.format_two_digits(date.getMonth() + 1);
      let year = date.getFullYear();
      let hours = this.format_two_digits(date.getHours());
      let minutes = this.format_two_digits(date.getMinutes());
      date = `${day}-${month}-${year} ${hours}:${minutes}`;
      return date;
    },
    format_two_digits(n) {
      return n < 10 ? "0" + n : n;
    }
  },
  components: {
    Loading
  }
};
</script>

<style lang='scss' scoped>
.exam {
  padding: 28px;
  color: #313435;

  &__title {
    margin: 0 0 24px 0;
    font-size: 1.5rem;
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
    font-weight: bold;
  }
  &__value {
    padding: 8px 14px;
    background: #f6f6f6;
    font-size: 0.95rem;
    border-radius: 4px;
  }
  &__actions {
    margin-top: 24px;
  }
}
.no-exam {
  padding: 20px;
  text-align: center;
}
</style>