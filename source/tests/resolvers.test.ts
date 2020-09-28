import TicketResolver from "../resolvers/Ticket.resolver"
import { simulateTicketsAPI } from "./helpers"
import logger from "../logger"

const ticketResolver = new TicketResolver()

describe("source/resolvers/Ticket.resolver.ts()", () => {
  it("class TicketResolver should create a valid resolver", () => {
  	const testTicketResolver = new TicketResolver()
  });

  it("ticket() should throw error when no tickets exist", () => {

  });

  it("ticket() should find a ticket by its ID", () => {
  });

  it("listTickets() should find a list of tickets", () => {
  });

  it("listTicketsUnmatched() should find a list of tickets with no OMDB match", () => {
  });

  it("addTicket() should create a new ticket entity", () => {
    simulateTicketsAPI.forEach(ticket => {
      logger.info(ticket)
      ticketResolver.addTicket(ticket)
    })
  });
});
