import fetch from "node-fetch"
import camelcaseKeys from "camelcase-keys"

import logger from "./logger"

export async function harvestTickets(skip: number=0, limit: number=10) {
  try {
    const response = await fetch(`${process.env.TICKETS_API_URL}?skip=${skip}&limit=${limit}`)
    const json = await response.json()
    return json
  } catch(error) {
    logger.error({ message: "Failed to harvest tickets.", error })
    throw new Error("Unable to harvest tickets.")
  }
}

export async function harvestMovieData(ticket: any) {
  try {
    const response = await fetch(encodeURI(`${process.env.OMDB_API_URL}?apikey=${process.env.OMDB_API_KEY}&t=${ticket.title}`))
    const json = await response.json()
    return json
  } catch (error) {
    logger.error(`Failed to harvest movie data for ${ticket.title}.`, error)
  }
}

export function mergeMovieDetails(ticket: any, movie: any) {
  const merged = { ...ticket, ...camelcaseKeys(movie) }
  return merged;
}

export function marshalTicket(ticket: any) {
  return {
    title: ticket.title,
    year: checkNA(ticket.year),
    rated: checkNA(ticket.rated),
    released: checkNA(ticket.released),
    runtime: parseRuntime(ticket.runtime),
    genres: ticket.genre.split(","),
    directors: ticket.director.split(","),
    writers: ticket.writer.split(","),
    actors: ticket.actors.split(","),
    plot: ticket.plot,
    languages: ticket.languages.split(","),
    countries: ticket.country.split(","),
    awards: ticket.awards,
    imageUrl: ticket.poster,
    ratings: ticket.ratings,
    metascore: checkNA(ticket.metascore),
    imdbRating: ticket.imdbRating,
    imdbVotes: parseInt(ticket.imdbVotes),
    type: ticket.type,
    production: ticket.production.split(","),
    website: checkNA(ticket.website)
  }
}

export function checkNA(input: string) {
  if (input === "N/A") { return null } else { return input }
}

export function parseRuntime(input: string) {
  const result = input.split(" ")
  return parseInt(result[0])
}
