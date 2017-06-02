import { Client } from './client';

describe("Client:", () => {
  let client: any;

  beforeEach(() => {
    client = new Client();
  });

  describe("the basic use of this", () => { 
    it("should have created a client", () => {
      expect(client).toBeDefined();
      expect(client.events.focus).toBe(undefined);
    });

    it("should be able to set an on event", () => {
      client.on('focus', () => {
        return 100;
      });

      client.on('focus', () => {
        return 200;
      });

      expect(client.events.focus).toBeDefined();
      expect(client.events.focus()).toBe(100);
    });

    it("should not be able to set an unauthorized event", () => {    
      client.on('notanevent', () => {
        return 100;
      });

      expect(client.events.hasOwnProperty('notanevent')).toBe(false);
    });

    it("should not be able to set an event after destroying client", () => {    
      client.destroy();
      
      client.on('focus', () => {
        return 100;
      });

      client.off('focus');

      expect(client.events).toBe(undefined);
    });

    it("should be able to dispatch an event", () => {   
      client.on('focus', () => {
        return 100;
      });

      expect(client.events.focus).toBeDefined();
      client.dispatch('focus');
    });

    it("should not be able to dispatch an event after destroying client", () => {    
      client.destroy();
      
      client.on('focus', () => {
        return 100;
      });

      client.dispatch('focus');

      expect(client.events).toBe(undefined);
    });

    it("should not be able to dispatch an unauthorized event", () => {   
      client.on('notanevent', () => {
        return 100;
      });

      expect(client.events.hasOwnProperty('notanevent')).toBe(false);
      client.dispatch('notanevent');
    });

    it("should be able to remove an event", () => {       
      client.on('blur', () => {
        return 100;
      });

      client.on('focus', () => {
        return 100;
      });

      expect(client.events.blur).toBeDefined();
      expect(client.events.focus).toBeDefined();

      client.off('focus');
 
      expect(client.events.blur).toBeDefined();
      expect(client.events.focus).toBe(undefined);
    });

    it("should not try to remove an event that doesnt exist", () => {     
      client.off('notanevent');
 
      expect(client.events.hasOwnProperty('notanevent')).toBe(false);
    });

    it("should be able to destroy all events", () => {    
      client.on('focus', () => {
        return 100;
      });

      expect(client.events.focus).toBeDefined();

      client.destroy();

      expect(client.events).toBe(undefined);
    });
  });
});