# HammerSpace
Hammerspace is an SDK that allows game to communicate to a host site through an iframe, furthermore helps facilitate distribution
of HTML5 content through an iframe. To allow a seamless and easy
communication between host and child, HammerSpace can be setup on either the host or the child, however it is also designed to be standalone and used on either side and easily integrate with any platform or library.

## Use Cases

- HammerSpace used on both the host and iframe
- HammerSpace used on the host and communicating with any application that is able to intercept messages from HammerSpace
- HammerSpace used on the iframe to receive communication from any application on the host side
- To handle communication where there are multiple iframes (web components) and distinguish the communication from each instance 

Hammerspace consists of two components:
1) Rebound
2) Client

## Rebound

Rebound is the part of HammerSpace that receives the messages, regardless if it is setup on the host or child (iframe). Rebound then relays the
message to the Client.

## Client

The Client receives the messages from Rebound and fires an assigned callback based on the name of the event and the payload data in the message.
The Client can handle as many events as required which are each assigned a callback. The Client is the part of HammerSpace that is used to
run specific logic according to events that are received from the host.

## Usage

To use hammerspace,

1) Include the HammerSpace library
1) Instantiate both of the components
```
var client = new Hammer.Client();
var rebound = new Hammer.Rebound();
```

Ensure that the `Hammer` object is available in the `Window` context.

1) Add the events that your client will be listening to
```
client.addEvents(['event']);
```

Notice the `addEvents` method allows for an array of events.

1) Tell rebound the instance of the client, the variable that you assigned your client to
```
rebound.setClient(client);
```

1) Then set the ID, which is the ID attribute of your iframe, if your iframe code is as such: `<iframe src="app.html" id="myiframe"></iframe>`
then to set your id like so:

```
rebound.setID('myiframe');
```

1) Tell the client the callback to run according to which event it receives
```
client.on('event', function(event) {
  //Do something with the event
});
```

Or pass a reference to a function

```
client.on('event', someFunction);

function someFunction(event) {
	//Do something with the event
}
```

When everything is setup properly, the block of code required to use HammerSpace when listening to one event, should look like this:

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

To send messages to either the host or the child, use the `dispatch` method that is available through the client

```
client.dispatch('event');
```

If you are using HammerSpace on both the host and the iframe, the setup is the same on both sides. If you are using HammerSpace on only one side, whether the iframe or the host, the setup is the same.
