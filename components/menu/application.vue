<template lang='pug'>
#application-menu
  ClientOnly

    MenuRoot(:positioning='{ placement: "bottom-start", offset: { mainAxis: 6 } }' @select='handleMenuSelect')
      MenuTrigger.Trigger
        | File
      Teleport(to='body')
        MenuPositioner.Positioner
          MenuContent.Content
            MenuItem.Item(value='NEW' disabled) New Project
            MenuItem.Item(value='OPEN') Open Project...
            MenuSeparator.Separator
            MenuItem.Item(value='CONFIGURE' :disabled='!hasProject') Configure Project...
            MenuItem.Item(value='REFRESH' :disabled='!hasProject') Refresh Assets
            MenuSeparator.Separator
            MenuItem.Item(value='SAVE' :disabled='!hasProject') Save
            MenuItem.Item(value='SAVE_AS' :disabled='!hasProject') Save As...
            MenuSeparator.Separator
            MenuItem.Item(value='PREFERENCES') Preferences...
            MenuSeparator.Separator
            MenuItem.Item(value='EXIT') Exit

</template>

<script lang='ts'>
import { Menu } from '@ark-ui/vue/menu';

import {
  AssetRegistry,
  AssetRegistryLoader,
  AssetsManifest,
  packBundle,
  loadManifest,
  loadManifestAssets,
} from 'cathlamet/bundler';

interface Manifest {
  name: string;
  handle: any;
  content: any;
}

async function getNestedDirectory (rootHandle: FileSystemDirectoryHandle, path: string): Promise<FileSystemDirectoryHandle | undefined> {
  try {
    const segments = path.split('/').filter(seg => seg.length > 0 && seg !== '.');

    let currentHandle = rootHandle;
    for (const segment of segments) {
      currentHandle = await currentHandle.getDirectoryHandle(segment, { create: false });
    }

    return currentHandle;
  }
  catch (err) {
    console.debug(err)
    return undefined;
  }
}

async function scanDirectory (directory: any, filePattern: string): Promise<Manifest[]> {
  let manifests: Manifest[] = [];
  for await (const entry of directory.values()) {
    if (entry.kind === 'file' && entry.name === filePattern) {
      const file = await entry.getFile();
      const text = await file.text();

      try {
        manifests.push({
          name: entry.name,
          handle: entry,
          content: JSON.parse(text),
        });
      }
      catch (jsonErr) {
        console.error(`Failed to parse JSON for ${entry.name}:`, jsonErr);
      }
    }
    else if (entry.kind === 'directory') {
      manifests = [...manifests, ...(await scanDirectory(entry, filePattern))];
    }
  }
  return manifests;
}

export default {
  components: {
    MenuRoot: Menu.Root,
    MenuTrigger: Menu.Trigger,
    MenuPositioner: Menu.Positioner,
    MenuSeparator: Menu.Separator,
    MenuContent: Menu.Content,
    MenuItem: Menu.Item,
  },

  computed: {
    hasProject (): boolean {
      return this.$state.project.loaded;
    },
  },

  methods: {

    async handleProjectOpen (): Promise<void> {
      if (!window.showDirectoryPicker) {
        return;
      }

      const projectDirectory = await window.showDirectoryPicker();
      if (!projectDirectory) {
        return;
      }

      const fileHandle = await projectDirectory.getFileHandle('cathlamet.config.json', { create: false });
      if (!fileHandle) {
        this.$state.interface.status = 'No project found in directory';
        return;
      }

      const projectFile = await fileHandle.getFile();
      const projectConfig = JSON.parse(await projectFile.text());
      if (!projectConfig.name.length) {
        this.$state.interface.status = 'Project configuration is missing name';
        return;
      }

      if (!projectConfig.assetPath.length) {
        this.$state.interface.status = 'Project configuration is missing assetPath';
        return;
      }

      const assetDirectory = await getNestedDirectory(projectDirectory, projectConfig.assetPath);
      if (!assetDirectory) {
        this.$state.interface.status = 'Project configuration is invalid assetPath';
        return;
      }

      this.$state.project.projectDirectory = projectDirectory;
      this.$state.project.projectName = projectConfig.name;
      this.$state.project.assetPath = projectConfig.assetPath;
      this.$state.project.assetDirectory = assetDirectory;
      this.$state.project.loaded = true;

      // const relativePathArray = await rootHandle.resolve(fileHandle);
      this.$state.interface.status = `Loaded project from ${fileHandle.name}`;
    },


    async handleMenuSelect (event: any) {
      try {
        if (event.value === 'OPEN') {
          await this.handleProjectOpen();
        }
      }
      catch (err) {
        console.error(err);
      }
    }
  }
}
</script>

<style scoped lang="sass">
@use "sass:color"

#application-menu
  border-bottom: 1px solid color.adjust(#C0C0C0, $lightness: -50%)
  box-sizing: border-box
  height: 2rem
  padding: 0.25rem
  width: 100%

.Positioner
 --y: 0

.Trigger
  display: inline-flex
  align-items: center
  justify-content: center
  gap: 0.25rem
  padding: 0 0.5rem
  font-size: 0.875rem
  font-weight: 500
  font-family: inherit
  line-height: 1.25rem
  border-radius: 0.375rem
  user-select: none
  white-space: nowrap
  transition: background 150ms, border-color 150ms, color 150ms
  background: transparent
  border: none
  color: var(--demo-neutral-fg)

  &:focus-visible
    outline: none
    outline-offset: -1px

  &:is(:disabled, [data-disabled])
    opacity: 0.5
    filter: grayscale(100%)

.Indicator
  display: inline-flex
  align-items: center
  justify-content: center

  svg
    width: 1rem
    height: 1rem

.Content
  --arrow-size: 10px
  position: relative
  display: flex
  flex-direction: column
  padding: 0.25rem
  min-width: max(var(--reference-width), 10rem)
  max-height: min(var(--available-height, 300px), 300px)
  background: var(--demo-bg-popover)
  border: 1px solid var(--demo-border-emphasized)
  border-radius: 0.375rem
  box-shadow: var(--demo-shadow-md)
  z-index: calc(var(--demo-popover-z-index) + var(--layer-index, 0))
  outline: none
  transform-origin: var(--transform-origin)

  &[data-state='open']
    animation: scale-fade-in 0.15s ease-out

  &[data-state='closed']
    animation: scale-fade-out 0.1s ease-in

.Arrow
  --arrow-background: var(--demo-bg-popover)
  --arrow-shadow-color: var(--demo-border-emphasized)
  z-index: -1

.ArrowTip
  border-top: 1px solid var(--demo-border-emphasized)
  border-left: 1px solid var(--demo-border-emphasized)

.ItemGroup
  display: flex
  flex-direction: column

  & + &
    margin-top: 0.5rem

.ItemGroupLabel
  padding: 0.375rem 0.5rem
  font-size: 0.75rem
  font-weight: 600
  color: var(--demo-neutral-emphasized)
  text-transform: uppercase
  letter-spacing: 0.025em

.Item
  display: flex
  align-items: center
  gap: 0.5rem
  min-height: 2rem
  padding-inline: 0.725rem
  font-size: 0.875rem
  line-height: 1.25rem
  border-radius: 0.25rem
  user-select: none
  outline: none
  color: var(--demo-neutral-fg)
  text-decoration: none

  &[data-highlighted]
    background: var(--demo-neutral-subtle)

  &[data-disabled]
    color: var(--demo-neutral-emphasized)
    opacity: 0.5

.TriggerItem
  display: flex
  align-items: center
  justify-content: space-between
  gap: 0.5rem
  padding: 0.5rem
  font-size: 0.875rem
  line-height: 1.25rem
  border-radius: 0.25rem
  user-select: none
  outline: none

  &[data-highlighted]
    background: var(--demo-neutral-subtle)

  &::after
    content: '›'
    font-size: 1rem
    color: var(--demo-neutral-emphasized)

.CheckboxItem, .RadioItem
  display: flex
  align-items: center
  gap: 0.5rem
  padding: 0.5rem
  font-size: 0.875rem
  line-height: 1.25rem
  border-radius: 0.25rem
  user-select: none
  outline: none

  &[data-highlighted]
    background: var(--demo-neutral-subtle)

  &[data-state='checked']
    color: var(--demo-coral-fg)

  &[data-disabled]
    color: var(--demo-neutral-emphasized)
    opacity: 0.5

.ItemText
  flex: 1
  overflow: hidden
  text-overflow: ellipsis
  white-space: nowrap

.ItemIndicator
  display: flex
  align-items: center
  justify-content: center
  color: var(--demo-coral-solid)
  flex-shrink: 0
  width: 1rem
  height: 1rem

  svg
    width: 0.875rem
    height: 0.875rem

.Separator
  height: 1px
  margin-block: 0.25rem
  border: 0
  background: var(--demo-border)
  width: 100%

</style>
