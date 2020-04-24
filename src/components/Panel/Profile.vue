<template>
  <div>
    <Loading :active="loading" />
    <div class="container" style="padding: 0">
      <div class="row no-gutters">
        <div class="col-12 col-lg-6" style="padding: 20px">
          <section class="profile card">
            <p
              class="profile__full-name"
            >{{profile.apellido_paterno}} {{profile.apellido_materno}}, {{profile.nombre}}</p>
            <section class="profile__content">
              <i class="fa fa-id-card"></i>
              <span class="profile__item">DNI:</span>
              <span class="profile__value">{{profile.dni}}</span>
              <i class="fa fa-graduation-cap"></i>
              <span class="profile__item">Cód. Postulante:</span>
              <span class="profile__value">{{profile.codigo_postulante}}</span>
            </section>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from "@/components/Loading";

import { obtenerPerfil } from "@/services/postulanteService";

export default {
  data: () => ({
    profile: {},
    loading: true
  }),
  async mounted() {
    this.profile = await obtenerPerfil();
    this.loading = false;
  },
  components: {
    Loading
  }
};
</script>

<style lang='scss' scoped>
.profile {
  padding: 28px;
  color: #313435;

  &__full-name {
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
}
</style>