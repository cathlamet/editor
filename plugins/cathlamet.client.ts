import type { NuxtApp } from '#app'
import Client, { type BackendAPI } from "./cathlamet/client.js";
import ClientState from "./cathlamet/state/client-state.js";


const backend: BackendAPI = import.meta.client && window.electronAPI ? {
  async exit (): Promise<void> {
    await window.electronAPI.exit();
  }
} : {
  async exit (): Promise<void> {
    console.debug('Backend API exit');
  }
};

export default defineNuxtPlugin ((nuxtApp: NuxtApp) => {
  const state: ClientState = new ClientState({
    version: nuxtApp.$config.public.CLIENT_VERSION,
    development: nuxtApp.$config.public.DEVELOPMENT,
    dedicated: import.meta.client && !!window.electronAPI,
  });
  const client: Client = new Client(state, backend);

  return {
    provide: {
      state: state,
      client: client,
    }
  };
});
