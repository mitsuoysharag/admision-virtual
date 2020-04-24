<template>
  <div>
    <Loading :active="loading" />
    <div class="container" style="padding: 0">
      <div class="row no-gutters">
        <div class="col-12 col-lg-6" style="padding: 20px">
          <!-- Exam -->
          <section class="exam card">
            <div class="exam__title">Examen</div>
            <div class="exam__content">
              <!--  -->
              <i class="fa fa-university"></i>
              <div class="exam__item">Unid. Postgrado:</div>
              <div class="exam__value" v-if="examen.upg">{{examen.upg.nombre}}</div>
              <div class="exam__value" v-else></div>
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
    examen: {},
    loading: true
  }),
  async mounted() {
    this.examen = await obtenerExamenDatos();
    this.examen.tiempo_inicio = this.dateFormat(
      this.examen.tiempo_inicio.$date
    );
    this.examen.tiempo_fin = this.dateFormat(this.examen.tiempo_fin.$date);
    this.loading = false;
  },
  methods: {
    select() {
      redirect("examen");
    },
    dateFormat(date) {
      date = new Date(date);
      date = `${date.getDate()}/${date.getMonth() +
        1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
      return date;
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
</style>