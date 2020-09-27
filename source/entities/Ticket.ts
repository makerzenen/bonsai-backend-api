import { ObjectId } from "mongodb"
import { Field, Float, Int, ObjectType } from "type-graphql"
import {
  arrayProp as ArrayProperty,
  instanceMethod as InstanceMethod,
  InstanceType,
  ModelType,
  prop as Property,
  staticMethod as StaticMethod,
  Typegoose,
} from "typegoose"

@ObjectType()
export class Ticket extends Typegoose {
  @StaticMethod
  public static findById(this: ModelType<Ticket>, id: any) {
    return this.findOne({ id })
  }

  @Field()
  public readonly _id: ObjectId

  @Field()
  @Property({ required: true })
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
  @ArrayProperty({ items: String, default: [] })
  public genres: string[]

  @Field(() => [String])
  @ArrayProperty({ items: String, default: [] })
  public directors: string[]

  @Field(() => [String])
  @ArrayProperty({ items: String, default: [] })
  public writers: string[]

  @Field(() => [String])
  @ArrayProperty({ items: String, default: [] })
  public actors: string[]

  @Field()
  public plot: string

  @Field(() => [String])
  @ArrayProperty({ items: String, default: [] })
  public languages: string[]

  @Field(() => [String])
  @ArrayProperty({ items: String, default: [] })
  public countries: string[]

  @Field()
  public awards: string

  @Field(() => [String])
  @ArrayProperty({ items: String, default: [] })
  public ratings: string[]

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
  @Property({ required: true })
  public price: number

  @Field(() => Int)
  @Property({ required: true })
  public inventory: number

  @Field()
  @Property({ required: true })
  public imageUrl: string

  @Field()
  @Property({ required: true })
  public date: Date

  @Field()
  @Property({ required: true })
  public matchedOMDB: boolean

  @InstanceMethod
  public saveFields(this: InstanceType<Ticket>) {
    // Inventory should always be at least 0
    this.inventory = Math.max(this.inventory || 0, 0)
    return this.save()
  }
}

export const TicketModel = new Ticket().getModelForClass(Ticket)

export default TicketModel
