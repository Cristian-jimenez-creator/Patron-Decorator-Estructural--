const express = require("express");
const router = express.Router();

const BasicTicket = require("../patterns/decorator/BasicTicket");
const CheckedBaggageDecorator = require("../patterns/decorator/CheckedBaggageDecorator");
const CarryOnDecorator = require("../patterns/decorator/CarryOnDecorator");
const SeatDecorator = require("../patterns/decorator/SeatDecorator");
const PriorityBoardingDecorator = require("../patterns/decorator/PriorityBoardingDecorator");

const flights = [
  { id: "LC101", origin: "Bogota", destination: "Medellin", date: "Oct 15, 2026", time: "07:30", duration: "1h 05m", price: 180000 },
  { id: "LC202", origin: "Bogota", destination: "Cartagena", date: "Oct 16, 2026", time: "10:15", duration: "1h 25m", price: 220000 },
  { id: "LC303", origin: "Cali", destination: "Bogota", date: "Oct 17, 2026", time: "14:40", duration: "1h 10m", price: 165000 }
];

router.get("/flights", (req, res) => res.json(flights));

function buildTicket(flight, services) {
  let ticket = new BasicTicket(flight);
  if (services.includes("checked")) ticket = new CheckedBaggageDecorator(ticket);
  if (services.includes("carryon")) ticket = new CarryOnDecorator(ticket);
  if (services.includes("seat")) ticket = new SeatDecorator(ticket);
  if (services.includes("priority")) ticket = new PriorityBoardingDecorator(ticket);
  return ticket;
}

router.post("/reservations", (req, res) => {
  const { flightId, name, email, services = [] } = req.body;

  if (!flightId || !name || !email) {
    return res.status(400).json({ error: "Flight, name and email are required." });
  }

  const valid = ["checked", "carryon", "seat", "priority"];
  if (!Array.isArray(services) || services.some(s => !valid.includes(s))) {
    return res.status(400).json({ error: "Invalid service selection." });
  }

  const flight = flights.find(f => f.id === flightId);
  if (!flight) return res.status(404).json({ error: "Flight not found." });

  const ticket = buildTicket(flight, [...new Set(services)]);

  res.status(201).json({
    code: "LC-" + Math.random().toString(36).slice(2, 8).toUpperCase(),
    passenger: { name, email },
    flight: `${flight.origin} → ${flight.destination}`,
    date: flight.date,
    time: flight.time,
    description: ticket.getDescription(),
    services: ticket.getServices(),
    basePrice: flight.price,
    finalPrice: ticket.getPrice()
  });
});

module.exports = router;