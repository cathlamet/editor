<template lang='pug'>
TooltipRoot
  TooltipTrigger(v-slot='{ triggerProps }' as-child)
    slot(v-bind='triggerProps')
  Teleport(to='body')
    TooltipPositioner
      TooltipContent.Content {{ content }}
</template>

<script lang='ts'>
import { Tooltip } from '@ark-ui/vue/tooltip';

export default {
  components: {
    TooltipRoot: Tooltip.Root,
    TooltipTrigger: Tooltip.Trigger,
    TooltipPositioner: Tooltip.Positioner,
    TooltipContent: Tooltip.Content
  },
  props: {
    content: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped lang="sass">
@use "~/assets/style/mixins.sass" as *;

.Content
  --arrow-background: var(--demo-bg-popover)
  --arrow-size: 10px

  position: relative
  max-width: 20rem
  z-index: calc(var(--demo-popover-z-index) + var(--layer-index, 0))
  transform-origin: var(--transform-origin)

  padding-block: 0.25rem
  padding-inline: 0.625rem

  background: var(--demo-bg-popover)
  color: var(--fg-inverted)

  border: 1px solid var(--demo-border-muted)
  border-radius: 0.25rem
  box-shadow: var(--demo-shadow-md)

  font-size: 0.75rem
  font-weight: 500
  line-height: 1.25rem

  &[data-state='open']
    animation: scale-fade-in 0.15s ease-out

  &[data-state='closed']
    animation: scale-fade-out 0.1s ease-in

.ArrowTip
  border-top: 1px solid var(--demo-border-muted)
  border-left: 1px solid var(--demo-border-muted)


</style>
