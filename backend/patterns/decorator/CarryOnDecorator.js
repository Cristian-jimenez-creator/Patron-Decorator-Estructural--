const TicketDecorator = require("./TicketDecorator");

class CarryOnDecorator extends TicketDecorator {
  constructor(ticket) { super(ticket); this.cost = 40000; }
  getPrice() { return super.getPrice() + this.cost; }
  getDescription() { return super.getDescription() + " + Carry-on Baggage"; }
  getServices() { return [...super.getServices(), "Carry-on Baggage"]; }
}
module.exports = CarryOnDecorator;