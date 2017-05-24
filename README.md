# hammerspacejs
An SDK that allows game developers to hook into a platform that eases game distribution

## Usage

In your game, initialize Rebound and Client, then hook the events into a proxy callback function, or simply to a callback function as in the example:

```
include HammerClient.js
include HammerRebound.js

var client = new HammerClient();

client.on('onFocus', proxyHandleFocus);
client.on('offFocus', proxyHandleFocus);
client.on('pause', proxyHandlePause);
client.on('mute', proxyHandleMute);
client.on('subtitles', proxyShowSubtitles);

function proxyHandleFocus(event) {
  // Logic that handles what needs to happen when the game gets focus and loses focus.
  // Typically this would be a proxy function that calls the function to pause the update loop and mute audio
}

function proxyHandlePause(event) {
  // Logic that handles what needs to happen when a game is paused.
  // Typically this would be a proxy function that calls the function to pause the update loop and mute audio
}

function proxyHandleMute(event) {
  // Logic that handles what needs to happen when a game is muted
  // Typically a proxy function that calls the function to mute the audio
}

function proxyHandleSubtitles(event) {
  // Logic that handles what needs to happen when subtitles are triggered
  // Typically a proxy function that handles the displaying / not displaying the subtitle track
}

```

All callbacks can accept an event object that contains information about an event and any parameters that are passed with the event.
