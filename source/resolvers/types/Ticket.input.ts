import { ObjectId } from "mongodb"
import { Field, Float, InputType, Int } from "type-graphql"

import { Ticket } from "../../entities/Ticket"

@InputType()
export class TicketInput {
  @Field()
  public id: ObjectId
}

@InputType()
export class ListTicketsMatchedInput {
  @Field(() => Boolean)
  public matchedOMDB: boolean
}

@InputType()
export class AddTicketInput implements Partial<Ticket> {
  @Field()
  public title: string

  @Field(() => Int)
  public year: number

  @Field()
  public rated: string

  @Field()
  public released: Date

  @Field()
  public runtime: number

  @Field(() => [String])
  public genres: string[]

  @Field(() => [String])
  public directors: string[]

  @Field(() => [String])
  public writers: string[]

  @Field(() => [String])
  public actors: string[]

  @Field()
  public plot: string

  @Field(() => [String])
  public languages: string[]

  @Field(() => [String])
  public countries: string[]

  @Field()
  public awards: string

  @Field(() => [Object])
  public ratings: object[]

  @Field()
  public metascore: string

  @Field()
  public imdbRating: number

  @Field(() => Int)
  public imdbVotes: number

  @Field()
  public imdbID: string

  @Field()
  public type: string

  @Field()
  public production: string

  @Field()
  public website: string

  @Field(() => Float)
  public price: number

  @Field(() => Int)
  public inventory: number

  @Field()
  public imageUrl: string

  @Field()
  public date: Date

  @Field()
  public matchedOMDB: boolean
}
