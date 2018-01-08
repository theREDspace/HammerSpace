import { ReboundEvent, ReboundConfig } from './rebound.interface';
import { ClientType } from '../client/client.interface';

export class Rebound {

  /**
   * A string used to keep track of iframe id that was passed in
   * @property {String}
   * @private
   */
  private _iframeId: string;

  /**
   * An object used to keep track of the iframe element
   * @property {HTMLIFrameElement} iframe
   * @private
   */
  private _iframe: HTMLIFrameElement;

  /**
   * An object used to keep track of the proper window
   * @protected {Window} reciever
   * @private
   */
  protected _reciever: Window;

  /**
   * A boolean that tells you if you are inside the iframe or not
   * @protected {Boolean} isChild
   * @private
   */
  protected _isChild: boolean;

  /**
   * A string that contains a random id value used to tell rebound that the
   * events are still from rebound
   * @private {String} events
   * @protected
   */
  protected _randId: string;

  /**
   * An object used to keep track of the client instance
   * @property {Object} client
   * @protected
   */
  protected _client: ClientType;

  constructor(config?: ReboundConfig) {
    this._isChild = !window.frames.length;
    if (this._isChild) {
      this._randId = 'Rebound_' + (Math.random()).toString();
      this._reciever = parent;
      this.dispatch({event: 'connected', id: this._randId});
    }
    window.addEventListener('message', this._onMessage.bind(this));
  }

  /**
   * This method creates a connection with the host and starts the message listener
   * this method should be overridden in case the connect message that is recieved
   * back is in a different format other than an object. In cases where HammerSpace
   * is used with a host that is not HammerSpace.
   * @protected
   * @method connect
   */
  protected _connect() {
    if (this._isChild) {
      this.dispatch({event: 'connected', id: this._randId});
    }
    window.addEventListener('message', this._onMessage.bind(this));
  }

  /**
   * If an id is passed in and rebound in currently not in the iframe then it
   * will set the id, get the iframe context and the contentWindow while also
   * focusing the iframe
   * @private
   * @method _setID
   * @param id string that contains the id of the iframe
   */
  private _setID(id: string) {
    if (!this._isChild && typeof id !== 'undefined') {
      this._iframeId = id;
      this._iframe = (<HTMLIFrameElement> document.getElementById(id));
      this._reciever = this._iframe.contentWindow;

      this._iframe.focus();
    }
  }

  /**
   * if client is defined and has not been already set then set the client and
   * set the rebound on that instance of client
   * @private
   * @method _setClient
   * @param client object that contains reference to the current client
   */
  private _setClient(client: ClientType) {
    if (typeof client !== 'undefined' && typeof this._client === 'undefined') {
      this._client = client;
      client.setRebound(this);
    }
  }

  /**
   * if reciever is defined, a postMessage event will be sent from parent to
   * child of iframe or vise versa and will pass the specified data along with
   * it. Also if there is no random id created it will create on and pass it
   * along
   * @protected
   * @method _dispatch
   * @param event object that contains event data to be passed with event
   */
  protected _dispatch(e: ReboundEvent) {
    if (typeof this._reciever === 'undefined') {
      return;
    }

    if (!this._isChild) {
      this._reciever.focus();
    }

    if (typeof this._randId === 'undefined') {
      this._randId = 'Rebound_' + (Math.random()).toString();
    }

    e.id = this._randId;

    this._reciever.postMessage(e, '*');
  }

  /**
   * if a proper random id is set and client is also setup a dispatch event will
   * be set to client and the proper data will be passed along
   * @protected
   * @method _onMessage
   * @param e object that contains the info of a postMessage event from rebound
   */
  protected _onMessage(e: MessageEvent) {
    let data = e.data;

    if (typeof data.id === 'undefined' || typeof this._client === 'undefined') {
      return;
    }

    if (typeof this._randId === 'undefined' && data.event === 'connected') {
      this._randId = data.id;
    }

    if (data.id === this._randId) {
      this._client.dispatch(data.event, data.value, true);
    }
  }

  /**
   * Calls the private method _setID
   * @public
   * @method setID
   */
  public setID: (name: string) => void = this._setID;

  /**
   * Calls the private method _setClient
   * @public
   * @method setClient
   */
  public setClient: (name: ClientType) => void = this._setClient;

  /**
   * Calls the private method _dispatch
   * @public
   * @method dispatch
   */
  public dispatch: (name: ReboundEvent) => void = this._dispatch;

  /**
   * Calls the private method _connect
   * @public
   * @method connect
   */
  public connect: () => void = this._connect;
}
