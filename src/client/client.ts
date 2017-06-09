import { ClientEvents } from './client.interface';

export class Client {

  /**
   * An object used to keep track of all of the events
   * @property {Object} events
   * @private
   */
  private _events: ClientEvents | undefined = {
    blur: undefined,
    focus: undefined,
    pause: undefined,
    mute: undefined,
    caption: undefined,
  };

  /**
   * If eventName is an available event, the cb function will be attached to the
   * events object to then be used at a later time
   * @private
   * @method _on
   * @param eventName string to specify what event to use
   * @param cb function to handle request returns
   */
  private _on(eventName: string, cb: () => void): void {
    const name = eventName.toLowerCase();

    if (typeof this._events === 'undefined' || !this._events.hasOwnProperty(name)) {
      return;
    }

    if (typeof this._events[name] === 'undefined') {
      this._events[name] = cb;
    }
  }

  /**
   * If eventName is an event that is currently in the events object then it
   * will be removed and set as undefined
   * @private
   * @method _off
   * @param eventName string to specify what event to remove
   */
  private _off(eventName: string): void {
    const name = eventName.toLowerCase();

    if (typeof this._events === 'undefined') {
      return;
    }

    if (typeof this._events[name] !== 'undefined') {
      this._events[name] = undefined;
    }
  }

  /**
   * If eventName is an event that is currently in the events object then the
   * attached cb function will be dispatched
   * @private
   * @method _dispatch
   * @param eventName string to specify what event to dispatch
   */
  private _dispatch(eventName: string): void {
    const name = eventName.toLowerCase();

    if (typeof this._events === 'undefined') {
      return;
    }

    if (typeof this._events[name] !== 'undefined') {
      this._events[name]();
    }
  }

  /**
   * Sets the events object to undefined
   * @private
   * @method _destroy
   */
  private _destroy(): void {
    this._events = undefined;
  }

  /**
   * Calls the private method _on
   * @public
   * @method on
   */
  public on: (eventName: string, cb: () => void) => void = this._on;

  /**
   * Calls the private method _off
   * @public
   * @method off
   */
  public off: (eventName: string) => void = this._off;

  /**
   * Calls the private method _dispatch
   * @public
   * @method dispatch
   */
  public dispatch: (eventName: string) => void = this._dispatch;

  /**
   * Calls the private method _destroy
   * @public
   * @method destroy
   */
  public destroy: () => void = this._destroy;
}
