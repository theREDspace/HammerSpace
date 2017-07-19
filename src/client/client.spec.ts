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

    it("should be able to set an on event", () => {
      client.addEvents('focus');

      client.on('focus', () => {
        return 100;
      });

      client.on('focus', () => {
        return 200;
      });

      expect(client._events.focus).toBeDefined();
      expect(client._events.focus()).toBe(100);
    });

    it("should not be able to set an unauthorized event", () => {
      client.on('notanevent', () => {
        return 100;
      });

      expect(client._events.hasOwnProperty('notanevent')).toBe(false);
    });

    it("should not be able to set an event after destroying client", () => {
      expect(client._events).toBeDefined();

      client.destroy();

      client.on('focus', () => {
        return 100;
      });

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
        client.addEvents(eventTypes[i]);
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
      client.on('testevent', function() {});

      expect(client._events.hasOwnProperty('testevent')).toBe(true);
      expect(client._events.testevent).toBeDefined();

      client.addEvents('testevent');

      expect(client._events.testevent).toBeDefined();
    });

    it("should not be able to add an empty string as a new possible event", () => {
      expect(client._events.hasOwnProperty('')).toBe(false);

      client.addEvents('');

      expect(client._events.hasOwnProperty('')).toBe(false);
    });

    it("should not be able to add a new possible event after destroying client", () => {
      expect(client._events).toBeDefined();

      client.destroy();
      client.addEvents('testevent');

      expect(client._events).toBe(undefined);
    });

    it("should be able to dispatch an event", () => {
      client.addEvents('focus');

      client.on('focus', () => {
        return 100;
      });

      expect(client._events.focus).toBeDefined();
      client.dispatch('focus');
    });

    it("should not error when not able to dispatch an event", () => {
      client.dispatch('focus', undefined, true);
    });

    it("should not be able to dispatch an event after destroying client", () => {
      expect(client._events).toBeDefined();

      client.destroy();

      client.on('focus', () => {
        return 100;
      });

      client.dispatch('focus');

      expect(client._events).toBe(undefined);
    });

    it("should not be able to dispatch an unauthorized event", () => {
      client.on('notanevent', () => {
        return 100;
      });

      expect(client._events.hasOwnProperty('notanevent')).toBe(false);
      client.dispatch('notanevent');
    });

    it("should be able to remove an event", () => {
      client.addEvents(['focus', 'blur']);

      client.on('blur', () => {
        return 100;
      });

      client.on('focus', () => {
        return 100;
      });

      expect(client._events.blur).toBeDefined();
      expect(client._events.focus).toBeDefined();

      client.off('focus');

      expect(client._events.blur).toBeDefined();
      expect(client._events.focus).toBe(undefined);
    });

    it("should not try to remove an event that doesnt exist", () => {
      client.off('notanevent');

      expect(client._events.hasOwnProperty('notanevent')).toBe(false);
    });

    it("should be able to destroy all events", () => {
      client.addEvents('focus');

      client.on('focus', () => {
        return 100;
      });

      expect(client._events.focus).toBeDefined();

      client.destroy();

      expect(client._events).toBe(undefined);
    });
  });
});
