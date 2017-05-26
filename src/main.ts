import * as Hammer from './hammerspace';

let client = new Hammer.Client;

client.on('focus', () => {
  console.log('focus');
});

client.dispatch('focus');
