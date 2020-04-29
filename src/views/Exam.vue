<template>
  <div class="full">
    <Header />
    <Loading :active="loading" />
    <div v-if="examen.contenido && !error_type" class="container">
      <!-- EXAM -->
      <div v-show="!show_end" class="exam">
        <select class="exam__select" v-model="question_idx">
          <option
            v-for="(question, q_idx) in examen.contenido"
            :key="q_idx"
            :value="q_idx"
          >Pregunta {{q_idx+1}}</option>
        </select>
        <!-- QUESTION -->
        <section
          class="question card"
          v-for="(question, q_idx) in examen.contenido"
          :key="q_idx"
          v-show="q_idx === question_idx"
        >
          <p class="question__question">{{question.pregunta}}</p>
          <hr />
          <div class="question__alternatives">
            <label
              class="question__alternative"
              v-for="(alternative, a_idx) in question.alternativas"
              :key="a_idx"
            >
              <input
                type="radio"
                :name="q_idx"
                :value="a_idx"
                v-model="question.seleccionado"
                style="margin: 5px 10px 0 0"
              />
              <span>{{alternative}}</span>
            </label>

            <label class="question__alternative question__alternative--null button">
              <input
                v-show="false"
                type="radio"
                :name="q_idx"
                :value="null"
                v-model="question.seleccionado"
              />
              <span>Limpiar</span>
            </label>
          </div>
        </section>
        <div class="exam__actions">
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
      <section v-show="show_end" class="exam__end card">
        <p>Has finalizado el examen.</p>
        <button
          class="button button--blue"
          style="margin-right: 10px"
          @click="show_end = false;"
        >Volver</button>
        <button class="button button--blue" @click="redirect()">Salir</button>
      </section>
    </div>
    <!-- ERROR -->
    <section class="error card" v-show="error_type">
      <p>{{error}}</p>
      <button class="button button--blue" @click="redirect()">Salir</button>
    </section>
    <!-- ANSWERS -->
    <Answers v-if="show_end || (error_type && error_type != 'nostart')" />
  </div>
</template>

<script>
import Loading from "@/components/Loading";
import Header from "@/components/Header";
import Answers from "@/components/Answers";

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
    error_type: "",
    //
    loading: true,
    show_end: false
  }),
  async mounted() {
    let respuestas = await obtenerRespuestas();
    this.examen = await obtenerExamen();
    if (this.examen.error) {
      this.error_type = this.examen.error;
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
  computed: {
    error() {
      let errors = {
        nostart: "Aún no inicia el examen.",
        end: "Ha finalizado el examen."
      };
      return errors[this.error_type];
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
      let { error } = await ingresarRespuestas(respuestas);
      if (error) {
        this.error_type = error;
      }
      this.loading = false;
    },
    async end() {
      await this.save();
      this.show_end = true;
    },
    clean(question) {
      question.seleccionado = 0;
      this.examen.contenido.splice();
      question.alternativas.splice();
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
    Header,
    Answers
  }
};
</script>

<style lang='scss' scoped>
.exam {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px 0;
  // &__select {
  // }
  &__actions {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
  }
  &__end {
    width: 100%;
    max-width: 300px;
    margin: 20px auto;
    padding: 20px;
    font-size: 1.2rem;
    text-align: center;
  }
}
.question {
  margin: 20px auto;
  padding: 20px;
  &__question {
    margin: 0 0 20px 0;
  }
  hr {
    border: 0;
    border-top: 1px solid #dbdbdb;
  }
  &__alternatives {
    margin-top: 20px;
  }
  &__alternative {
    margin-bottom: 10px;
    // color: #3a3a3a;
    display: flex;
    cursor: pointer;
    &--null {
      margin: 20px auto 0;
      width: min-content;
    }
  }
  &__action {
    display: block;
    margin: 0 auto;
    margin-top: 20px;
  }
}
.error {
  width: 100%;
  max-width: 300px;
  margin: 20px auto;
  padding: 20px;
  font-size: 1.2rem;
  text-align: center;
}
</style>