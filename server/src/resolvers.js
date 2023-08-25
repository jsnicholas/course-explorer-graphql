const resolvers = {
    Query: {
        // returns an array of Tracks that will be used to 
        // populate the homepage grid of the web client
        tracksForHome: (_parent, _args, { dataSources }) => {
            return dataSources.trackAPI.getTracksForHome();
        },
        // get a single track by id using track-api getTrack method
        track: (_parent, { id }, { dataSources }) => {
            return dataSources.trackAPI.getTrack(id)
        }
    },
    Track: {
        author: ({ authorId }, _args, { dataSources }) => {
            return dataSources.trackAPI.getAuthor(authorId)
        },
        // use parent arg to get id from preceding resolver
        modules: ({ id }, _, { dataSources }) => {
            return dataSources.trackAPI.getTrackModules(id)
        }
    }

}

module.exports = resolvers;