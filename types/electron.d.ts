
export interface IElectronAPI {
  exit (): void;
}

declare global {
  interface Window {
    electronAPI: IElectronAPI;
  }
}
