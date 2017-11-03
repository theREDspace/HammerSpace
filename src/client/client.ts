import { ClientEvents } from './client.interface';
import { ReboundType } from '../rebound/rebound.interface';

export class Client {

  /**
   * An object used to keep track of all of the events
   * @property {Object} events
   * @private
   */
  private _events: ClientEvents = {};

  /**
   * An object used to keep track of the rebound instance
   * @property {Object} rebound
   * @private
   */
  private _rebound: ReboundType;

  /**
   * If eventName is an available event, the cb function will be attached to the
   * events object to then be used at a later time
   * @private
   * @method _on
   * @param eventName string to specify what event to use
   * @param cb function to handle request returns
   */
  private _on(name: string, cb: () => void): void {
    let invalidName = typeof name === 'undefined';
    let noEventsObj = typeof this._events === 'undefined';

    if (noEventsObj || invalidName || !this._events.hasOwnProperty(name)) {
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
  private _off(name: string): void {
    if (typeof this._events === 'undefined' || typeof name === 'undefined') {
      return;
    }

    if (typeof this._events[name] !== 'undefined') {
      this._events[name] = undefined;
    }
  }

  /**
   * Set rebound to this._rebound if it is not already set
   * @private
   * @method _setRebound
   * @param rebound object that references the current copy of rebound
   */
  private _setRebound(rebound: ReboundType): void {
    if (typeof rebound !== 'undefined' && typeof this._rebound === 'undefined') {
      this._rebound = rebound;
    }
  }

  /**
   * If eventName is an event that is currently in the events object then the
   * attached cb function will be dispatched
   * @private
   * @method _dispatch
   * @param eventName string to specify what event to dispatch
   */
  private _dispatch(name: string, data: object, isRebound: boolean): void {
    if (typeof this._events === 'undefined' || typeof name === 'undefined') {
      return;
    }

    if (typeof this._events[name] !== 'undefined') {
      this._events[name](data);
    } else if (typeof this._rebound !== 'undefined' && !isRebound) {
      this._rebound.dispatch({event: name, value: data});
    }
  }

  /**
   * If eventName is an event or array of events then they will try to be added
   * to the events Array
   * @private
   * @method _addEvent
   * @param eventName string or array of strings to specify what events to add
   */
  private _addEvents(name: string | string[]): void {
    if (typeof this._events === 'undefined' || typeof name === 'undefined') {
      return;
    }

    if (Array.isArray(name)) {
      for (let i = 0; i < name.length; i++) {
        this._addToEventsArray(name[i]);
      }
    } else {
      this._addToEventsArray(name);
    }
  }

  /**
   * If eventName is an event that is not currently in the events object and is
   * typeof string then it will be added to the possible events
   * @private
   * @method _addToEventsArray
   * @param eventName string to specify what event to add
   */
  private _addToEventsArray(name: string): void {
    if (typeof name !== 'string' || name === '') {
      return;
    }

    if (!this._events.hasOwnProperty(name)) {
      this._events[name] = undefined;
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
  public on: (name: string, cb: () => void) => void = this._on;

  /**
   * Calls the private method _off
   * @public
   * @method off
   */
  public off: (name: string) => void = this._off;

  /**
   * Calls the private method _setRebound
   * @public
   * @method setRebound
   */
  public setRebound: (rebound: ReboundType) => void = this._setRebound;

  /**
   * Calls the private method _dispatch
   * @public
   * @method dispatch
   */
  public dispatch: (name: string, data: object, isRebound: boolean) => void = this._dispatch;

  /**
   * Calls the private method _addEvents
   * @public
   * @method addEvents
   */
  public addEvents: (name: string) => void = this._addEvents;

  /**
   * Calls the private method _destroy
   * @public
   * @method destroy
   */
  public destroy: () => void = this._destroy;
}
