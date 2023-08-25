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
    Mutation: {
        // increment a track's numberOfViews property
        incrementTrackViews: async (_, { id }, { dataSources }) => {
            // schema expects code, success, and message fields, so we can't immediately return results
            // use async try catch block
            try {
                const track = await dataSources.trackAPI.incrementTrackViews(id);

                return {
                    code: 200,
                    success: true,
                    message: `Successfully incremented numberOfViews for track ${id}`,
                    track
                }
            } catch (err) {
                return {
                    // use apolloserver's extension field to provide error info
                    code: err.extensions.response.status,
                    success: false,
                    message: err.extensions.response.body,
                    track: null,
                }
            }
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