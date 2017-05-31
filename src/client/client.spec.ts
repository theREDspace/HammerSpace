import { Client } from './client';

describe("Client:", () => {
  let client: any;

  beforeEach(() => {
    client = new Client();
  });

  describe("the basic use of this", () => { 
    it("should have created a client", () => {
      expect(client).toBeDefined();
      expect(client.clientEvents.focus).toBe(undefined);
    });

    it("should be able to set an on event", () => {
      client.on('focus', () => {
        return 100;
      });

      client.on('focus', () => {
        return 200;
      });

      expect(client.clientEvents.focus).toBeDefined();
      expect(client.clientEvents.focus()).toBe(100);
    });

    it("should be able to dispatch an event", () => {
      client.dispatch('focus');
      
      client.on('focus', () => {
        return 100;
      });

      expect(client.clientEvents.focus).toBeDefined();
      client.dispatch('focus');
    });

    it("should be able to remove an event", () => {     
      client.off('focus');
      
      client.on('blur', () => {
        return 100;
      });

      client.on('focus', () => {
        return 100;
      });

      expect(client.clientEvents.blur).toBeDefined();
      expect(client.clientEvents.focus).toBeDefined();

      client.off('focus');
 
      expect(client.clientEvents.blur).toBeDefined();
      expect(client.clientEvents.focus).toBe(undefined);
    });

    it("should be able to destroy all events", () => {    
      client.on('focus', () => {
        return 100;
      });

      expect(client.clientEvents.focus).toBeDefined();

      client.destroy();

      expect(client.clientEvents).toBe(undefined);
    });
  });
});