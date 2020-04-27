<template>
  <!-- ANSWERS -->
  <section class="answers card">
    <h3 class="answers__title">Mis Respuestas</h3>
    <p class="answers__loading" v-show="loading">Cargando respuestas...</p>
    <div class="answers__grid">
      <template v-for="(respuesta, idx) in respuestas">
        <span class="answers__idx" :key="idx">{{idx + 1}}.</span>
        <span
          class="answers__answer"
          :key="`answer-${idx}`"
        >{{respuesta != null? toOption(respuesta): '---'}}</span>
      </template>
    </div>
  </section>
</template>

<script>
import { obtenerRespuestas } from "@/services/puntajeService";

export default {
  data: () => ({
    respuestas: [],
    loading: true
  }),
  async mounted() {
    this.respuestas = await obtenerRespuestas();
    this.loading = false;
  },
  methods: {
    toOption(answer) {
      return ["a", "b", "c", "d"][answer];
    }
  }
};
</script>

<style lang='scss' scoped>
.answers {
  width: 100%;
  max-width: 300px;
  margin: 0 auto 20px;
  padding: 20px;
  &__title {
    margin-top: 0;
    text-align: center;
  }
  &__grid {
    margin: 0 auto;
    width: max-content;
    //
    display: grid;
    grid-template-columns: auto auto;
    column-gap: 10px;
    row-gap: 10px;
  }
  &__idx {
    font-weight: bold;
  }
  &__answer {
  }
}
.answers__loading {
  margin: 0;
  font-weight: bold;
  text-align: center;
  animation: blink 1s linear infinite;
}

@keyframes blink {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.2;
  }
}
</style>