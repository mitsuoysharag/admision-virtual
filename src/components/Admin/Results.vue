<template>
  <div style="padding: 20px">
    <Loading :active="loading" />
    <div class="results card">
      <div class="results__actions">
        <button class="button button--blue" @click="exportCSV()">Exportar CSV</button>
      </div>
      <div class="results__table">
        <table class="table">
          <thead>
            <tr>
              <!-- <th>N°</th> -->
              <th>DNI</th>
              <th>Nombre</th>
              <th>Puntaje</th>
              <th v-for="(_, idx) in Array(examen_size)" :key="idx">{{idx + 1}}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(p, p_idx) in postulantes_page" :key="p_idx">
              <!-- <td>{{p_idx + 1}}</td> -->
              <td>{{p.dni}}</td>
              <td>{{p.nombre}}</td>
              <td class="center">{{p.puntaje}}</td>
              <td
                v-for="(_, idx) in Array(examen_size)"
                :key="idx"
                class="center"
                :class="{
              'correct': p.respuestas[idx]!= null && p.respuestas[idx] == examen.contenido[idx].correcta,
              'incorrect': p.respuestas[idx]!= null && p.respuestas[idx] != examen.contenido[idx].correcta
              }"
              >{{toOption(p.respuestas[idx])|| '-'}}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="results__table-pages">
        <div>
          <span style="margin-right: 10px">
            <strong>Páginas:</strong>
          </span>
          <button
            class="button page"
            :class="{'page--selected': page == p}"
            v-for="(p, idx) in pages"
            :key="idx"
            @click="page = p"
          >{{p + 1}}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from "@/components/Loading";

import { obtenerPostulantesRespuestas } from "@/services/postulanteService";
import { obtenerExamenAdmin } from "@/services/examenService";

export default {
  data: () => ({
    postulantes: [],
    examen: {},
    examen_size: 25,
    //
    page: 0,
    page_size: 100,
    loading: true
  }),
  async mounted() {
    this.examen = await obtenerExamenAdmin();
    this.postulantes = await obtenerPostulantesRespuestas();
    // let postulantes = await obtenerPostulantesRespuestas();
    // let postulantes_2 = [];
    // for (let i = 0; i < Array(1005).length; i++) {
    //   postulantes_2 = postulantes_2.concat(postulantes);
    // }
    // this.postulantes = postulantes_2;
    //
    this.postulantes.forEach(p => {
      let { dni, nombre, apellido_paterno, apellido_materno } = p.postulante;
      p.dni = dni;
      p.nombre = `${apellido_paterno} ${apellido_materno} ${nombre}`;
      p.respuestas = p.respuestas || [];
      p.puntaje = this.getScore(p.respuestas);
    });
    this.loading = false;
  },
  computed: {
    pages() {
      let pages = Math.ceil(this.postulantes.length / this.page_size);
      pages = [...Array(pages).keys()];
      return pages;
    },
    postulantes_page() {
      return this.postulantes.slice(
        this.page * this.page_size,
        this.page * this.page_size + this.page_size
      );
    }
  },
  methods: {
    toOption(answer) {
      return ["a", "b", "c", "d"][answer];
    },
    getScore(answers) {
      let score = 0;
      this.examen.contenido.forEach(({ correcta }, idx) => {
        if (answers[idx] != null) {
          if (correcta === answers[idx]) score += 4;
          else score -= 1;
        }
      });
      // score = Math.round(score * 100) / 100;
      score = Math.max(0, score);
      return score;
    },
    finalScore(score) {
      if (score <= 5) score = 11;
      else if (score < 11) score = 12;
      else if (score <= 13) score = 13;
      return score;
    },
    exportCSV() {
      let data = [
        [
          // "N°",
          "DNI",
          "Nombre",
          "Puntaje",
          ...[...Array(this.examen_size).keys()].map(x => x + 1)
        ]
      ];
      this.postulantes.forEach(p => {
        data.push([
          // idx + 1,
          p.dni,
          p.nombre,
          p.puntaje,
          ...[...Array(this.examen_size).keys()].map(
            x => this.toOption(p.respuestas[x]) || "-"
          )
        ]);
      });
      //
      let csvContent =
        "data:text/csv;charset=utf-8," + data.map(e => e.join(",")).join("\n");
      var encodedUri = encodeURI(csvContent);
      var link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "resultados.csv");
      document.body.appendChild(link);
      link.click();
    }
  },
  components: {
    Loading
  }
};
</script>

<style lang='scss' scoped>
.results {
  padding: 0;
  &__actions {
    display: flex;
    justify-content: flex-end;
    padding: 10px;
  }
  &__table {
    overflow-x: auto;
  }
  &__table-pages {
    overflow-x: auto;
    // justify-content: center;
    div {
      width: max-content;
      padding: 10px 16px;
      display: flex;
      align-items: center;
      .page {
        padding: 4px 8px;
        font-weight: initial;
        border-radius: 4px;
        &--selected {
          background: #0070c4;
          color: #fff;
          &:hover {
            background: #0070c4 !important;
          }
        }
        &:hover {
          background: #dbefff;
        }
      }
    }
  }
}
.correct {
  color: #fff;
  background: #2aa53f;
}
.incorrect {
  color: #fff;
  background: #c73e3e;
}
</style>