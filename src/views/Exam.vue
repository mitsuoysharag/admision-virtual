<template>
  <div class="full">
    <Header />
    <Loading :active="loading" />
    <div v-if="examen.contenido && !error_type" class="container">
      <!-- EXAM -->
      <div v-show="!show_end" class="exam">
        <!-- ALERT -->
        <m-alert v-model="show_alert" style="margin-bottom: 20px">
          <span>
            <i class="fa fa-info-circle" style="margin-right: 8px"></i> Las respuestas seleccionadas se guardarán al cambiar de pregunta.
          </span>
        </m-alert>
        <!-- SELECT -->
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
            <div
              class="question__alternative"
              v-for="(alternative, a_idx) in question.alternativas"
              :key="a_idx"
            >
              <label class="question__radio">
                <input type="radio" :name="q_idx" :value="a_idx" v-model="question.seleccionado" />
                <span>{{alt_arr[a_idx]}}</span>
              </label>
              <span>{{question.alternativas[examen.exam_order[q_idx][a_idx]]}}</span>
            </div>

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
            class="button button--primary"
            v-show="question_idx > 0"
            @click="go(-1); show_end = false"
          >Anterior</button>
          <div></div>
          <button
            class="button button--primary"
            v-show="question_idx < this.examen.contenido.length - 1"
            @click="go(+1)"
          >Siguiente</button>
          <button
            class="button button--primary-outline"
            v-show="question_idx === this.examen.contenido.length - 1"
            @click="end()"
          >Siguiente</button>
        </div>
      </div>
      <!-- End -->
      <section v-show="show_end" class="exam__end card">
        <p>Ha llegado al final del examen. Puede volver y modificar sus respuestas, o finalizar su participación.</p>
        <button
          class="button button--primary-outline"
          style="margin-right: 10px"
          @click="show_end = false;"
        >Volver</button>
        <button class="button button--primary" @click="dialog_end = true">Finalizar</button>
      </section>
    </div>
    <!-- ERROR -->
    <section class="error card" v-show="error_type">
      <p>{{error}}</p>
      <button class="button button--primary" @click="redirect()">Salir</button>
    </section>

    <!-- DIALOG -->
    <m-dialog v-model="dialog_end">
      <p
        style="margin: 10px 10px 20px 10px"
      >Si finaliza su participación ya no podrá modificar sus respuestas.</p>
      <div class="card__actions">
        <button class="button" @click="dialog_end = false">Cancelar</button>
        <button
          class="button button--primary"
          @click="dialog_end = false; finalizarExamen()"
        >Finalizar</button>
      </div>
    </m-dialog>
  </div>
</template>

<script>
import Loading from "@/components/Loading";
import Header from "@/components/Header";

import { obtenerExamen, finalizarExamen } from "@/services/examenService";
import {
  obtenerRespuestas,
  ingresarRespuestas
} from "@/services/puntajeService";
import { removeSession } from "@/services/session";
import { redirect } from "@/services/router";

export default {
  data: () => ({
    examen: {},
    question_idx: 0,
    alt_arr: ["A", "B", "C", "D"],
    error_type: "",
    //
    loading: true,
    show_end: false,
    show_alert: true,
    dialog_end: false,
    final_message:
      "Gracias por participar. A partir de 6 pm se enviarán los resultados a su correo."
  }),
  async mounted() {
    try {
      /* eslint-disable */
      let respuestas = await obtenerRespuestas();
      this.examen = await obtenerExamen();

      if (this.examen.error) {
        this.error_type = this.examen.error;
      } else {
        this.examen.contenido.forEach((c, idx) => {
          c.seleccionado = respuestas[idx];
        });
      }
    } catch (e) {
      this.$root.$children[0].showError();
      redirect("panel");
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
        end: this.final_message
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

      try {
        let { error } = await ingresarRespuestas(respuestas);
        if (error) {
          this.error_type = error;
        }
      } catch (e) {
        this.$root.$children[0].showError(
          "No se pudo guardar el último cambio."
        );
      }
      this.loading = false;
    },
    async end() {
      await this.save();
      this.show_end = true;
    },
    async finalizarExamen() {
      this.loading = true;
      try {
        await finalizarExamen();
        this.error_type = "end";
      } catch (e) {
        this.$root.$children[0].showError();
      }
      this.loading = false;
    },
    //
    redirect() {
      removeSession();
      redirect("login");
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
@import "@/styles/color.scss";

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
    max-width: 400px;
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
    white-space: pre-wrap;
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
    margin-bottom: 20px;
    white-space: pre-wrap;
    // color: #3a3a3a;
    display: flex;
    align-items: flex-start;
    &--null {
      margin: 20px auto 0;
      width: min-content;
    }
  }
  &__radio {
    span {
      margin-right: 12px;
      padding: 4px 8px;
      font-weight: bold;
      font-size: 0.95rem;
      border-radius: 4px;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25);
      cursor: pointer;
    }
    input[type="radio"] {
      display: none;
      &:checked + span {
        background: $color-primary;
        color: #fff;
      }
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
  max-width: 400px;
  margin: 20px auto;
  padding: 20px;
  font-size: 1.2rem;
  text-align: center;
}
</style>