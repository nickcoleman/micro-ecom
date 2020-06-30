import {Publisher, Subjects, TicketCreatedEvent} from '@eticket/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
