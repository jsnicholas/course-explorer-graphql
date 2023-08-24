const resolvers = {
    Query: {
        // returns an array of Tracks that will be used to 
        // populate the homepage grid of the web client
        trackForHome: (_parent, _args, { dataSources }) => {
            return dataSources.trackAPI.getTracksForHome();
        },
    },
    Track: {
        author: ({ authorId }, _args, { dataSources }) => {
            return dataSources.trackAPI.getAuthor(authorId)
        }
    }

}

module.exports = resolvers;