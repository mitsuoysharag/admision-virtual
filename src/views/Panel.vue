<template>
  <AppSidebar :links="links">
    <Profile :slot="0" />
    <Exam :slot="1" />
  </AppSidebar>
</template>

<script>
import AppSidebar from "@/components/AppSidebar";
import Profile from "@/components/Panel/Profile";
import Exam from "@/components/Panel/Exam";

export default {
  data: () => ({
    // link: "profile"
    links: [
      {
        icon: "fa fa-user",
        text: "Mis Datos"
      },
      {
        icon: "fa fa-tasks",
        text: "Examen Virtual"
      }
    ]
  }),
  components: {
    AppSidebar,
    Profile,
    Exam
  }
};
</script>

<style lang='scss' scoped>
</style>