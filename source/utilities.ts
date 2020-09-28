import fetch from "node-fetch"
import camelcaseKeys from "camelcase-keys"

import logger from "./logger"

export async function harvestTickets(skip: number=0, limit: number=10) {
  try {
    const response = await fetch(`${process.env.TICKETS_API_URL}?skip=${skip}&limit=${limit}`)
    const json = await response.json()
    logger.info(json)
    logger.info({ message: `Successfully harvested ticket from ${process.env.TICKETS_API_URL}`, ticket: json })
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
    if (json.Response === "False") {
      throw new Error()
    }
    json.matchedOMDB = true
    logger.info({ message: `Successfully harvested movie data from ${process.env.OMDB_API_URL}`, movie: json })
    return json
  } catch (error) {
    logger.error(`Failed to harvest movie data for ${ticket.title}.`, error)
    throw new Error("Unable to harvest movie data.")
  }
}

export function mergeMovieDetails(ticket: any, movie: any) {
  const merged = { ...camelcaseKeys(movie), ...ticket }
  logger.info({ mmd: merged })
  return merged;
}

export function convertTicketId(ticket: any) {
  ticket["_id"] = ticket["_id"]["$oid"]
  return ticket
}

export function trim(input: string, delimiter: string): string[] {
  const result = input.split(delimiter)
  if (result.length === 1 && result[0] === "") {
    return []
  } 
  return result
}

export function marshalTicket(ticket: any) {
  logger.info({mt: ticket})
  try {
    const response = {
      _id: ticket["_id"]["$oid"],
      title: ticket.title,
      year: ticket.year,
      date: ticket.date,
      price: ticket.price,
      rated: ticket.rated,
      released: ticket.released,
      runtime: parseRuntime(ticket.runtime),
      genres: trim(ticket.genre, "|"),
      directors: trim(ticket.director, ","),
      writers:trim(ticket.writer, ","),
      actors: trim(ticket.actors, ","),
      plot: ticket.plot,
      languages: trim(ticket.language, ","),
      countries: trim(ticket.country, ","),
      awards: ticket.awards,
      imageUrl: ticket.poster || "",
      ratings: ticket.ratings,
      metascore: ticket.metascore,
      imdbRating: ticket.imdbRating,
      imdbVotes: parseInt(ticket.imdbVotes),
      type: ticket.type,
      production: trim(ticket.production, ","),
      website: ticket.website,
      matchedOMDB: ticket.matchedOMDB,
    }
    logger.info({mtt: response})
    return response
  } catch(error) {
    logger.error(error)
  }
}

export function parseRuntime(input: string) {
  const result = input.split(" ")
  return parseInt(result[0])
}
