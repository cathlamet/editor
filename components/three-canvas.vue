<template>
  <div id='container-render'>
    <div id='container-render-screen' ref='renderer'></div>
  </div>
</template>

<script lang='ts'>
let sizeObserver: ResizeObserver | undefined = undefined;

export default {
  mounted () {
    const dom = this.$refs.renderer as HTMLElement;
    sizeObserver = new ResizeObserver(() => {
      this.$client.resize(dom.offsetWidth, dom.offsetHeight);
    });
    sizeObserver.observe(dom);
    this.$client.register(dom);
  },
  unmounted () {
    if (this.$refs.renderer instanceof Element) {
      sizeObserver?.unobserve(this.$refs.renderer as Element);
    }
    this.$client.unregister();
  }
}
</script>

<style scoped>
#container-render {
  flex-grow: 1;
  position: relative;
  touch-action: none;
  user-select: none;
  z-index: 100;
}

#container-render-screen {
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  touch-action: none;
  user-select: none;
  width: 100%;
}
</style>
