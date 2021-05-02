<template>
  <div id="app">
    <module-table/>
  </div>
</template>

<script>
import ModuleTable from "@/components/ModuleTable";
export default {
  components: {ModuleTable}
}
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

.module__inner-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.container {
  max-width: 1230px;
  margin: 0 auto;
  padding: 0 15px;
}

body {
  box-sizing: border-box;
}

</style>
