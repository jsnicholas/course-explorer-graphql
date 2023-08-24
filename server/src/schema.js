const gql = require("graphql-tag");

const typeDefs = gql`
"Query to get list of Tracks for homepage"
type Query {
tracksForHome: [Track!]!
}
"A track is a group of modules that teaches about a specific topic"
type Track {
id: ID!
title: String!
author: Author!
thumbnail: String
length: Int
modulesCount: Int
}

"Author is who created the Track"
type Author {
id: ID!
name: String!
photo: String
}
`

module.exports = typeDefs;