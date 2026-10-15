import Client from "./cathlamet/client.js";
import { ClientState } from "./cathlamet/state/client-state.js";

declare module '#app' {
  interface NuxtApp {
    $client: Client
    $state: ClientState
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $client: Client
    $state: ClientState
  }
}

export {}
