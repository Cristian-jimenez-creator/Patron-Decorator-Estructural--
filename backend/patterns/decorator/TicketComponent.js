class TicketComponent {
  getPrice() { throw new Error("getPrice() must be implemented."); }
  getDescription() { throw new Error("getDescription() must be implemented."); }
  getServices() { throw new Error("getServices() must be implemented."); }
}
module.exports = TicketComponent;