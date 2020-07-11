import { gql } from 'apollo-server-core'

export default gql`
    type Query {
        users: [User!]
        user(id: ID!): User!
    }

    type Mutation {
        createUser(input: CreateUserInput!): Authentication
        login(input: LoginInput): Authentication
    }

    type User {
        id: ID!
        name: String!
        email: String!
    }

    type Authentication {
        user: User!
        token: String!
    }

    input CreateUserInput {
        name: String!
        email: String!
        password: String!
    }

    input LoginInput {
        email: String!
        password: String!
    }
`
