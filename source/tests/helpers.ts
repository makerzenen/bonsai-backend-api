import mongoose from "mongoose"

import logger from "../logger"
import TicketResolver from "../resolvers/Ticket.resolver"
import { AddTicketInput } from "../resolvers/types/Ticket.input"

const ticketResolver = new TicketResolver()

export async function dropCollection(collection:string) {
  const MONGODB_URI = `mongodb://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}`
  // Connect to mongo instance.
  try {
    await mongoose.connect(
      MONGODB_URI,
      {
        useNewUrlParser: true,
        authSource: "admin"
      },
    )
    const db = mongoose.connection
    db.dropCollection(
      collection,
      (err) => {
        if (!err) {
          logger.info(`Successfully dropped collection: ${collection}.`)
        }
      }
    )
    db.close()
  } catch (mongoConnectError) {
    logger.error(mongoConnectError)
  }
}

export async function checkTicketCount(expected:number): Promise<boolean> {
  try {
    const tickets = await ticketResolver.listTickets()
    if (tickets.length === expected) {
      return true
    } else {
      return false
    }
  } catch (error) {
    return false
  }
}

export const simulateTicketsUnmatchedAPI:object[] = [
  {
    "title": "The Baby Maker",
    "year": "1970",
    "date": "2018-05-08T14:37:44Z",
    "price": 24.618,
    "rated": "R",
    "released": "06 Jun 1971",
    "runtime": 109,
    "genres": [
      "Drama"
    ],
    "directors": [
      "James Bridges"
    ],
    "writers": [
      "James Bridges"
    ],
    "actors": [
      "Barbara Hershey",
      "Collin Wilcox Paxton",
      "Sam Groom",
      "Scott Glenn"
    ],
    "plot": "Tish Gray had a baby and gave it up for adoption. She is contacted by a second childless couple who want her to have the husband's baby because of the wife's inability to conceive. She ...",
    "languages": [
      "English"
    ],
    "countries": [
      "USA"
    ],
    "awards": "N/A",
    "imageUrl": "https://m.media-amazon.com/images/M/MV5BMGUxODI1OWItMDdiMC00MzhmLWE5MmUtNWY2NjVkZmI4NTQ3XkEyXkFqcGdeQXVyMTMxMTY0OTQ@._V1_SX300.jpg",
    "ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "5.9/10"
      }
    ],
    "metascore": "N/A",
    "imdbRating": "5.9",
    "imdbVotes": 229,
    "type": "movie",
    "production": [
      "Warner Bros"
    ],
    "website": "N/A",
    "matchedOMDB": false,
    "_id": { "$oid": "5b8701a1fc13ae6569000001" },
  }, {
    "title": "Falling Up",
    "year": "2009",
    "rated": "Not Rated",
    "released": "05 Jan 2010",
    "runtime": "98 min",
    "genre": "Comedy|Drama|Romance",
    "director": "David M. Rosenthal",
    "writer": "Peter Kellner (story), David M. Rosenthal, Joseph M. Smith",
    "actors": "Joseph Cross, Sarah Roemer, Snoop Dogg, Rachael Leigh Cook",
    "plot": "A nursing student (Cross) forced to quit school for family reasons winds up taking a job as a doorman in an elite apartment building in New York City, where he sparks to one of his residents (Roemer).",
    "language": "English",
    "country": "USA",
    "awards": "N/A",
    "poster": "https://m.media-amazon.com/images/M/MV5BNTc4Njc0NDYyMl5BMl5BanBnXkFtZTcwMTMwNjAxMw@@._V1_SX300.jpg",
    "ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "5.6/10"
      }
    ],
    "metascore": "N/A",
    "imdbRating": "5.6",
    "imdbVotes": "2,400",
    "imdbId": "tt1084955",
    "type": "movie",
    "dvd": "05 Jan 2010",
    "boxOffice": "N/A",
    "production": "Anchor Bay Entertainment",
    "website": "N/A",
    "response": "True",
    "matchedOmdb": true,
    "_id": { "$oid": "5b8701a1fc13ae6569000026" },
    "price": 14.78,
    "inventory": 10,
    "image": "http://dummyimage.com/244x1829.png/ff4444/ffffff",
    "date": "2018-02-21T21:48:36Z",
    "matchedOMDB": false
}, {
    "title": "Storm",
    "year": "2005",
    "date": "2018-08-08T02:53:34Z",
    "price": 27.558,
    "rated": "Not Rated",
    "released": "20 Jan 2006",
    "runtime": 110,
    "genres": [
      "Drama"
    ],
    "directors": [
      "Måns Mårlind",
      "Björn Stein"
    ],
    "writers": [
      "Måns Mårlind"
    ],
    "actors": [
      "Eric Ericson",
      "Eva Röse",
      "Jonas Karlsson",
      "Lina Englund"
    ],
    "plot": "A shiftless loner finds that he suddenly has something worth living for, as he tries to protect the enigmatic love of his life from the men who want to do her harm.",
    "languages": [
      "Swedish"
    ],
    "countries": [
      "Sweden"
    ],
    "awards": "3 wins & 3 nominations.",
    "imageUrl": "https://m.media-amazon.com/images/M/MV5BMjExMDM1MjY3M15BMl5BanBnXkFtZTcwNTI3MTk1MQ@@._V1_SX300.jpg",
    "ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "5.7/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "54%"
      }
    ],
    "metascore": "N/A",
    "imdbRating": "5.7",
    "imdbVotes": 2,
    "type": "movie",
    "production": [
      "Breidablick Film AB"
    ],
    "website": "N/A",
    "matchedOMDB": true,
    "_id": { "$oid": "5b8701a1fc13ae6569000021" }
  }
]

export const simulateTicketsAPI:object[] = [
  {
    "title": "The Baby Maker",
    "year": "1970",
    "date": "2018-05-08T14:37:44Z",
    "price": 24.618,
    "rated": "R",
    "released": "06 Jun 1971",
    "runtime": 109,
    "genres": [
      "Drama"
    ],
    "directors": [
      "James Bridges"
    ],
    "writers": [
      "James Bridges"
    ],
    "actors": [
      "Barbara Hershey",
      "Collin Wilcox Paxton",
      "Sam Groom",
      "Scott Glenn"
    ],
    "plot": "Tish Gray had a baby and gave it up for adoption. She is contacted by a second childless couple who want her to have the husband's baby because of the wife's inability to conceive. She ...",
    "languages": [
      "English"
    ],
    "countries": [
      "USA"
    ],
    "awards": "N/A",
    "imageUrl": "https://m.media-amazon.com/images/M/MV5BMGUxODI1OWItMDdiMC00MzhmLWE5MmUtNWY2NjVkZmI4NTQ3XkEyXkFqcGdeQXVyMTMxMTY0OTQ@._V1_SX300.jpg",
    "ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "5.9/10"
      }
    ],
    "metascore": "N/A",
    "imdbRating": "5.9",
    "imdbVotes": 229,
    "type": "movie",
    "production": [
      "Warner Bros"
    ],
    "website": "N/A",
    "matchedOMDB": true,
    "_id": { "$oid": "5b8701a1fc13ae6569000001" },
  }, {
    "title": "Falling Up",
    "year": "2009",
    "rated": "Not Rated",
    "released": "05 Jan 2010",
    "runtime": "98 min",
    "genre": "Comedy|Drama|Romance",
    "director": "David M. Rosenthal",
    "writer": "Peter Kellner (story), David M. Rosenthal, Joseph M. Smith",
    "actors": "Joseph Cross, Sarah Roemer, Snoop Dogg, Rachael Leigh Cook",
    "plot": "A nursing student (Cross) forced to quit school for family reasons winds up taking a job as a doorman in an elite apartment building in New York City, where he sparks to one of his residents (Roemer).",
    "language": "English",
    "country": "USA",
    "awards": "N/A",
    "poster": "https://m.media-amazon.com/images/M/MV5BNTc4Njc0NDYyMl5BMl5BanBnXkFtZTcwMTMwNjAxMw@@._V1_SX300.jpg",
    "ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "5.6/10"
      }
    ],
    "metascore": "N/A",
    "imdbRating": "5.6",
    "imdbVotes": "2,400",
    "imdbId": "tt1084955",
    "type": "movie",
    "dvd": "05 Jan 2010",
    "boxOffice": "N/A",
    "production": "Anchor Bay Entertainment",
    "website": "N/A",
    "response": "True",
    "matchedOmdb": true,
    "_id": { "$oid": "5b8701a1fc13ae6569000026" },
    "price": 14.78,
    "inventory": 10,
    "image": "http://dummyimage.com/244x1829.png/ff4444/ffffff",
    "date": "2018-02-21T21:48:36Z",
    "matchedOMDB": true
}, {
    "title": "Storm",
    "year": "2005",
    "date": "2018-08-08T02:53:34Z",
    "price": 27.558,
    "rated": "Not Rated",
    "released": "20 Jan 2006",
    "runtime": 110,
    "genres": [
      "Drama"
    ],
    "directors": [
      "Måns Mårlind",
      "Björn Stein"
    ],
    "writers": [
      "Måns Mårlind"
    ],
    "actors": [
      "Eric Ericson",
      "Eva Röse",
      "Jonas Karlsson",
      "Lina Englund"
    ],
    "plot": "A shiftless loner finds that he suddenly has something worth living for, as he tries to protect the enigmatic love of his life from the men who want to do her harm.",
    "languages": [
      "Swedish"
    ],
    "countries": [
      "Sweden"
    ],
    "awards": "3 wins & 3 nominations.",
    "imageUrl": "https://m.media-amazon.com/images/M/MV5BMjExMDM1MjY3M15BMl5BanBnXkFtZTcwNTI3MTk1MQ@@._V1_SX300.jpg",
    "ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "5.7/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "54%"
      }
    ],
    "metascore": "N/A",
    "imdbRating": "5.7",
    "imdbVotes": 2,
    "type": "movie",
    "production": [
      "Breidablick Film AB"
    ],
    "website": "N/A",
    "matchedOMDB": true,
    "_id": { "$oid": "5b8701a1fc13ae6569000021" }
}, {
    "title": "Lady Killer",
    "year": "1933",
    "date": "2018-03-16T18:04:06Z",
    "price": 27.63,
    "rated": "Passed",
    "released": "09 Dec 1933",
    "runtime": 76,
    "genres": [
      "Comedy",
      "Crime"
    ],
    "directors": [
      "Roy Del Ruth"
    ],
    "writers": [
      "Ben Markson (screen play)",
      "Lillie Hayward (screen play)",
      "Rosalind Keating Shaffer (story \"The Finger Man\")"
    ],
    "actors": [
      "James Cagney",
      "Mae Clarke",
      "Margaret Lindsay",
      "Leslie Fenton"
    ],
    "plot": "A former gangster makes it big in Hollywood, but his old life catches up with him.",
    "languages": [
      "English",
      "Yiddish"
    ],
    "countries": [
      "USA"
    ],
    "awards": "N/A",
    "imageUrl": "https://m.media-amazon.com/images/M/MV5BMDcwODNiNmMtMWFjNC00NTQwLTliNGYtMGFhZGEwMzQzMTQ1XkEyXkFqcGdeQXVyMjA0MzYwMDY@._V1_SX300.jpg",
    "ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "7.1/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "70%"
      }
    ],
    "metascore": "N/A",
    "imdbRating": "7.1",
    "imdbVotes": 1,
    "type": "movie",
    "production": [
      "Warner Bros."
    ],
    "website": "N/A",
    "matchedOMDB": true,
    "_id": { "$oid": "5b8701a1fc13ae6569000022" },
}, {
    "title": "As You Like It",
    "year": "2006",
    "date": "2017-09-12T07:04:23Z",
    "price": 28.21,
    "rated": "PG",
    "released": "21 Sep 2007",
    "runtime": 127,
    "genres": [
      "Comedy",
      "Drama",
      "Romance"
    ],
    "directors": [
      "Kenneth Branagh"
    ],
    "writers": [
      "Kenneth Branagh (adaptation)",
      "William Shakespeare (play)"
    ],
    "actors": [
      "Takuya Shimada",
      "Brian Blessed",
      "Richard Clifford",
      "Bryce Dallas Howard"
    ],
    "plot": "A daughter of the powerful Duke must show her courage and inventiveness to be with the man she loves.",
    "languages": [
      "English"
    ],
    "countries": [
      "UK",
      "USA"
    ],
    "awards": "Nominated for 1 Golden Globe. Another 1 win & 5 nominations.",
    "imageUrl": "https://m.media-amazon.com/images/M/MV5BMjA1MDk4MDIxNV5BMl5BanBnXkFtZTcwMzgzNzE1MQ@@._V1_SX300.jpg",
    "ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "6.2/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "36%"
      }
    ],
    "metascore": "N/A",
    "imdbRating": "6.2",
    "imdbVotes": 2,
    "type": "movie",
    "production": [
      "HBO Films"
    ],
    "website": "N/A",
    "matchedOMDB": true,
    "_id": { "$oid": "5b8701a1fc13ae65690000326" },
}, {
    "title": "Little Nemo: Adventures in Slumberland",
    "year": "1989",
    "date": "2017-10-14T21:50:37Z",
    "price": 21.246,
    "rated": "G",
    "released": "21 Aug 1992",
    "runtime": 85,
    "genres": [
      "Adventure",
      "Animation",
      "Children",
      "Drama",
      "Fantasy"
    ],
    "directors": [
      "Masami Hata",
      "William T. Hurtz"
    ],
    "writers": [
      "Chris Columbus (screenplay)",
      "Richard Outten (screenplay)",
      "Jean Giraud (story)",
      "Yutaka Fujioka (story)",
      "Winsor McCay (comic strip \"Little Nemo in Slumberland\")"
    ],
    "actors": [
      "Gabriel Damon",
      "Mickey Rooney",
      "Rene Auberjonois",
      "Danny Mann"
    ],
    "plot": "A young boy whose dreams transcend reality is sucked into his own fantasy, which is everything he has dreamed of until he unleashes a century old secret that may not only destroy this ...",
    "languages": [
      "English"
    ],
    "countries": [
      "Japan",
      "USA"
    ],
    "awards": "1 win & 1 nomination.",
    "imageUrl": "https://m.media-amazon.com/images/M/MV5BMmNkM2MzNDgtNzk3Ny00ZTZmLTg4MDMtODc5M2Y4ZGQ4MGMyXkEyXkFqcGdeQXVyNjMwMjk0MTQ@._V1_SX300.jpg",
    "ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "7.2/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "84%"
      }
    ],
    "metascore": "N/A",
    "imdbRating": "7.2",
    "imdbVotes": 6,
    "type": "movie",
    "production": [
      "N/A"
    ],
    "website": "N/A",
    "matchedOMDB": true,
    "_id": { "$oid": "5b8701a1fc13ae6569000023" },
}, {
    "title": "Laila",
    "year": "1929",
    "date": "2018-06-10T08:30:54Z",
    "price": 23.74,
    "rated": "N/A",
    "released": "12 Oct 1929",
    "runtime": 165,
    "genres": [
      "Drama",
      "Romance"
    ],
    "directors": [
      "George Schnéevoigt"
    ],
    "writers": [
      "Jens Andreas Friis (novel)",
      "George Schnéevoigt"
    ],
    "actors": [
      "Mona Mårtenson",
      "Tryggve Larssen",
      "Harald Schwenzen",
      "Peter Malberg"
    ],
    "plot": "A spirited Norwegian Lass is torn between two suits and two cultures.",
    "languages": [
      "N/A"
    ],
    "countries": [
      "Norway"
    ],
    "awards": "N/A",
    "imageUrl": "https://m.media-amazon.com/images/M/MV5BODRjMGYwMGQtODUwZS00OTM4LThhMTAtZjQ2YmI2NjFmNzMyXkEyXkFqcGdeQXVyMjQ3MTQ1MTg@._V1_SX300.jpg",
    "ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "7.3/10"
      }
    ],
    "metascore": "N/A",
    "imdbRating": "7.3",
    "imdbVotes": 160,
    "type": "movie",
    "production": [
      "Lunde Film"
    ],
    "website": "N/A",
    "matchedOMDB": true,
    "_id": { "$oid": "5b8701a1fc13ae6569000024" },
  }, {
    "title": "Mrs. Miniver",
    "year": "1942",
    "date": "2018-06-17T06:22:13Z",
    "price": 16.364,
    "rated": "Not Rated",
    "released": "01 Dec 1942",
    "runtime": 134,
    "genres": [
      "Drama",
      "War"
    ],
    "directors": [
      "William Wyler"
    ],
    "writers": [
      "Arthur Wimperis (screenplay)",
      "George Froeschel (screenplay)",
      "James Hilton (screenplay)",
      "Claudine West (screenplay)",
      "Jan Struther (based on the book by)"
    ],
    "actors": [
      "Greer Garson",
      "Walter Pidgeon",
      "Teresa Wright",
      "May Whitty"
    ],
    "plot": "A British family struggles to survive the first months of World War II.",
    "languages": [
      "English",
      "German"
    ],
    "countries": [
      "USA"
    ],
    "awards": "Won 6 Oscars. Another 4 wins & 7 nominations.",
    "imageUrl": "https://m.media-amazon.com/images/M/MV5BY2UxNjcwYmQtODc1NC00ZjQ1LTk4NDctZTE0NjhlMjNlOTEyXkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_SX300.jpg",
    "ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "7.6/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "93%"
      }
    ],
    "metascore": "N/A",
    "imdbRating": "7.6",
    "imdbVotes": 15,
    "type": "movie",
    "production": [
      "Metro Goldwyn Mayer"
    ],
    "website": "N/A",
    "matchedOMDB": true,
    "_id": { "$oid": "5b8701a1fc13ae6569000025" },
}, {
    "title": "Impostor",
    "year": "2001",
    "date": "2017-11-18T00:38:36Z",
    "price": 16.624,
    "rated": "PG-13",
    "released": "04 Jan 2002",
    "runtime": 95,
    "genres": [
      "Action",
      "Drama",
      "Sci-Fi",
      "Thriller"
    ],
    "directors": [
      "Gary Fleder"
    ],
    "writers": [
      "Philip K. Dick (short story \"The Impostor\")",
      "Scott Rosenberg (adaptation)",
      "Caroline Case (screenplay)",
      "Ehren Kruger (screenplay)",
      "David Twohy (screenplay)"
    ],
    "actors": [
      "Gary Sinise",
      "Madeleine Stowe",
      "Vincent D'Onofrio",
      "Tony Shalhoub"
    ],
    "plot": "In the future, an alien race uses androids as bombs to attack Earth. A government weapons specialist is accused of being one such android and sets out to prove his innocence.",
    "languages": [
      "English"
    ],
    "countries": [
      "USA"
    ],
    "awards": "1 nomination.",
    "imageUrl": "https://m.media-amazon.com/images/M/MV5BMTQ2NDk5MDgxOF5BMl5BanBnXkFtZTcwMDA2MzMyMQ@@._V1_SX300.jpg",
    "ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "6.2/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "23%"
      },
      {
        "Source": "Metacritic",
        "Value": "33/100"
      }
    ],
    "metascore": "33",
    "imdbRating": "6.2",
    "imdbVotes": 22,
    "type": "movie",
    "production": [
      "Dimension Films",
      "Mojo Films",
      "P.K. Pictures"
    ],
    "website": "N/A",
    "matchedOMDB": true,
    "_id": { "$oid": "5b8701a1fc13ae6569000096" },
}, {
    "title": "Blackmailed",
    "year": "1951",
    "date": "2018-07-25T17:15:06Z",
    "price": 23.442,
    "rated": "Approved",
    "released": "12 Sep 1951",
    "runtime": 73,
    "genres": [
      "Crime",
      "Drama",
      "Thriller"
    ],
    "directors": [
      "Marc Allégret"
    ],
    "writers": [
      "Hugh Mills (screenplay)",
      "Roger Vadim (screenplay)",
      "Elizabeth Myers (novel)"
    ],
    "actors": [
      "Mai Zetterling",
      "Dirk Bogarde",
      "Fay Compton",
      "Robert Flemyng"
    ],
    "plot": "Mrs. Christopher, a kindly volunteer worker at a large hospital, does a favor for a patient by delivering a sum of money to Mr. Sine. When she discovers he is a blackmailer, she threatens ...",
    "languages": [
      "English"
    ],
    "countries": [
      "UK"
    ],
    "awards": "N/A",
    "imageUrl": "https://m.media-amazon.com/images/M/MV5BN2I0YTEwZmYtZDQ2ZC00YzIyLTg1NDYtODEyNGUzYTk2MDljXkEyXkFqcGdeQXVyMjI4MjA5MzA@._V1_SX300.jpg",
    "ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "7.6/10"
      }
    ],
    "metascore": "N/A",
    "imdbRating": "7.6",
    "imdbVotes": 19,
    "type": "movie",
    "production": [
      "N/A"
    ],
    "website": "N/A",
    "matchedOMDB": true,
    "_id": { "$oid": "5b8701a1fc13ae6569000027" },
}, {
    "title": "Werner - Beinhart!",
    "year": "1990",
    "date": "2017-09-18T04:26:30Z",
    "price": 29.187,
    "rated": "N/A",
    "released": "29 Nov 1990",
    "runtime": 93,
    "genres": [
      "Action",
      "Animation",
      "Comedy"
    ],
    "directors": [
      "Gerhard Hahn",
      "Niki List",
      "Michael Schaack"
    ],
    "writers": [
      "Rötger Feldmann (comic)",
      "Ernst Kahl"
    ],
    "actors": [
      "Klaus Büchner",
      "Rötger Feldmann",
      "Andi Feldmann",
      "Kulle Westphal"
    ],
    "plot": "Broesel has to make a Werner animation film but right now he has no real ideas for new stories. Thus he simply draws some stories from Werner's youth.",
    "languages": [
      "German"
    ],
    "countries": [
      "Germany"
    ],
    "awards": "1 win.",
    "imageUrl": "https://m.media-amazon.com/images/M/MV5BMTUzODY1MDg2OF5BMl5BanBnXkFtZTcwODczMTEyMQ@@._V1_SX300.jpg",
    "ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "6.7/10"
      }
    ],
    "metascore": "N/A",
    "imdbRating": "6.7",
    "imdbVotes": 5,
    "type": "movie",
    "production": [
      "N/A"
    ],
    "website": "N/A",
    "matchedOMDB": true,
    "_id": { "$oid": "5b8701a1fc13ae6569000028" },
  }
]
