(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("Hammer", [], factory);
	else if(typeof exports === 'object')
		exports["Hammer"] = factory();
	else
		root["Hammer"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(1));
__export(__webpack_require__(2));


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Client = /** @class */ (function () {
    function Client() {
        /**
         * An object used to keep track of all of the events
         * @property {Object} events
         * @private
         */
        this._events = {};
        /**
         * Calls the private method _setRebound
         * @public
         * @method setRebound
         */
        this.setRebound = this._setRebound;
        /**
         * Calls the private method _on
         * @public
         * @method on
         */
        this.on = this._on;
        /**
         * Calls the private method _off
         * @public
         * @method off
         */
        this.off = this._off;
        /**
         * Calls the private method _dispatch
         * @public
         * @method dispatch
         */
        this.dispatch = this._dispatch;
        /**
         * Calls the private method _addEvents
         * @public
         * @method addEvents
         */
        this.addEvents = this._addEvents;
        /**
         * Calls the private method _destroy
         * @public
         * @method destroy
         */
        this.destroy = this._destroy;
    }
    /**
     * If eventName is an available event, the cb function will be attached to the
     * events object to then be used at a later time
     * @private
     * @method _on
     * @param eventName string to specify what event to use
     * @param cb function to handle request returns
     */
    Client.prototype._on = function (name, cb) {
        if (typeof this._events === 'undefined') {
            return void console.error('client is destroyed');
        }
        if (typeof name !== 'string' || !this._events.hasOwnProperty(name)) {
            return void console.error('client.on was called with an invalid event name');
        }
        if (typeof this._events[name] === 'undefined') {
            this._events[name] = cb;
        }
        else {
            return void console.error('client.on was called with an event name that was already used');
        }
    };
    /**
     * If eventName is an event that is currently in the events object then it
     * will be removed and set as undefined
     * @private
     * @method _off
     * @param eventName string to specify what event to remove
     */
    Client.prototype._off = function (name) {
        if (typeof this._events === 'undefined' || typeof name === 'undefined') {
            return;
        }
        if (typeof this._events[name] !== 'undefined') {
            this._events[name] = undefined;
        }
    };
    /**
     * Set rebound to this._rebound if it is not already set
     * @private
     * @method _setRebound
     * @param rebound object that references the current copy of rebound
     */
    Client.prototype._setRebound = function (rebound) {
        if (typeof rebound !== 'undefined' && typeof this._rebound === 'undefined') {
            this._rebound = rebound;
        }
    };
    /**
     * If eventName is an event that is currently in the events object then the
     * attached cb function will be dispatched
     * @private
     * @method _dispatch
     * @param eventName string to specify what event to dispatch
     */
    Client.prototype._dispatch = function (name, data, isRebound) {
        if (typeof this._events === 'undefined') {
            return void console.error('client is destroyed');
        }
        if (typeof name !== 'string' || name === '') {
            return void console.error('client.addEvents was called with an invalid value of', name);
        }
        if (typeof this._events[name] !== 'undefined') {
            this._events[name](data);
        }
        else if (typeof this._rebound !== 'undefined' && !isRebound) {
            this._rebound.dispatch({ event: name, value: data });
        }
    };
    /**
     * If eventName is an event or array of events then they will try to be added
     * to the events Array
     * @private
     * @method _addEvent
     * @param eventName string or array of strings to specify what events to add
     */
    Client.prototype._addEvents = function (name) {
        if (typeof this._events === 'undefined') {
            return void console.error('client is destroyed');
        }
        if (Array.isArray(name)) {
            for (var i = 0; i < name.length; i++) {
                this._addToEventsArray(name[i]);
            }
        }
        else {
            this._addToEventsArray(name);
        }
    };
    /**
     * If eventName is an event that is not currently in the events object and is
     * typeof string then it will be added to the possible events
     * @private
     * @method _addToEventsArray
     * @param eventName string to specify what event to add
     */
    Client.prototype._addToEventsArray = function (name) {
        if (typeof name !== 'string' || name === '') {
            return void console.error('client.addEvents was called with an invalid value of', name);
        }
        if (!this._events.hasOwnProperty(name)) {
            this._events[name] = undefined;
        }
    };
    /**
     * Sets the events object to undefined
     * @private
     * @method _destroy
     */
    Client.prototype._destroy = function () {
        this._events = undefined;
    };
    return Client;
}());
exports.Client = Client;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Rebound = /** @class */ (function () {
    function Rebound() {
        /**
         * Calls the private method _setID
         * @public
         * @method setID
         */
        this.setID = this._setID;
        /**
         * Calls the private method _setID
         * @public
         * @method getID
         */
        this.getID = this._getID;
        /**
         * Calls the private method _setClient
         * @public
         * @method setClient
         */
        this.setClient = this._setClient;
        /**
         * Calls the private method _dispatch
         * @public
         * @method dispatch
         */
        this.dispatch = this._dispatch;
        this._isChild = window.frames.length <= 0;
        if (this._isChild) {
            this._randId = 'Rebound_' + (Math.random()).toString();
            this._reciever = parent;
            this.dispatch({ event: 'connected', id: this._randId });
        }
        window.addEventListener('message', this._onMessage.bind(this));
    }
    /**
     * returns the iframe id that was passed in
     * @private
     * @method _getID
     * @returns {string}
     */
    Rebound.prototype._getID = function () {
        return this._iframeId;
    };
    /**
     * If an id is passed in and rebound in currently not in the iframe then it
     * will set the id, get the iframe context and the contentWindow while also
     * focusing the iframe
     * @private
     * @method _setID
     * @param id string that contains the id of the iframe
     */
    Rebound.prototype._setID = function (id) {
        if (this._isChild || typeof id === 'undefined')
            return;
        this._iframeId = id;
        this._iframe = document.getElementById(id);
        this._reciever = this._iframe.contentWindow;
        this._iframe.focus();
    };
    /**
     * if client is defined and has not been already set then set the client and
     * set the rebound on that instance of client
     * @private
     * @method _setClient
     * @param client object that contains reference to the current client
     */
    Rebound.prototype._setClient = function (client) {
        if (typeof client !== 'undefined' && typeof this._client === 'undefined') {
            this._client = client;
            client.setRebound(this);
        }
    };
    /**
     * if reciever is defined, a postMessage event will be sent from parent to
     * child of iframe or vise versa and will pass the specified data along with
     * it. Also if there is no random id created it will create on and pass it
     * along
     * @private
     * @method _dispatch
     * @param event object that contains event data to be passed with event
     */
    Rebound.prototype._dispatch = function (e) {
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
    };
    /**
     * if a proper random id is set and client is also setup a dispatch event will
     * be set to client and the proper data will be passed along
     * @private
     * @method _onMessage
     * @param e object that contains the info of a postMessage event from rebound
     */
    Rebound.prototype._onMessage = function (e) {
        var data = e.data;
        if (typeof data.id === 'undefined' || typeof this._client === 'undefined') {
            return;
        }
        if (typeof this._randId === 'undefined' && data.event === 'connected') {
            this._randId = data.id;
        }
        if (data.id === this._randId) {
            this._client.dispatch(data.event, data.value, true);
        }
    };
    return Rebound;
}());
exports.Rebound = Rebound;


/***/ })
/******/ ]);
});