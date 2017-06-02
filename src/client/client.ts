import { ClientEvents } from './client.interface';

export class Client {
  private events: ClientEvents | undefined = {
    blur: undefined,
    focus: undefined,
    pause: undefined,
    mute: undefined,
    caption: undefined,
  };

  on(eventName: string, cb: () => void): void {
    const name = eventName.toLowerCase();

    if (typeof this.events === 'undefined' || !this.events.hasOwnProperty(name)) {
      return;
    }

    if (typeof this.events[name] === 'undefined') {
      this.events[name] = cb;
    }
  }

  off(eventName: string): void {
    const name = eventName.toLowerCase();

    if (typeof this.events === 'undefined') {
      return;
    }

    if (typeof this.events[name] !== 'undefined') {
      this.events[name] = undefined;
    }
  }

  dispatch(eventName: string): void {
    const name = eventName.toLowerCase();

    if (typeof this.events === 'undefined') {
      return;
    }

    if (typeof this.events[name] !== 'undefined') {
      this.events[name]();
    }
  }

  destroy(): void {
    this.events = undefined;
  }
}
