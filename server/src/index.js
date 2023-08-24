const { ApolloServer } = require("@apollo/server")
const { startStandaloneServer } = require("@apollo/server/standalone");

// import data schema, resolvers, and API source
const typeDefs = require("./schema");
const resolvers = require("./resolvers")
const TrackAPI = require("./datasources/track-api");

async function startApolloServer() {
    // Generate executable schema from typedefs
    const server = new ApolloServer({
        typeDefs, resolvers
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