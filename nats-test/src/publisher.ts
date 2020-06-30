import nats from 'node-nats-streaming';
import {randomBytes} from 'crypto';

import {TicketCreatedPublisher} from './events/ticket-created-publisher';

console.clear();

const connectionID = randomBytes(5).toString('hex');

const stan = nats.connect('ticketing', connectionID, {
  url: 'http://localhost:4222',
});

stan.on('connect', async () => {
  console.log('Ticket Publisher connected to NATS');
  const publisher = new TicketCreatedPublisher(stan);
  try {
    await publisher.publish({
      id: '122',
      title: 'concert',
      price: 100.3,
    });
  } catch (error) {
    console.log('Ticket Publish error', error);
  }
});
