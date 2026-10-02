const TicketComponent = require("./TicketComponent");

class BasicTicket extends TicketComponent {
  constructor(flight) {
    super();
    this.flight = flight;
  }

  getPrice() { return this.flight.price; }

  getDescription() {
    return `Basic Ticket - ${this.flight.origin} → ${this.flight.destination}`;
  }

  getServices() { return ["Personal item"]; }
}
module.exports = BasicTicket;