<template lang='pug'>
#renderer-main
  ClientOnly

</template>

<script lang='ts'>

export default {
  computed: {
  }
}
</script>

<style scoped lang="sass">
@use "~/assets/style/mixins.sass" as *;

#renderer-main
  +retro-sunken-widget(#000000)
  box-sizing: border-box
  display: inline-block
  flex-grow: 1
  padding: 0.25rem
  width: 100%

</style>
