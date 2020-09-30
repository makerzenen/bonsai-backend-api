# Bonsai Backend Test

Backend nodejs application using Typescript, Typegoose and MongoDB. Pulls tickets data from an API, supplements with OMDB movie data, then stores in MongoDB.

## Setup

### Local

Note: Requires MongoDB 3/4. See below for dockerized solution.

`yarn install`
`yarn start`

### Test

Note: Requires MongoDB 3/4. See below for dockerized solution.

`yarn test`

### Production

`yarn build`

Output is in `dist`.

### Docker

#### Run Tests Locally with docker-compose

Runs dev, release and Postgres database, builds database, runs migrations and seeds, runs tests, pings and curls release container.

```bash
docker-compose up -d bonsai-backend-api-dev database && \
    docker-compose stop bonsai-backend-api-dev && \
    docker-compose up -d bonsai-backend-api-dev bonsai-backend-api-release && \
    docker-compose exec bonsai-backend-api-dev yarn test && \
    docker-compose exec bonsai-backend-api-dev ping -c 1 bonsai-backend-api-release && \
    docker-compose exec bonsai-backend-api-dev curl bonsai-backend-api-release:3000/ping
```

## Implementation Steps

### Review

0. Code review.
1. Review Typescript.
2. Review GraphQL.
3. Review MongoDB.
4. Review Jest.

### Routes

1. GET /api/v1/tickets -> returns { tickets[] }
2. GET /api/v1/tickets/harvest -> returns { status, ticketCount }
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
9. `DATABASE_PORT`
10. `API_VERSION`
11. `OMDB_API_KEY`
12. `TICKETS_API_URL`
13. `OMDB_API_URL`

### Full Deliverable List: Concise, Rewritten Instruction List

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
  - [x] Store in MongoDB.
- [x] Create GET `tickets`, GET `tickets/unmatched` GraphQL endpoint.
  - [x] Extend existing `TicketResolver.listTickets` to output movie information for each ticket.
  - [x] Optimize `TicketResolver.listTickets` method. You can modify any file that you think would improve the response time.
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
