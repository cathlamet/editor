import InterfaceState from "./interface-state";
import ProjectState from "./project-state";

export class ClientStateOptions {
  version?: string;
  development?: boolean;
  dedicated?: boolean;
}

export default class ClientState {

  readonly version: string;
  readonly development: boolean;

  /**
   * Flag indicating whether running in dedicated application
   */
  readonly dedicated: boolean;

  interface: InterfaceState = reactive(new InterfaceState());
  project: ProjectState = reactive(new ProjectState());

  constructor (options?: ClientStateOptions) {
    this.version = options?.version ?? '0.0.0';
    this.development = options?.development ?? false;
    this.dedicated = options?.dedicated ?? false;
  }

}
