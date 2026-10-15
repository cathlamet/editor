<template lang='pug'>
#toolbar
  ClientOnly
    ToggleGroupRoot.Root(v-model='renderMode' :deselectable='false' :disabled='!hasProject')
      TooltipRoot
        ToggleGroupItem.Item(value='GAME')
          TooltipTrigger.Trigger(as-child)
            VideoIcon
        Teleport(to='body')
          TooltipPositioner
            TooltipContent.Content Game Mode
      TooltipRoot
        ToggleGroupItem.Item(value='EDIT')
          TooltipTrigger.Trigger(as-child)
            HammerIcon
        Teleport(to='body')
          TooltipPositioner
            TooltipContent.Content Edit Mode
      TooltipRoot
        ToggleGroupItem.Item(value='DEBUG')
          TooltipTrigger.Trigger(as-child)
            BugIcon
        Teleport(to='body')
          TooltipPositioner
            TooltipContent.Content Debug Mode

    ToggleGroupRoot.Root(v-model='viewModes' multiple :disabled='!hasProject')
      TooltipRoot
        ToggleGroupItem.Item(value='AXIS')
          TooltipTrigger.Trigger(as-child)
            Axis3DIcon
        Teleport(to='body')
          TooltipPositioner
            TooltipContent.Content Show Axis
      TooltipRoot
        ToggleGroupItem.Item(value='BOUNDING_BOX')
          TooltipTrigger.Trigger(as-child)
            ScanBoxIcon
        Teleport(to='body')
          TooltipPositioner
            TooltipContent.Content Show Bounding Box
      TooltipRoot
        ToggleGroupItem.Item(value='WIREFRAME')
          TooltipTrigger.Trigger(as-child)
            VectorPolygonIcon
        Teleport(to='body')
          TooltipPositioner
            TooltipContent.Content Show Wireframe

    ToggleGroupRoot.Root(:default-value='editMode' :disabled='!hasProject')
      TooltipRoot
        ToggleGroupItem.Item(value='SELECT')
          TooltipTrigger.Trigger(as-child)
            MousePointer2Icon
        Teleport(to='body')
          TooltipPositioner
            TooltipContent.Content Select Mode
      TooltipRoot
        ToggleGroupItem.Item(value='TRANSLATE')
          TooltipTrigger.Trigger(as-child)
            HandIcon
        Teleport(to='body')
          TooltipPositioner
            TooltipContent.Content Translate
      TooltipRoot
        ToggleGroupItem.Item(value='ROTATE')
          TooltipTrigger.Trigger(as-child)
            Rotate3DIcon
        Teleport(to='body')
          TooltipPositioner
            TooltipContent.Content Rotate

    div
    TooltipRoot
      TooltipTrigger.ButtonTrigger
        button.button(:disabled='!hasProject || !isEditing')
          Grid3x2Icon
      Teleport(to='body')
        TooltipPositioner
          TooltipContent.Content Add Plane
    TooltipRoot
      TooltipTrigger.ButtonTrigger
        button.button(:disabled='!hasProject || !isEditing')
          BoxIcon
      Teleport(to='body')
        TooltipPositioner
          TooltipContent.Content Add Box
    TooltipRoot
      TooltipTrigger.ButtonTrigger
        button.button(:disabled='!hasProject || !isEditing')
          LeafIcon
      Teleport(to='body')
        TooltipPositioner
          TooltipContent.Content Add Organic
    TooltipRoot
      TooltipTrigger.ButtonTrigger
        button.button(:disabled='!hasProject || !isEditing')
          StoneIcon
      Teleport(to='body')
        TooltipPositioner
          TooltipContent.Content Add Static

    div
    TooltipRoot
      TooltipTrigger.ButtonTrigger
        button.button(:disabled='!hasProject || !isEditing')
          UserPlusIcon
      Teleport(to='body')
        TooltipPositioner
          TooltipContent.Content Add Spawn
    TooltipRoot
      TooltipTrigger.ButtonTrigger
        button.button(:disabled='!hasProject || !isEditing')
          TramFrontIcon
      Teleport(to='body')
        TooltipPositioner
          TooltipContent.Content Add Transport
    TooltipRoot
      TooltipTrigger.ButtonTrigger
        button.button(:disabled='!hasProject || !isEditing')
          UtilityPoleIcon
      Teleport(to='body')
        TooltipPositioner
          TooltipContent.Content Add Utility

    div
    TooltipRoot
      TooltipTrigger.ButtonTrigger
        button.button(:disabled='!hasProject || !isEditing')
          WaypointsIcon
      Teleport(to='body')
        TooltipPositioner
          TooltipContent.Content Add Path
    TooltipRoot
      TooltipTrigger.ButtonTrigger
        button.button(:disabled='!hasProject || !isEditing')
          LandPlotIcon
      Teleport(to='body')
        TooltipPositioner
          TooltipContent.Content Add POI

</template>

<script lang='ts'>
import { ToggleGroup } from '@ark-ui/vue/toggle-group';
import { Tooltip } from '@ark-ui/vue/tooltip';
import {
  Axis3DIcon,
  BoxIcon,
  BugIcon,
  Grid3x2Icon,
  HammerIcon,
  HandIcon,
  LandPlotIcon,
  LeafIcon,
  MousePointer2Icon,
  Rotate3DIcon,
  ScanBoxIcon,
  StoneIcon,
  TramFrontIcon,
  UserPlusIcon,
  UtilityPoleIcon,
  VectorPolygonIcon,
  VideoIcon,
  WaypointsIcon,
} from '@lucide/vue';

export default {
  components: {
    ToggleGroupRoot: ToggleGroup.Root,
    ToggleGroupItem: ToggleGroup.Item,
    TooltipRoot: Tooltip.Root,
    TooltipTrigger: Tooltip.Trigger,
    TooltipPositioner: Tooltip.Positioner,
    TooltipContent: Tooltip.Content,
    VideoIcon,
    HammerIcon,
    BugIcon,
    ScanBoxIcon,
    StoneIcon,
    Axis3DIcon,
    VectorPolygonIcon,
    LeafIcon,
    MousePointer2Icon,
    HandIcon,
    Rotate3DIcon,
    BoxIcon,
    Grid3x2Icon,
    LandPlotIcon,
    UserPlusIcon,
    UtilityPoleIcon,
    TramFrontIcon,
    WaypointsIcon,
  },

  data () {
    return {
      editMode: ['SELECT']
    }
  },

  computed: {
    renderMode: {
      get (): string[] {
        return this.$state.interface.renderMode;
      },
      set (values: string[]): void {
        this.$state.interface.renderMode = values[0];
      }
    },
    viewModes: {
      get (): string[] {
        return [
          ...(this.$state.interface.viewAxis ? ['AXIS'] : []),
          ...(this.$state.interface.viewBoundingBox ? ['BOUNDING_BOX'] : []),
          ...(this.$state.interface.viewWireframe ? ['WIREFRAME'] : []),
        ];
      },
      set (values: string[]): void {
        this.$state.interface.viewAxis = values.includes('AXIS');
        this.$state.interface.viewBoundingBox = values.includes('BOUNDING_BOX');
        this.$state.interface.viewWireframe = values.includes('WIREFRAME');
      }
    },

    hasProject (): boolean {
      return this.$state.project.loaded;
    },

    isEditing (): boolean {
      return new Set(this.renderMode).has('EDIT');
    }
  }
}
</script>

<style scoped lang="sass">
@use "~/assets/style/mixins.sass" as *;

#toolbar
  box-sizing: border-box
  display: flex
  flex-direction: row
  gap: .25rem
  height: 2.5rem
  width: 100%

.extra-left-margin
  margin-left: .5rem

.ButtonTrigger
  background: transparent
  border: 0
  height: calc(2rem - 2px)
  margin: .25rem 0
  width: calc(2rem - 2px)

button
  &.button
    +retro-raised-widget
    align-items: center
    display: inline-flex
    height: calc(2rem - 2px)
    justify-content: center
    width: calc(2rem - 2px)

    &:active
      &:not([disabled])
        +retro-sunken-widget

        & svg
          margin-top: 3px

    &[disabled]
      +retro-raised-widget-disabled
      cursor: not-allowed

    & svg
      height: 1rem
      width: 1rem


.Root
  +retro-sunken-widget
  align-items: center
  display: inline-flex
  gap: .125rem
  padding: .25rem

.Item
  display: inline-flex
  align-items: center
  justify-content: center
  gap: 0.5rem
  width: calc(2rem - 2px)
  height: calc(2rem - 2px)
  font-size: 1rem
  font-weight: 500
  font-family: inherit
  line-height: 2rem
  border-radius: 0.25rem
  user-select: none
  white-space: nowrap
  border: none
  background: transparent
  color: var(--demo-neutral-fg)

  & svg
    height: 1rem
    margin-top: 4px
    width: 1rem

  &:hover:not(:disabled, [data-disabled])
    background: var(--demo-neutral-subtle)

  &[data-state='on']
    background: var(--demo-neutral-subtle)
    color: var(--demo-neutral-fg)
    box-shadow: var(--demo-shadow-xs)

  &:focus-visible
    outline: 2px solid var(--demo-coral-focus-ring)
    outline-offset: -1px
    z-index: 1

  &:is(:disabled, [data-disabled])
    opacity: 0.5
    cursor: not-allowed

.Trigger
  &:focus
    outline: none


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
