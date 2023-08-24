const { ApolloServer } = require("@apollo/server")
const { startStandaloneServer } = require("@apollo/server/standalone");

// import data schema, resolvers, and API source
const typeDefs = require("./schema");
const resolvers = require("./resolvers")
const TrackAPI = require("./datasources/track-api");

// import mock data libraries for testing server queries
// const { addMocksToSchema } = require("@graphql-tools/mock");
// const { makeExecutableSchema } = require("@graphql-tools/schema");

// Uncomment mocks object to enable mock testing
// const mocks = {
//     Query: () => ({
//         // generate 6 mock entries for testing
//         tracksForHome: () => [...new Array(6)],
//     }),
//     // populate Track fields corresponding to fields defined in  Track typeDefs
//     Track: () => ({
//         id: () => "track_01",
//         title: () => "Astro Kitty, Space Explorer",
//         // populate author fields corresponding to fields in author typeDefs
//         author: () => {
//             return {
//                 name: "KittyGirl",
//                 photo: "https://picsum.photos/200",
//             };
//         },
//         thumbnail: () => "https://picsum.photos/200",
//         length: () => 1210,
//         modulesCount: () => 6,
//     }),
// };

const typeDefs = require("./schema");

async function startApolloServer() {
    // Generate executable schema from typedefs
    const server = new ApolloServer({
        typeDefs, resolvers
        // uncomment schema for mock testing
        // schema: addMocksToSchema({
        //     schema: makeExecutableSchema({ typeDefs }),
        //     mocks,
    });
    const { url } = await startStandaloneServer(server, {
        context: async () => {
            // this object becomes our resolver's contextValue
            // allows access of dataSources.trackAPI and its methods from contextValue
            const { cache } = server;
            return {
                dataSources: {
                    // pass the cache to TrackAPI to make use of RESTDataSource caching
                    trackAPI: new TrackAPI({ cache }),
                }
            }
        }
    });
    // log server info, ensure it is running
    console.log(`
    Server is running!
    Query at ${url}
    `)
};

// call function to start server
startApolloServer();