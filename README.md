# hammerspacejs
An SDK that allows game developers to hook into a platform that eases game distribution

## Usage

In your game, initialize Rebound and Client, then hook the events into a proxy callback function, or simply to a callback function as in the example:

```
var client = new Hammer.Client();
var rebound = new Hammer.Rebound();

// These events only need to be added if you are listening
// for them with .on otherwise client.on will do nothing
// with all other events
client.addEvents(['focus']);
rebound.setClient(client);

client.on('focus', proxyHandleFocus);

function proxyHandleFocus(event) {
  // Logic to handle what needs to happen when the game gets
  // focused or loses focus.

  // Typically this would be a proxy function that calls the
  // function to pause the update loop and mute audio
}

```

All callbacks can accept an event object that contains information about an event and any parameters that are passed with the event.

When trying to send an event you will want to use an authorized event added with addEvents as shown above and then dispatch this event as demonstrated below.

```
var client = new Hammer.Client();
var rebound = new Hammer.Rebound();

rebound.setClient(client);
rebound.setID('myIframeId');

// 'focus' isn't added to client events because it's not
// being listened for and has only been dispatched
client.dispatch('focus');

```
