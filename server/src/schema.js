const gql = require("graphql-tag");

const typeDefs = gql`
"Query to get list of Tracks"
type Query {
tracksForHome: [Track!]!
track(id:ID!): Track
}
"A track is a group of modules that teaches about a specific topic"
type Track {
id: ID!
"Title of track"
title: String!
"Author of Track"
author: Author!
"Thumbnail image for track"
thumbnail: String
"The track's approx. length to complete, in minutes"
length: Int
"Number of modules within track"
modulesCount: Int
"description of track"
description: String
"Number of views for the Track"
numberOfViews: Int
"The Track's complete array of modules"
modules: [Module!]!
}

"A module is a single unit of teaching. Multiple modules compose a Track"
type Module {
id: ID!
"Title of module"
title: String!
"The module's length in minutes"
length: Int
}

"Author is who created the Track"
type Author {
id: ID!
"name of author"
name: String!
"url to author's photo"
photo: String
}
`

module.exports = typeDefs;