const assert = require("assert");
const BasicTicket = require("../backend/patterns/decorator/BasicTicket");
const Checked = require("../backend/patterns/decorator/CheckedBaggageDecorator");
const CarryOn = require("../backend/patterns/decorator/CarryOnDecorator");

const flight = {origin:"Bogota",destination:"Medellin",price:180000};
let ticket = new BasicTicket(flight);
assert.strictEqual(ticket.getPrice(),180000);
ticket = new Checked(ticket);
assert.strictEqual(ticket.getPrice(),250000);
ticket = new CarryOn(ticket);
assert.strictEqual(ticket.getPrice(),290000);
console.log("✓ Decorator tests passed successfully.");