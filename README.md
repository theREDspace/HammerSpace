<p align="center">
  <img src="https://raw.githubusercontent.com/theREDspace/HammerSpace/master/docs/assets/images/logo.png" width="400px"/>
</p>

[![Build Status](https://travis-ci.org/theREDspace/HammerSpace.svg?branch=master)](https://travis-ci.org/theREDspace/HammerSpace)
[![File Size](https://img.shields.io/github/size/theREDspace/HammerSpace/dist/hammerspace.min.js.svg)](https://raw.githubusercontent.com/theREDspace/HammerSpace/master/dist/hammerspace.min.js)
[![Coverage Status](https://coveralls.io/repos/github/theREDspace/HammerSpace/badge.svg)](https://coveralls.io/github/theREDspace/HammerSpace)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

Hammerspace abstracts the [PostMessage API](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage) and provides an easy to use API in order to handle communication between an iframe and it's parent website. Hammerspace sends and intercepts [PostMessage API](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage) calls and fires a callback assigned to a specific message.

**Why not simply use PostMessage API?**

Hammerspace provides functionality that makes handling [PostMessage API](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage) calls easier, reducing the amount of custom code that a developer would have to write. It also allows handling multiple instances of iframes and distinguishing the [PostMessage API](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage) calls.

**Where would this be useful?**

Hammerspace can be useful in distributing any HTML5 content that is embedded in an iframe. This can include but is not limited to:

- Embeddable content such as videos
- Web based games
- Rich media advertisements
- Web widgets/components

**Do I have to use Hammerspace on both the iframe and the host?**

No, Hammerspace can be used standalone to intercept [PostMessage API](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage). However, the most optimal use of Hammerspace is when it's installed on the host as well as on the iframe. Hammerspace was built with the reality that distributed HTML5 content does not have access to the host, and can therefore be integrated with any platform that is both on the host and sends PostMessage API messages.

## Use Cases

- HammerSpace used on both the host and iframe
- HammerSpace used on the host and communicating with any application that is able to intercept messages from HammerSpace
- HammerSpace used on the iframe to receive communication from any application on the host side
- To handle communication where there are multiple iframes (web components) and distinguish the communication from each instance

## Components
**Rebound**

Rebound receives PostMessage messages whether it's setup on the host or the client. Messages can be sent and received from either one.

**Client**

The Client is the part of HammerSpace that is used to run specific logic according to events that are received from the host. It receives the messages from Rebound and fires an assigned callback based on the name of the event and the payload data in the message. The Client can handle as many events as required which are each assigned a callback.

## Usage

To use hammerspace,

1) Include the HammerSpace library
2) Instantiate both of the components
```
var client = new Hammer.Client();
var rebound = new Hammer.Rebound();
```

&nbsp;&nbsp;&nbsp;&nbsp;Ensure that the `Hammer` object is available in the `Window` context.

3) Pass the client instance to rebound
```
rebound.setClient(client);
```
4) Add the events that your client will be listening to
```
client.addEvents(['event']);
```

&nbsp;&nbsp;&nbsp;&nbsp;Notice the `addEvents` method allows for an array of events.

5) Then set the ID, which is the ID attribute of your iframe, if your iframe code is as such: `<iframe src="app.html" id="myiframe"></iframe>`
then to set your id like so:

```
rebound.setID('myiframe');
```

6) Tell the client the callback to run according to which event it receives
```
client.on('event', function(event) {
  //Do something with the event
});
```

&nbsp;&nbsp;&nbsp;&nbsp;Or pass a reference to a function

```
client.on('event', someFunction);

function someFunction(event) {
	//Do something with the event
}
```

&nbsp;&nbsp;&nbsp;&nbsp;When everything is setup properly, the block of code required to use HammerSpace when listening to one event should look like this:

### Host
```
var client = new Hammer.Client();
var rebound = new Hammer.Rebound();

// These events only need to be added if you are listening
// for them with .on otherwise client.on will do nothing
// with all other events

client.addEvents(['focus']);

rebound.setClient(client);
rebound.setID('myiframe');

client.on('focus', proxyHandleFocus);

function proxyHandleFocus(event) {
  // Logic to handle what needs to happen when the game gets
  // focused or loses focus.

  // Typically this would be a proxy function that calls the
  // function to pause the update loop and mute audio
}
```

### Client
```
var client = new Hammer.Client();
var rebound = new Hammer.Rebound();

client.addEvents(['focus']);

rebound.setClient(client);

client.on('focus', proxyHandleFocus);

function proxyHandleFocus(event) {}
```

To send messages to either the host or the child, use the `dispatch` method that is available through the client

```
client.dispatch('event');
```

The setup of HammerSpace will always be the same, whether being used on both the host and iFrame, or just one of them.
