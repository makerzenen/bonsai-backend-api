import request from "supertest"

import { buildExpress, buildServer } from "../main"
import router from "../routes"
import logger from "../logger"
import { dropCollection } from "./helpers"

const app = buildExpress()

// Ensure mongo resets before each test.
beforeEach(() => {
  dropCollection("tickets")
})

// Test all routes.
describe("GET /", () => {
  it("should respond with welcome", () => {
    request(app)
      .get(`/api/v{$process.env.API_VERSION}/`)
      .expect("Content-Type", /json/)
      .expect(200, { message: "welcome" })
      .end((err, res) => {
        if (err) throw err;
      });
  });
});

describe("GET /ping", () => {
  it("should respond with ping", () => {
    request(app)
      .get(`/api/v{$process.env.API_VERSION}/ping/`)
      .expect("Content-Type", /json/)
      .expect(200, { message: "ping" })
      .end((err, res) => {
        if (err) throw err;
      });
  });
});

describe("GET /tickets", () => {
  it("empty ticket collection should respond with empty array", () => {
    // Verify working for empty collection.
    /*
    request(app)
      .get("/tickets")
      .expect("Content-Type", /json/)
      .expect(200, { tickets: [] })
      .end((err, res) => {
        if (err) throw err;
      });
    request(app)
      .get("/tickets/harvest")
      .expect("Content-Type", /json/)
      .expect(200, { ticketCount: 1000 })
      .end((err, res) => {
        if (err) throw err;
      });
    */
  });
});

describe("GET /tickets/unmatched", () => {
  it("should respond with tickets not matched to OMDB", () => {
    /*
    request(app)
      .get("/tickets/unmatched")
      .expect("Content-Type", /json/)
      .expect(200, { tickets: [] })
      .end((err, res) => {
        if (err) throw err;
      });
    request(app)
      .get("/tickets/harvest")
      .expect("Content-Type", /json/)
      .expect(200, { ticketCount: 1000 })
      .end((err, res) => {
        if (err) throw err;
      });
    */
  });
});

describe("GET /tickets/harvest", () => {
  it("should respond with welcome", () => {
    /*
    request(app)
      .get("/tickets/harvest")
      .expect("Content-Type", /json/)
      .expect(200, { ticketCount: 1000 })
      .end((err, res) => {
        if (err) throw err;
      });
    */
  });
});
