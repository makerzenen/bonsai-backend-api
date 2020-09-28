# Welcome to the Bonsai Backend Test!

We want to test your skills in a few key areas, especially with respect to how you think about problems and the values you bring to the code you write. Take your time, we want to see your best work.

We've prepared a basic skeleton of a project to help you work a little bit faster. Feel free to change out anything in the project as long as you meet the `Requirements`. Just because something is written doesn't mean it is right!

## Requirements

- [ ] Provide a GraphQL endpoint to initiate cleaning and storing of ticket data into MonogDB from the provided external API
  - API: `https://us-central1-bonsai-interview-endpoints.cloudfunctions.net/movieTickets?skip=0&limit=10`
  - The `skip` and `limit` parameters are the only ones that exist.
  - There are only `1000` movie tickets in this test feed but you should be able to consume more than that
- [ ] Clean and store additional data about the imported movie tickets from this API: http://www.omdbapi.com/
- [ ] Create a GraphQL endpoint that can deliver data from both data sources
  - Support pagination
- [ ] Sufficiently and effectively unit test functions as you see fit
- [ ] Fix any bugs or bad code you happen to find along the way
- [ ] Optimize one previously written function (`(method) TicketResolver.listTickets(input: ListTicketsInput): Promise<Ticket[]>` in `source/resolvers/Ticket.resolver.ts`). It should get resolved in under 15ms when fetching for 10 items out of 1000+ documents

## Evaluation

Please document your changes well and make as many atomic commits as you feel are necessary for someone to see how you work.

We will be evaluating the following:

- How well and completely you meet the requirements
- Attention to detail
- Following modern best practices
- Robustness of testing, both manual and automatic
- Communication clarity in code, documentation and pull request

People who do well will be contacted through email within a week of acknowledgement of pull request submission.

Thanks and good luck!

## Instructions

1. Create a GraphQL endpoint to initiate ticket syncing
2. Implement consuming ticket API and saving tickets to the database
3. Get an API key for OMDB: http://www.omdbapi.com/apikey.aspx
4. Consume OMDB API to populate a movies collection for each of the tickets (you might get rate limited, so consume OMDB API key from environment variables)
5. You might have a few tickets without matching movies, adjust the logic to find those as well (you might still not be able to find 100% of them, but do your best)
6. Create a GraphQL endpoint with pagination to fetch tickets without matching movies
7. Extend existing `TicketResolver.listTickets` to output movie information for each ticket
8. `TicketResolver.listTickets` method is highly unoptimized. Optimize it to the best of your abilities. You can modify any file that you think would improve the response time
9. Create effective unit tests for the functions you see fit
10. You might have a few tickets with `inventory` equaled to `-1`. This should never be the case. Figure out where this is happening & fix the bug
11. There is a query to fetch a ticket by its ID. However, it's not working. Figure out why & fix the bug

## Questions

1. Endpoint authentication?
2. Update all very old dependencies?

## Implementation Steps

### Review

0. Code review.
1. Review Typescript.
2. Review GraphQL.
3. Review MongoDB.
4. Review Jest.

### Routes

0. *OPTIONAL* POST /api/v1/login -> accepts { username, password }, returns { success/fail }
1. GET /api/v1/tickets -> returns { tickets[] }
2. GET /api/v1/tickets/harvest -> returns { url }, url: { status: [pending, succeeded, failed], batchSize: int, ticketIds: uuid }
3. GET /api/v1/tickets/unmatched -> returns { tickets[] }

### Models

1. Ticket - `source/entities/Ticket.ts`

### Database

Connect to MongoDB: `mongo localhost:27017/bonsai -u bonsai -p password --authenticationDatabase admin`

### Environment Variables

1. `OMDB_API_KEY`
2. `NODE_ENV`
3. `PORT`
4. `LOG_LEVEL`
5. `DATABASE_HOST`
6. `DATABASE_USER`
7. `DATABASE_NAME`
8. `DATABASE_PASSWORD`
9. `API_VERSION`

### Concise, Rewritten Instruction List

- [x] Get application working.
  - [x] Errors remain likely due to out of date depends.
- [x] Get database working.
  - [x] Dockerfile and docker-compose.yml.
- [x] Get tests working (`yarn test`).
- [x] Create GraphQL endpoint for ticket harvest.
  - [x] Test API: `https://us-central1-bonsai-interview-endpoints.cloudfunctions.net/movieTickets?skip=0&limit=10`
  - [x] The `skip` and `limit` parameters are the only ones that exist.
  - [x] There are only `1000` movie tickets in this test feed.
  - [ ] Somehow find more tickets (TBD - is this important? 1000 is fine).
- [x] Clean and store additional data about the imported movie tickets from this API: http://www.omdbapi.com/
  - [x] Obtain API key.
  - [x] Find out request rate limitations: 1000 per day.
  - [x] Build HTTP requests.
  - [x] Merge data into entity.
  - [ ] Store in MongoDB.
- [x] Create GET `tickets`, GET `tickets/unmatched` GraphQL endpoint.
  - [x] Extend existing `TicketResolver.listTickets` to output movie information for each ticket.
  - [ ] Optimize `TicketResolver.listTickets` method. You can modify any file that you think would improve the response time.
  - [x] Fix `inventory = -1` bug.
  - [x] Fix `fetchTicketByID()` bug.
- [ ] Test Plan (Limiting to one test per 'thing' - you'll get the point)
  - Test all functions.
  - Test database creation.
  - Test app server creation.
  - Test all routes.
  - [ ] api.test.ts
  - [x] baseline.test.ts
  - [ ] entities.test.ts
  - [x] logger.test.ts
  - [ ] main.test.ts
  - [ ] resolvers.test.ts
  - [ ] utilities.test.ts

- [x] Fix any bugs or bad code you happen to find along the way.
- [ ] Optimize one previously written function (`(method) TicketResolver.listTickets(input: ListTicketsInput): Promise<Ticket[]>` in `source/resolvers/Ticket.resolver.ts`). It should get resolved in under 15ms when fetching for 10 items out of 1000+ documents

TBD: 
5. You might have a few tickets without matching movies, adjust the logic to find those as well (you might still not be able to find 100% of them, but do your best)

### Error List

1. `package.json` -> `"@types/jest": "false24.0.12",`
2. `Ticket.resolver.ts` -> `import TicketModel, { Ticket } from "../entities/ticket"`
3. `Ticket.ts` -> `return this.findOne({ _id: id + 1 })`
4. `Ticket.ts` -> `if (this && Math.floor(Math.random() * 6) + 1 === 3) { this.inventory = -1 }`

### File Descriptions (My Additions)

1. `.dockerignore`: List of files to not include when building Docker images.
2. `.env`: Holds environment variables for local environments.
3. `docker-compose.yml`: Deploy the application with a MongoDB instance.
4. `Dockerfile`: Builds Docker images.
5. `source/tests/`: Tests broken down by file or set of files under test.
6. `source/logger.ts`: Build a Pino logger instance for reuse across project.
7. `source/routes.ts`: All API routes.
8. `source/utilities.ts`: Helper methods for API calls, data transformations, etc.

