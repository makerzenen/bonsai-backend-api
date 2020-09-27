import { Arg, Mutation, Query, Resolver } from "type-graphql"

import TicketModel, { Ticket } from "../entities/Ticket"

import { AddTicketInput, TicketInput, ListTicketsMatchedInput} from "./types/Ticket.input"

@Resolver(() => Ticket)
export default class TicketResolver {
  @Query(() => Ticket, { nullable: true })
  public async ticket(@Arg("input") ticketInput: TicketInput): Promise<Ticket> {
    const ticket = await TicketModel.findById(ticketInput.id)
    if (!ticket) {
      throw new Error("No ticket found!")
    }
    return ticket
  }

  @Query(() => [Ticket])
  public async listTickets(): Promise<Ticket[]> {
    const tickets = await TicketModel.find({})
    return tickets
  }

  @Query(() => [Ticket])
  public async listTicketsUnmatched(@Arg("input") input: ListTicketsMatchedInput): Promise<Ticket[]> {
    const tickets = await TicketModel.find({ matchedOMDB: input.matchedOMDB })
    return tickets
  }

  @Mutation(() => Ticket)
  public async addTicket(@Arg("input") ticketInput: AddTicketInput): Promise<Ticket> {
    const ticket = new TicketModel(ticketInput)
    return ticket.saveFields()
  }
}
