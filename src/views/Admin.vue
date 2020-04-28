<template>
  <AppSidebar :links="links">
    <ExamEditor :slot="0" />
    <Results :slot="1" />
  </AppSidebar>
</template>

<script>
import AppSidebar from "@/components/AppSidebar";
import ExamEditor from "@/components/Admin/ExamEditor";
import Results from "@/components/Admin/Results";

export default {
  data: () => ({
    links: [
      {
        icon: "fa fa-edit",
        text: "Editar Examen"
      },
      {
        icon: "fa fa-clipboard-list",
        text: "Resultados"
      }
    ]
  }),
  components: {
    AppSidebar,
    ExamEditor,
    Results
  }
};
</script>

<style lang='scss' scoped>
</style>