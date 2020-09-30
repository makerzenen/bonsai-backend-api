import chai from "chai"

import { harvestTickets, harvestMovieData, mergeMovieDetails, marshalTicket, parseRuntime } from "../utilities"

describe("harvestTickets()", () => {
  it("should respond with the number of tickets harvested", async () => {
    const count = 10
    const tickets = await harvestTickets(0, count)
    chai.expect(tickets.length).to.equal(count)
  });
});

describe("harvestMovieData()", () => {
  it("should respond with the list of harvested data", async () => {
    const movie = await harvestMovieData({ title: "The Baby Maker" })
    chai.expect(movie.year).to.equal("1970")
  });
});

describe("mergeMovieDetails()", () => {
  it("should respond with combined movie object", () => {
  });
});

describe("marshalTicket()", () => {
  it("should respond with an object containing ticket data ready to insert", () => {
  });
});

describe("parseRuntime()", () => {
  it("should parse the numerical portion of runtime field and discard 'min'", () => {
    const times = ["42 mins", "24 min", "55 mins", "1000 mins"]
    const expected = [42, 24, 55, 1000]
    for (let i = 0; i < times.length; i++) {
      chai.expect(parseRuntime(times[i])).to.equal(expected[i])
    }
  });
});
