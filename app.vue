<template lang="pug">
#application
  menu-application
  .body
    .left-panel
      menu-explorer
      menu-actions
    .main-panel
      menu-toolbar
      renderer-main
      menu-status
    .right-panel

</template>

<script lang="ts">
import { onErrorCaptured } from 'vue';
import { useHead } from 'nuxt/app';

export default {
  setup () {
    onErrorCaptured((err, _instance, _info) => {
      console.error(err)
      return false;
    });

    useHead({
      title: 'Cathlamet Editor',
      meta: [
        { name: 'description', content: '' }
      ]
    });
  },

  async mounted () {
    // if (this.$client) {
    //   await this.$client.start();
    // }
  }
}
</script>


<style scoped lang="sass">
#application
  display: flex
  flex-direction: column
  height: 100%
  position: relative
  width: 100%

  .body
    align-items: stretch
    display: flex
    flex-direction: row
    flex-grow: 1

.left-panel
  display: flex
  flex-direction: column
  padding: .25rem
  width: 20rem

.main-panel
  display: flex
  flex-direction: column
  flex-grow: 1
  gap: .25rem
  padding: .25rem 0

.right-panel
  padding: .25rem
  width: 30rem
</style>