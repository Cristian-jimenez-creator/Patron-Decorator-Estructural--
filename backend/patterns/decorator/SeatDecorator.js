const TicketDecorator = require("./TicketDecorator");

class SeatDecorator extends TicketDecorator {
  constructor(ticket) { super(ticket); this.cost = 25000; }
  getPrice() { return super.getPrice() + this.cost; }
  getDescription() { return super.getDescription() + " + Seat Selection"; }
  getServices() { return [...super.getServices(), "Seat Selection"]; }
}
module.exports = SeatDecorator;