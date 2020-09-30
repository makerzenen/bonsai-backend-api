import { ObjectId } from "mongodb"

import TicketResolver from "../resolvers/Ticket.resolver"
import { checkTicketCount, simulateTicketsAPI, simulateTicketsUnmatchedAPI } from "./helpers"
import { marshalTicket } from "../utilities"
import logger from "../logger"
import { AddTicketInput } from "../resolvers/types/Ticket.input"

const ticketResolver = new TicketResolver()

describe("source/resolvers/Ticket.resolver.ts()", () => {
  it("class TicketResolver should create a valid resolver", async () => {
  	const testTicketResolver = new TicketResolver()
  });

  it("ticket() should throw error when no tickets exist", async () => {
    try {
      const ticket = await ticketResolver.ticket({ id: new ObjectId("10") })
    } catch (error) {
      logger.info("Expected, carry on.")
    }
  });

  it("ticket() should find a ticket by its ID", () => {
    /*
    const cleanTicket = marshalTicket(simulateTicketsAPI[0])
    ticketResolver.addTicket(new AddTicketInput(cleanTicket))
    const ticket = await ticketResolver.ticket({ id: cleanTicket["_id"] })
    chai.expect(cleanTicket["_id"]).to.equal(ticket["_id"])
    */
  });

  it("listTickets() should find a list of tickets", () => {
    /*
    simulateTicketsAPI.forEach(ticket => {
      const cleanTicket = marshalTicket(ticket)
      await ticketResolver.addTicket(cleanTicket)
    })
    if (!checkTicketCount(simulateTicketsAPI.length)) {
      throw new Error()
    }
    */
  });

  it("listTicketsUnmatched() should find a list of tickets with no OMDB match", () => {
    /*
    // Insert unmatched tickets.
    simulateTicketsUnmatchedAPI.forEach(ticket => {
      const cleanTicket = marshalTicket(ticket)
      ticketResolver.addTicket(cleanTicket)
    })
    // Verify that unmatched tickets can be inserted.
    const tickets = await ticketResolver.listTicketsUnmatched()
    if (!checkTicketCount(simulateTicketsUnmatchedAPI.length)) {
      throw new Error()
    }
    */
  });

  it("addTicket() should create a new ticket entity", () => {
    /*
    simulateTicketsAPI.forEach(ticket => {
      const cleanTicket = marshalTicket(ticket)
      ticketResolver.addTicket(cleanTicket)
    })
    if (!checkTicketCount(simulateTicketsAPI.length)) {
      throw new Error()
    }
    */
  });
});
