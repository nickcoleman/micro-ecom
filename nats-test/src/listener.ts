import nats from 'node-nats-streaming';

import {TicketCreatedListener} from '@eticket/common/TicketCreatedListener';
import {randomBytes} from 'crypto';

console.clear();

// define nats client
const stan = nats.connect('ticketing', randomBytes(4).toString('hex'), {
  url: 'http://localhost:4222',
});

// setup connection
stan.on('connect', () => {
  console.log('Listener connected to NATS');

  stan.on('close', () => {
    console.log('NATS connection closed!');
    process.exit();
  });

  // create the ticket listner
  const listner = new TicketCreatedListener(stan);
  listner.listen();
});

process.on('SIGINT', () => stan.close());
process.on('SIGTERM', () => stan.close());
