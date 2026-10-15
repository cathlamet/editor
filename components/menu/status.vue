<template lang='pug'>
#status
  ClientOnly
    | {{ statusText }}

</template>

<script lang='ts'>
import { ToggleGroup } from '@ark-ui/vue/toggle-group'

export default {
  components: {
    ToggleGroupRoot: ToggleGroup.Root,
    ToggleGroupItem: ToggleGroup.Item,
  },

  data () {
    return {
      renderMode: ['GAME']
    }
  },

  computed: {
    statusText (): string {
      return this.$state.interface.status;
    }
  }
}
</script>

<style scoped lang="sass">
@use "~/assets/style/mixins.sass" as *;

#status
  +retro-sunken-widget
  box-sizing: border-box
  color: #222
  font-size: .875rem
  height: 1.5rem
  padding: 0.25rem
  width: 100%

</style>
