import { Client } from '../client/client';
import { Rebound } from './rebound';

describe('Rebound:', () => {
  let client: any;
  let rebound: any;
  let testIframe: any;
  let testUrl = 'data:text/html;base64,R0lG';

  beforeEach(done => {
    testIframe = document.createElement('iframe');
    testIframe.setAttribute('id', 'testIframe');
    testIframe.setAttribute('src', testUrl);
    document.body.appendChild(testIframe);

    testIframe.onload = () => {
      client = new Client();
      rebound = new Rebound();
      done();
    };
  });

  describe('the basic use of this', () => {
    it('should have created rebound', () => {
      expect(rebound).toBeDefined();
    });

    it('should not error if the iframe id is not set', () => {
      expect(rebound._iframeId).toBe(undefined);
      rebound.setID();
      expect(rebound._iframeId).toBe(undefined);
    });

    it('should be able to set the iframe id', () => {
      expect(rebound._iframeId).toBe(undefined);
      rebound.setID('testIframe');
      expect(rebound._iframeId).toBe('testIframe');
    });

    it('should not error when recieving events without a client', () => {
      expect(rebound._randId).toBe(undefined);

      rebound.setID('testIframe');

      let randId = 'Rebound_' + Math.random().toString();
      let init = {
        data: {
          event: 'connected',
          value: 'testvalue',
          id: randId
        },
        origin: '*'
      };

      rebound._onMessage(new MessageEvent('message', init));

      expect(rebound._randId).toBe(undefined);
    });

    it('should not error when recieving events without a rebound id', () => {
      expect(rebound._randId).toBe(undefined);

      rebound.setID('testIframe');

      let init = {
        data: {
          event: 'connected',
          value: 'testvalue'
        },
        origin: '*'
      };

      rebound._onMessage(new MessageEvent('message', init));

      expect(rebound._randId).toBe(undefined);
    });

    it('should not dispatch events if ids dont match', () => {
      expect(rebound._randId).toBe(undefined);

      client.addEvents('testevent');

      rebound.setID('testIframe');
      rebound.setClient(client);

      let init = {
        data: {
          event: 'connected',
          value: 'testvalue',
          id: 'testid'
        },
        origin: '*'
      };

      rebound._onMessage(new MessageEvent('message', init));

      expect(rebound._randId).toBeDefined();

      init.data.id = 'wrongid';
      init.data.event = 'testevent';

      rebound._onMessage(new MessageEvent('message', init));
    });

    it('should set rebound id if is undefined and event is connected', () => {
      expect(rebound._randId).toBe(undefined);

      rebound.setID('testIframe');
      rebound.setClient(client);

      let init = {
        data: {
          event: 'connected',
          value: 'testvalue',
          id: 'testid'
        },
        origin: '*'
      };

      rebound._onMessage(new MessageEvent('message', init));

      expect(rebound._randId).toBe('testid');
    });

    it('should be able to handle events from child', done => {
      expect(rebound._randId).toBe(undefined);

      rebound.setID('testIframe');
      rebound.setClient(client);
      client.addEvents('connected');
      client.on('connected', (value: string) => {
        expect(value).toEqual('testvalue');
        done();
      });

      let randId = 'Rebound_' + Math.random().toString();
      let init = {
        data: {
          event: 'connected',
          value: 'testvalue',
          id: randId
        },
        origin: '*'
      };

      rebound._onMessage(new MessageEvent('message', init));

      expect(rebound._randId).toEqual(randId);
    });

    it('should not error if dispatching without client set', () => {
      expect(rebound._randId).toBe(undefined);
      rebound.setID('testIframe');
      rebound.dispatch({ event: 'connected' });
      expect(rebound._randId).toBeDefined();
    });

    it('should not dispatch without a reciever set', () => {
      expect(rebound._randId).toBe(undefined);
      rebound.dispatch({ event: 'connected' });
      expect(rebound._randId).toBe(undefined);
    });

    it('should not add client if client is not passed in', () => {
      expect(rebound._client).toBe(undefined);
      rebound.setClient();
      expect(rebound._client).toBe(undefined);
    });
  });
});
