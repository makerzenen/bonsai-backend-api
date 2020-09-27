import express from "express"
import fetch from "node-fetch"
import camelcaseKeys from "camelcase-keys"

import logger from "./logger"
import TicketResolver from "./resolvers/Ticket.resolver"
import { harvestTickets, harvestMovieData, mergeMovieDetails, marshalTicket, checkNA, parseRuntime } from "./utilities"

const router = express.Router();
const ticketResolver = new TicketResolver()

router.get("/", (req, res) => {
  res.json({ message: "welcome" });
});

router.get("/ping", (req, res) => {
  res.json({ message: "ping" });
});

router.get("/tickets", async (req, res) => {
  try {
    const tickets = await ticketResolver.listTickets()
    res.json({ tickets });
  } catch (error) {
    logger.error(error)
    res.status(400).send({ message: "List tickets failed." });
    return;
  }
});

router.get("/tickets/harvest", async (req, res) => {
  try {
    // Holder for ticket data.
    const tickets: Array<any> = []
    const concurrentRequests = 100
    let skip = 0
    const limit = 100
    let more = true
    // Harvest ticket data.
    while (more) {
      const results = await harvestTickets(skip, limit)
      skip = skip + limit
      for (const [key, value] of Object.entries(results)) {
        tickets.push(value)
      }
      if (Object.keys(results).length === 0) {
        more = false
        break
      }
    }
    // Harvest and append movie data.
    for (let i = 0; i < tickets.length; i++) {
      let ticket = tickets[i]
      const data = await harvestMovieData(ticket)
      ticket = marshalTicket(mergeMovieDetails(ticket, data))
      // Insert ticket into database.
      // const result = await ticketResolver.addTicket(ticket)
    }
    res.json({ status: "success", ticketCount: tickets.length })
  } catch (error) {
    logger.error(error)
    res.status(400).send({ message: "Harvest tickets failed." });
    return;
  }
});

router.get("/tickets/unmatched", async (req, res) => {
  try {
    const tickets = await ticketResolver.listTicketsUnmatched({ matchedOMDB: false })
    res.json({ tickets })
  } catch (error) {
    logger.error(error)
    res.status(400).send({ message: "List unmatched tickets failed." });
    return;
  }
});

export default router
