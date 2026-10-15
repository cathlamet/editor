<template lang='pug'>
TreeViewNodeProvider(:node="node" :indexPath="indexPath")
  TreeViewNodeContext(v-slot="nodeState")
    template(v-if='node.children && node.children.length || isPrimary')
      TreeViewBranch.Branch
        TreeViewBranchControl.BranchControl(:class="{ 'is-disabled': nodeState.disabled }")
          TreeViewBranchIndicator.BranchIndicator
            ChevronRight
          TreeViewBranchText.BranchText
            template(v-if='node.type === "assets" || node.type === "quests" || node.type === "scenes"')
              PackageOpen(v-if="nodeState.expanded")
              Package(v-else)
            template(v-else-if='node.type === "fonts"')
              CaseSensitiveIcon(style='margin-top: 1px')
            template(v-else-if='node.type === "materials"')
              PaletteIcon
            template(v-else-if='node.type === "models"')
              CuboidIcon
            template(v-else-if='node.type === "textures"')
              ImageIcon
            template(v-else)
              FolderOpen(v-if="nodeState.expanded")
              Folder(v-else)
            | {{ node.name }}
        TreeViewBranchContent.BranchContent
          TreeViewBranchIndentGuide.BranchIndentGuide
          MenuExplorerNodeItem(
            v-for="(child, index) in (node.children ?? [])"
            :key="child.id"
            :node="child"
            :indexPath="[...indexPath, index]"
          )
    template(v-else)
        TreeViewItem.Item(:class="{ 'is-disabled': nodeState.disabled }")
          TreeViewItemText.ItemText
            template(v-if='node.type === "font"')
              FileTypeIcon
            template(v-else)
              File
            |  {{ node.name }}
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import { TreeView } from '@ark-ui/vue/tree-view';
import { BoxIcon, CaseSensitiveIcon, ChevronRight, CuboidIcon, File, FileTypeIcon, Folder, FolderOpen, ImageIcon, Package, PackageOpen, PaletteIcon } from '@lucide/vue';

interface Node {
  id: string;
  name: string;
  type?: string;
  children?: Node[];
}

const PRIMARY_TYPES = new Set<string>(["assets", "fonts", "materials", "models", "quests", "textures", "scenes"]);

export default defineComponent({
  name: 'ExplorerNodeItem',

  components: {
    TreeViewNodeProvider: TreeView.NodeProvider,
    TreeViewNodeContext: TreeView.NodeContext,
    TreeViewBranch: TreeView.Branch,
    TreeViewBranchControl: TreeView.BranchControl,
    TreeViewBranchIndicator: TreeView.BranchIndicator,
    TreeViewBranchText: TreeView.BranchText,
    TreeViewBranchContent: TreeView.BranchContent,
    TreeViewBranchIndentGuide: TreeView.BranchIndentGuide,
    TreeViewItem: TreeView.Item,
    TreeViewItemText: TreeView.ItemText,
    BoxIcon,
    CaseSensitiveIcon,
    ChevronRight,
    CuboidIcon,
    File,
    FileTypeIcon,
    Folder,
    FolderOpen,
    ImageIcon,
    Package,
    PackageOpen,
    PaletteIcon,
  },

  props: {
    node: {
      type: Object as PropType<Node>,
      required: true
    },
    indexPath: {
      type: Array as PropType<number[]>,
      required: true
    }
  },

  computed: {
    hasProject (): boolean {
      return this.$state.project.loaded;
    },

    isPrimary (): boolean {
      return !!this.node.type && PRIMARY_TYPES.has(this.node.type);
    }
  }
})
</script>

<style scoped lang='sass'>

$tree-item-gap: 0.25rem
$tree-indentation: 0.5rem
$tree-padding-inline: 0.25rem
$tree-padding-block: 0.375rem
$tree-icon-size: 0.75rem

.Tree
  svg
    width: $tree-icon-size
    height: $tree-icon-size
    flex-shrink: 0

.Branch
  position: relative

.BranchControl
  display: flex
  align-items: center
  gap: $tree-item-gap
  border-radius: 0.375rem
  user-select: none
  position: relative
  cursor: pointer
  width: 100%
  border: none
  background: transparent
  font: inherit
  color: var(--demo-neutral-fg)
  text-align: start
  --tree-depth: calc(var(--depth) - 1)
  --tree-indentation-offset: calc(#{$tree-indentation} * var(--tree-depth))
  --tree-icon-offset: calc(#{$tree-icon-size} * var(--tree-depth) * 0.5)
  --tree-offset: calc(#{$tree-padding-inline} + var(--tree-indentation-offset) + var(--tree-icon-offset))
  padding-inline-start: var(--tree-offset)
  padding-inline-end: $tree-padding-inline
  padding-block: $tree-padding-block

  &:hover
    background: var(--demo-neutral-subtle)

  &:focus-visible
    outline: 2px solid var(--demo-coral-focus-ring)
    outline-offset: -2px

  &[data-selected]
    background: var(--demo-neutral-subtle)
    color: var(--demo-neutral-fg)

  &[data-disabled]
    background: transparent
    opacity: 0.5
    filter: grayscale(100%)
    cursor: not-allowed

.BranchContent
  position: relative

  &[data-state='open']
    animation: expand-height 150ms ease-out, fade-in 150ms ease-out

  &[data-state='closed']
    animation: collapse-height 150ms ease-out, fade-out 150ms ease-out

  [data-animate='false'] &[data-state]
    animation: none

.BranchIndentGuide
  height: 100%
  width: 1px
  background: var(--demo-border)
  position: absolute
  z-index: 1
  --tree-depth: calc(var(--depth) - 1)
  --tree-indentation-offset: calc(#{$tree-indentation} * var(--tree-depth))
  --tree-offset: calc(#{$tree-padding-inline} + var(--tree-indentation-offset))
  --tree-icon-offset: calc(#{$tree-icon-size} * 0.5 * var(--depth))
  inset-inline-start: calc(var(--tree-offset) + var(--tree-icon-offset))

.BranchIndicator
  display: inline-flex
  align-items: center
  justify-content: center
  color: var(--demo-neutral-emphasized)
  transform-origin: center
  transition: transform 150ms ease

  &[data-state='open']
    transform: rotate(90deg)

  svg
    width: 0.875rem
    height: 0.875rem

.Loader
  animation: spin 1s infinite

.BranchTrigger
  display: inline-flex
  align-items: center
  justify-content: center

.BranchText
  flex: 1
  display: inline-flex
  align-items: center
  gap: $tree-item-gap
  overflow: hidden
  text-overflow: ellipsis
  white-space: nowrap

.Item
  display: flex
  align-items: center
  gap: $tree-item-gap
  border-radius: 0.375rem
  user-select: none
  position: relative
  cursor: pointer
  width: 100%
  border: none
  background: transparent
  font: inherit
  color: var(--demo-neutral-fg-muted)
  text-align: start
  text-decoration: none
  --tree-depth: calc(var(--depth) - 1)
  --tree-indentation-offset: calc(#{$tree-indentation} * var(--tree-depth))
  --tree-icon-offset: calc(#{$tree-icon-size} * var(--tree-depth) * 0.5)
  --tree-offset: calc(#{$tree-padding-inline} + var(--tree-indentation-offset) + var(--tree-icon-offset))
  padding-inline-start: var(--tree-offset)
  padding-inline-end: $tree-padding-inline
  padding-block: $tree-padding-block

  &:hover
    background: var(--demo-neutral-subtle)

  &:focus-visible
    outline: 2px solid var(--demo-coral-focus-ring)
    outline-offset: -2px

  &[data-selected]
    background: var(--demo-neutral-subtle)
    color: var(--demo-neutral-fg)
    font-weight: 500

  &[data-disabled]
    background: transparent
    opacity: 0.5
    filter: grayscale(100%)
    cursor: not-allowed

.ItemIndicator
  display: flex
  align-items: center
  justify-content: center
  color: var(--demo-coral-solid)
  flex-shrink: 0

  svg
    width: 0.875rem
    height: 0.875rem

.ItemText
  flex: 1
  display: inline-flex
  align-items: center
  gap: $tree-item-gap
  overflow: hidden
  text-overflow: ellipsis
  white-space: nowrap
</style>