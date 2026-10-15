<template lang='pug'>
#explorer
  ClientOnly
    #explorer-search
      input(type='text' placeholder='Filter' :disabled='!hasProject')
    #explorer-container
      TreeViewRoot.Root(v-model:selected-value="selectedIds" :collection="collection")
        TreeViewTree.Tree
          MenuExplorerNodeItem(
            v-for="(node, index) in collection.rootNode.children"
            :key="node.id"
            :node="node"
            :indexPath="[index]"
          )

</template>

<script lang='ts'>
import { TreeView, createTreeCollection } from '@ark-ui/vue/tree-view';

interface TreeNode {
  id: string;
  name: string;
  type?: string;
  disabled?: boolean | Function;
  children?: TreeNode[];
}

interface ExplorerData {
  selectedIds: string[];
}

export default {
  components: {
    TreeViewRoot: TreeView.Root,
    TreeViewTree: TreeView.Tree,
  },

  data (): ExplorerData {
    return {
      selectedIds: [],
    };
  },

  computed: {
    hasProject (): boolean {
      return this.$state.project.loaded;
    },

    assetItem (): TreeNode {
      return {
        id: 'assets',
        name: 'Assets',
        type: 'assets',
        disabled: !this.hasProject,
        children: [
          {
            id: 'assets-fonts',
            name: 'Fonts',
            type: 'fonts',
            children: [
              { id: 'font-orbitron', name: 'Orbitron', type: 'font' },
              { id: 'font-tektur', name: 'Tektur', type: 'font' },
              { id: 'font-train-one', name: 'Train One', type: 'font' },
              { id: 'font-zen-dots', name: 'Zen Dots', type: 'font' }
            ]
          },
          {
            id: 'assets-materials',
            name: 'Materials',
            type: 'materials'
          },
          {
            id: 'assets-models',
            name: 'Models',
            type: 'models'
          },
          {
            id: 'assets-textures',
            name: 'Textures',
            type: 'textures'
          }
        ]
      };
    },

    scenesItem (): TreeNode {
      return {
        id: 'scenes',
        name: 'Scenes',
        type: 'scenes',
        disabled: !this.hasProject
      };
    },

    questsItem (): TreeNode {
      return {
        id: 'quests',
        name: 'Quests',
        type: 'quests',
        disabled: !this.hasProject
      };
    },

    collection () {
      return createTreeCollection<TreeNode>({
        nodeToValue: (node) => node.id,
        nodeToString: (node) => node.name,
        rootNode: {
          id: 'ROOT',
          name: '',
          children: [
            this.assetItem,
            this.scenesItem,
            this.questsItem,
          ],
        }
      });
    }
  }
}
</script>

<style scoped lang="sass">
@use "~/assets/style/mixins.sass" as *;

#explorer
  display: flex
  flex-direction: column
  gap: .25rem
  height: 100%
  width: 100%

#explorer-search
  height: 2.5rem

  input
    +retro-sunken-widget(#FFFFFF)
    height: 100%
    padding: .25rem .5rem
    width: 100%

    &:focus
      outline: 2px solid #222222
      outline-offset: 0px

#explorer-container
  +retro-sunken-widget
  box-sizing: border-box
  flex-grow: 1
  padding: 0.25rem

.Root
  color: var(--demo-neutral-fg)
  display: flex
  flex-direction: column
  gap: 0.5rem
  width: 100%

.Tree
  display: flex
  flex-direction: column
  font-size: 0.75rem
  line-height: 1rem

</style>
