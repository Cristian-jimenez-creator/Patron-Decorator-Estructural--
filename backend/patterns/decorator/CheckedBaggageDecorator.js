const TicketDecorator = require("./TicketDecorator");

class CheckedBaggageDecorator extends TicketDecorator {
  constructor(ticket) { super(ticket); this.cost = 70000; }
  getPrice() { return super.getPrice() + this.cost; }
  getDescription() { return super.getDescription() + " + 23 kg Checked Baggage"; }
  getServices() { return [...super.getServices(), "23 kg Checked Baggage"]; }
}
module.exports = CheckedBaggageDecorator;