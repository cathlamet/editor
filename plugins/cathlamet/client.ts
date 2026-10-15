import type ClientState from "./state/client-state";


export interface BackendAPI {
  exit (): Promise<void>;
}

export default class Client {
  state: ClientState;
  backend: BackendAPI;

  constructor (state: ClientState, backend: BackendAPI) {
    this.state = state;
    this.backend = backend;
  }

  register (dom: HTMLElement): void {
    // this.managers.scenes.register(dom);
    // this.managers.renderer.register(dom);
    // this.managers.controllers.keyboard.register();
    // this.managers.controllers.mouse.register(dom);
  }

  unregister (): void {
    // this.managers.renderer.unregister();
  }

  resize (width: number, height: number): void {
    // this.managers.renderer.handleResize(width, height);
  }

  async start (): Promise<void> {
    // await this.managers.assets.load();
    // await this.managers.renderer.configure();
    // this.managers.assets.texture.loader.detectSupport(this.managers.renderer.renderer);
    // await this.managers.scenes.configure();

    // this.state.buffers.setMain(STATUS_MAIN_TITLE, 0);

    // this.managers.renderer.renderer.setAnimationLoop((time: DOMHighResTimeStamp) => {
    //   this.managers.tick(time);
    // });
  }

}
