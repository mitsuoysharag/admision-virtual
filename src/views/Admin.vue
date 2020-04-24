<template>
  <AppSidebar :links="links">
    <ExamEditor :slot="0" />
  </AppSidebar>
</template>

<script>
import AppSidebar from "@/components/AppSidebar";
import ExamEditor from "@/components/Admin/ExamEditor";

export default {
  data: () => ({
    links: [
      {
        icon: "fa fa-edit",
        text: "Editar Examen"
      }
    ]
  }),
  components: {
    AppSidebar,
    ExamEditor
  }
};
</script>

<style lang='scss' scoped>
</style>