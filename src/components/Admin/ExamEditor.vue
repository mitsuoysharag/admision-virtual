<template>
  <div style="height: 100%; display: flex; flex-direction: column">
    <Loading :active="loading" />
    <div class="menu">
      <h2 class="menu__title">Editar Examen</h2>
      <button class="button button--blue" @click="guardar()">Guardar</button>
    </div>
    <div class="exam">
      <section class="exam__date">
        <span>Tiempo Inicio:</span>
        <input type="datetime-local" v-model="examen.tiempo_inicio" />
        <span>Tiempo Fin:</span>
        <input type="datetime-local" v-model="examen.tiempo_fin" />
      </section>
      <div class="exam__content">
        <section class="question card" v-for="(c, c_idx) in examen.contenido" :key="c_idx">
          <p>Pregunta {{c_idx + 1}}</p>
          <textarea class="exam__question" v-model="c.pregunta" rows="4"></textarea>
          <div v-for="(a, a_idx) in c.alternativas" :key="a_idx">
            <input type="radio" :name="c_idx" :value="a_idx" v-model="c.correcta" />
            <textarea v-model="c.alternativas[a_idx]" rows="2"></textarea>
          </div>
          <hr />
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from "@/components/Loading";

import {
  obtenerExamenAdmin,
  guardarExamenAdmin
} from "@/services/examenService";

export default {
  data: () => ({
    examen: {},
    loading: true
  }),
  async mounted() {
    this.examen = await obtenerExamenAdmin();
    this.loading = false;
  },
  methods: {
    async guardar() {
      this.loading = true;
      await guardarExamenAdmin(this.examen);
      this.loading = false;
    }
  },
  components: {
    Loading
  }
};
</script>

<style lang='scss' scoped>
.menu {
  padding: 10px;
  //
  display: flex;
  justify-content: space-between;
  align-items: center;
  &__title {
    margin: 0 10px;
  }
}
.exam {
  overflow-y: auto;
  padding: 20px;
  &__date {
    width: max-content;
    //
    display: grid;
    grid-template-columns: auto auto;
    column-gap: 12px;
    row-gap: 8px;
    align-items: center;
  }
  &__content {
    margin-top: 20px;
  }
  &__question {
    width: 100%;
  }
}
</style>