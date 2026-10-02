const BasicTicket = require("../backend/patterns/decorator/BasicTicket");
const CheckedBaggageDecorator = require("../backend/patterns/decorator/CheckedBaggageDecorator");
const CarryOnDecorator = require("../backend/patterns/decorator/CarryOnDecorator");
const SeatDecorator = require("../backend/patterns/decorator/SeatDecorator");
const PriorityBoardingDecorator = require("../backend/patterns/decorator/PriorityBoardingDecorator");

exports.handler = async (event) => {
  try {
    const body = typeof event.body === "string" ? JSON.parse(event.body) : event.body || {};
    const flight = {origin:body.origin||"Bogota",destination:body.destination||"Medellin",price:Number(body.price)||180000};
    const services = Array.isArray(body.services) ? body.services : [];
    let ticket = new BasicTicket(flight);
    if(services.includes("checked")) ticket = new CheckedBaggageDecorator(ticket);
    if(services.includes("carryon")) ticket = new CarryOnDecorator(ticket);
    if(services.includes("seat")) ticket = new SeatDecorator(ticket);
    if(services.includes("priority")) ticket = new PriorityBoardingDecorator(ticket);
    return {statusCode:200,body:JSON.stringify({description:ticket.getDescription(),services:ticket.getServices(),finalPrice:ticket.getPrice()})};
  } catch(error) {
    return {statusCode:400,body:JSON.stringify({error:error.message})};
  }
};