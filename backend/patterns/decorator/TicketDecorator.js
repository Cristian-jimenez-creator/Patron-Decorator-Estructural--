const TicketComponent = require("./TicketComponent");

class TicketDecorator extends TicketComponent {
  constructor(ticket) {
    super();
    this.ticket = ticket;
  }

  getPrice() { return this.ticket.getPrice(); }
  getDescription() { return this.ticket.getDescription(); }
  getServices() { return this.ticket.getServices(); }
}
module.exports = TicketDecorator;