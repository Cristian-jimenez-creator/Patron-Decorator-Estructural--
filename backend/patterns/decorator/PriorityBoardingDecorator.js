const TicketDecorator = require("./TicketDecorator");

class PriorityBoardingDecorator extends TicketDecorator {
  constructor(ticket) { super(ticket); this.cost = 30000; }
  getPrice() { return super.getPrice() + this.cost; }
  getDescription() { return super.getDescription() + " + Priority Boarding"; }
  getServices() { return [...super.getServices(), "Priority Boarding"]; }
}
module.exports = PriorityBoardingDecorator;