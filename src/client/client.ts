import { ClientEvents } from './client.interface';

export class Client {
  private clientEvents: ClientEvents | undefined = {
    blur: undefined,
    focus: undefined,
    pause: undefined,
    mute: undefined,
    caption: undefined,
  };

  on(eventName: string, cb: () => void): void {
    const name = eventName.toLowerCase();

    if (typeof this.clientEvents[name] === 'undefined') {
      this.clientEvents[name] = cb;
    }
  }

  off(eventName: string): void {
    const name = eventName.toLowerCase();

    if (typeof this.clientEvents[name] !== 'undefined') {
      this.clientEvents[name] = undefined;
    }
  }

  dispatch(eventName: string): void {
    const name = eventName.toLowerCase();

    if (typeof this.clientEvents[name] !== 'undefined') {
      this.clientEvents[name]();
    }
  }

  destroy(): void {
    this.clientEvents = undefined;
  }
}
