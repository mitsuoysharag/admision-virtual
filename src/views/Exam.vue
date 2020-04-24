<template>
  <div class="full">
    <Header />
    <div class="exam full__content">
      <Loading :active="loading" />
      <div class="container">
        <section class="question card">
          <p class="question__menu">Pregunta {{question_idx + 1}}</p>
          <p class="question__question">{{question.pregunta}}</p>
          <div class="question__alternatives">
            <label
              class="question__alternative"
              v-for="(alternative, a_idx) in question.alternativas"
              :key="alternative"
            >
              <input
                type="radio"
                :name="question_idx"
                :value="a_idx"
                v-model="question.seleccionado"
              />
              <span>{{alternative}}</span>
            </label>
          </div>
          <div class="question__actions card__actions">
            <button class="button button--blue" @click="go(-1)">Anterior</button>
            <button class="button button--green" @click="save()">Guardar</button>
            <button class="button button--blue" @click="go(+1)">Siguiente</button>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from "@/components/Loading";
import Header from "@/components/Header";

import { obtenerExamen } from "@/services/examenService";
import {
  obtenerRespuestas,
  ingresarRespuestas
} from "@/services/puntajeService";

export default {
  data: () => ({
    examen: {},
    question_idx: 0,
    loading: true
  }),
  computed: {
    question() {
      let contenido = this.examen.contenido || [];
      return contenido[this.question_idx] || {};
    }
  },
  async mounted() {
    let respuestas = await obtenerRespuestas();
    this.examen = await obtenerExamen();
    this.examen.contenido.forEach((c, idx) => {
      c.seleccionado = respuestas[idx];
    });
    this.loading = false;
  },
  methods: {
    go(dir) {
      this.question_idx = Math.min(
        Math.max(0, this.question_idx + dir),
        this.examen.contenido.length - 1
      );
    },
    async save() {
      this.loading = true;
      let respuestas = this.examen.contenido.map(c => c.seleccionado);
      await ingresarRespuestas(respuestas);
      this.loading = false;
    }
  },
  components: {
    Loading,
    Header
  }
};
</script>

<style lang='scss' scoped>
.exam {
  position: relative;
}
.question {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  &__menu {
    margin: 0 0 20px 0;
    font-weight: bold;
  }
  &__question {
    margin: 0 0 20px 0;
  }
  &__alternatives {
  }
  &__alternative {
    margin-bottom: 10px;
    display: flex;
    cursor: pointer;
  }
  &__actions {
    margin-top: 28px;
    justify-content: space-between;
  }
}
</style>