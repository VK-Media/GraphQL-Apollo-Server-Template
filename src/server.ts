import { ApolloServer } from 'apollo-server'
import userDataMethods from './data/user.data'
import resolvers from './graphql/resolvers'
import typeDefs from './graphql/typeDefs'
import mongoose from 'mongoose'

class Server {
    private readonly isDevelopment = process.env.NODE_ENV !== 'production'

    constructor() {
        this.setupMongoose()
        this.setupApolloServer()
    }

    private setupMongoose() {
        mongoose
            .connect(process.env.MONGODB_URL, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true,
                useFindAndModify: false
            })
            .then(() => {
                console.log(`💾 Connected to database`)
            })
    }

    private setupApolloServer() {
        const server = new ApolloServer({
            typeDefs,
            resolvers,
            context: (request) => {
                return {
                    models: {
                        User: userDataMethods
                    },
                    request: request.req
                }
            },
            debug: this.isDevelopment,
            playground: this.isDevelopment
        })

        server.listen().then(({ url }) => {
            console.log(`🚀 Server ready at ${url}`)
        })
    }
}

new Server()