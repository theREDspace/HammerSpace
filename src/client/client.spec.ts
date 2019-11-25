import { Client } from './client';
import { Rebound } from '../rebound/rebound';

describe("Client:", () => {
  let client: any;
  let rebound: any;
  beforeEach(() => {
    client = new Client();
    rebound = new Rebound();

    rebound.setClient(client);
  });

  describe("the basic use of this", () => {
    it("should have created a client", () => {
      expect(client).toBeDefined();
    });

    it("should not be able to set rebound after setting client", () => {
      client._rebound._randId = 'test'
      client.setRebound();
      expect(client._rebound._randId).toBe('test');
    });

    it("should be able to set an on event", (done) => {
      client.addEvents('focus');

      client.on('focus', (data: any) => {
        expect(data).toBe(100);
        done()
      })

      expect(client._events.focus).toBeDefined();
      client._events.focus(100);
    });

    it("should not be able to set an unauthorized event", () => {
      client.on('notanevent', () => {
        expect(true).toBe(false)
      })

      expect(client._events.hasOwnProperty('notanevent')).toBe(false);
    });

    it("should not be able to set an event after destroying client", () => {
      expect(client._events).toBeDefined();

      client.destroy();

      client.on('focus', () => {});

      expect(client._events).toBe(undefined);

      client.off('focus');

      expect(client._events).toBe(undefined);
    });

    it("should be able to add a single new possible event", () => {
      expect(client._events.hasOwnProperty('testevent')).toBe(false);

      client.addEvents('testevent');

      expect(client._events.hasOwnProperty('testevent')).toBe(true);
    });

    it("should be able to add multiple new possible event", () => {
      expect(client._events.hasOwnProperty('testevent')).toBe(false);
      expect(client._events.hasOwnProperty('testevent2')).toBe(false);

      client.addEvents(['testevent', 'testevent2']);

      expect(client._events.hasOwnProperty('testevent')).toBe(true);
      expect(client._events.hasOwnProperty('testevent2')).toBe(true);
    });

    it("should only be able to add strings as new possible event", () => {
      let numOfKeysBefore = Object.keys(client._events).length;
      let eventTypes = [1, [], {}, 1.2, undefined, null, true];

      expect(client._events.hasOwnProperty('testevent')).toBe(false);

      for (let i = 0; i < eventTypes.length; i++) {
        expect(client._events.hasOwnProperty(eventTypes[i])).toBe(false);
        client.addEvents(eventTypes[i])
      }

      client.addEvents('testevent');
      expect(client._events.hasOwnProperty('testevent')).toBe(true);

      for (let i = 0; i < eventTypes.length; i++) {
        expect(client._events.hasOwnProperty(eventTypes[i])).toBe(false);
      }

      let numOfKeysAfter = Object.keys(client._events).length;
      expect(numOfKeysBefore + 1).toBe(numOfKeysAfter);
    });

    it("should not be able to overwrite a possible event", () => {
      expect(client._events.hasOwnProperty('testevent')).toBe(false);

      client.addEvents('testevent');

      expect(client._events.hasOwnProperty('testevent')).toBe(true);
      expect(client._events.testevent).toBe(undefined);

      client.on('testevent', () => {})

      expect(client._events.testevent).toBeDefined();

      client.addEvents('testevent');

      expect(client._events.testevent).toBeDefined();
    });

    it("should throw error if same event is listened to multiple times", () => {
      expect(client._events.hasOwnProperty('testevent')).toBe(false);

      client.addEvents('testevent');

      expect(client._events.hasOwnProperty('testevent')).toBe(true);
      expect(client._events.testevent).toBe(undefined);

      client.on('testevent', () => {})

      expect(client._events.testevent).toBeDefined();

      client.on('testevent', () => {
        expect(true).toBe(false)
      })

      client._events.testevent()
    });

    it("should not be able to add an empty string as a new event", () => {
      expect(client._events.hasOwnProperty('')).toBe(false);

      client.addEvents('');

      expect(client._events.hasOwnProperty('')).toBe(false);
    });

    it("should not be able to add a new event after destroying client", () => {
      expect(client._events).toBeDefined();

      client.destroy();
      client.addEvents('testevent');

      expect(client._events).toBe(undefined);
    });

    it("should be able to dispatch an event", (done) => {
      client.addEvents('focus');

      client.on('focus', (data: any) => {
        expect(data).toBe(100)
        done()
      });

      expect(client._events.focus).toBeDefined();
      client.dispatch('focus', 100);
    });

    it("should not dispatch an event if not a valid name", () => {
      client.dispatch('', 100);
      client.dispatch(undefined, 100);
    });

    it("should not be able to dispatch an event after destroying client", () => {
      client.addEvents('focus');

      expect(client._events.hasOwnProperty('focus')).toBeDefined();

      client.destroy();

      client.on('focus', (data: any) => {
        // user should never get in this function
        expect(true).toBe(false)
      });

      client.dispatch('focus');
    });

    it("should not be able to dispatch an unauthorized event", () => {
      client.on('notanevent', (data: any) => {
        expect(true).toBe(false)
      });

      client.dispatch('notanevent');
    });

    it("should be able to remove an event", () => {
      client.addEvents(['focus', 'blur']);

      client.on('blur', () => {});

      client.on('focus', () => {});

      expect(client._events.blur).toBeDefined();
      expect(client._events.focus).toBeDefined();

      client.off('focus');

      expect(client._events.blur).toBeDefined();
      expect(client._events.focus).toBe(undefined);
    });

    it("should not try to remove an event that doesnt exist", () => {
      expect(client._events.hasOwnProperty('notanevent')).toBe(false);

      client.off('notanevent');

      expect(client._events.hasOwnProperty('notanevent')).toBe(false);
    });

    it("should be able to destroy all events", () => {
      client.addEvents('focus1');
      client.addEvents(['focus2', 'focus3']);

      client.on('focus1', () => {});
      client.on('focus2', () => {});
      client.on('focus3', () => {});

      expect(client._events.focus1).toBeDefined();
      expect(client._events.focus2).toBeDefined();
      expect(client._events.focus3).toBeDefined();

      client.destroy();

      expect(client._events).toBe(undefined);
    });
  });
});
