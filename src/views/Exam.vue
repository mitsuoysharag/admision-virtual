<template>
  <div class="full">
    <Header />
    <div v-show="!error" class="exam full__content">
      <Loading :active="loading" />
      <!-- Question -->
      <div class="container" style="max-width: 800px; padding: 20px 0" v-if="examen.contenido && !show_end">
        <select v-model="question_idx">
          <option
            v-for="(question, q_idx) in examen.contenido"
            :key="q_idx"
            :value="q_idx"
          >Pregunta {{q_idx+1}}</option>
        </select>
        <section
          class="question card"
          v-for="(question, q_idx) in examen.contenido"
          :key="q_idx"
          v-show="q_idx === question_idx"
        >
          <p class="question__question">{{question.pregunta}}</p>
          <div class="question__alternatives">
            <label
              class="question__alternative"
              v-for="(alternative, a_idx) in question.alternativas"
              :key="a_idx"
            >
              <input type="radio" :name="q_idx" :value="a_idx" v-model="question.seleccionado" />
              <span>{{alternative}}</span>
            </label>
          </div>
        </section>
        <div class="actions card__actions">
          <button
            class="button button--blue"
            v-show="question_idx > 0"
            @click="go(-1); show_end = false"
          >Anterior</button>
          <div></div>
          <button
            class="button button--blue"
            v-show="question_idx < this.examen.contenido.length - 1"
            @click="go(+1)"
          >Siguiente</button>
          <button
            class="button button--green"
            v-show="question_idx === this.examen.contenido.length - 1 && !show_end"
            @click="end()"
          >Finalizar</button>
        </div>
      </div>
      <!-- End -->
      <div v-show="show_end" class="container">
        <section class="end card">
          <p>Has finalizado el examen.</p>
          <button class="button button--blue" style="margin-right: 10px" @click="show_end = false;">Volver</button>
          <button class="button button--blue" @click="redirect()">Salir</button>
        </section>
      </div>
    </div>
    <div class="error card" v-show="error">
      <p>{{error}}</p>
      <button class="button button--blue" @click="redirect()">Volver</button>
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
import { redirect } from "@/services/router";

export default {
  data: () => ({
    examen: {},
    question_idx: 0,
    error: "",
    //
    loading: true,
    show_end: false
  }),
  async mounted() {
    let respuestas = await obtenerRespuestas();
    this.examen = await obtenerExamen();
    if (this.examen.error) {
      this.error = this.examen.error;
    } else {
      this.examen.contenido.forEach((c, idx) => {
        c.seleccionado = respuestas[idx];
      });
    }
    this.loading = false;
  },
  watch: {
    async question_idx() {
      await this.save();
    }
  },
  methods: {
    async go(dir) {
      this.question_idx = Math.min(
        Math.max(0, this.question_idx + dir),
        this.examen.contenido.length - 1
      );
    },
    async save() {
      this.loading = true;
      let respuestas = this.examen.contenido.map(c => c.seleccionado);
      let response = await ingresarRespuestas(respuestas);
      if (response.error) {
        this.error = response.error;
      }
      this.loading = false;
    },
    async end() {
      await this.save();
      this.show_end = true;
    },
    //
    redirect() {
      redirect("panel");
    },
    //
    dateFormat(date) {
      date = new Date(date);
      // date = `${date.getDate()}/${date.getMonth() +
      //   1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
      return date;
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
.select {
  max-width: 800px;
  margin: 20px auto;
  padding: 0;
}
.question {
  margin: 20px auto;
  padding: 20px;
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
}
.actions {
  max-width: 800px;
  margin: 20px auto;
  justify-content: space-between;
}
.error {
  max-width: 300px;
  margin: 20px auto;
  padding: 20px;
  font-size: 1.2rem;
  text-align: center;
}
.end {
  max-width: 300px;
  margin: 20px auto;
  padding: 20px;
  font-size: 1.2rem;
  text-align: center;
}
</style>