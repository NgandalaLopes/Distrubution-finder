//import Graphql
const { gql } = require("apollo-server-express");
//User, username and email necessary
//This schema defines 4 main types: User, Auth, Charity, and Donation

const typeDefs = gql`
type User {
    _id :ID!
    username : String!
    email : String!
    password: String!
    charity:[Charity]
   
}

# declaring type Auth with it values
type Auth {
    token: ID!
    user: User
}
#type Category {
  #  _id: ID
  # name: String
  #  charities: [Charity]!
  #}



type Charity {
    _id :ID
    name : String
    description:String
    logoUrl: String
    coverImageUrl: String
    logoCloudinaryId: String
    ein : String 
    matchedTerms: String
    location:String
    profileUrl:String
  
}
input InputCharity {
    charityId: String
    description:String
    logoUrl: String
    coverImageUrl: String
    logoCloudinaryId: String
    ein : String 
    matchedTerms: String
    location:String
    profileUrl:String
}


#Query: Defines operations for querying data. It is used for querying users, a specific user, the logged-in user (me), a specific charity, all charities, and all donations.

type Query {
    
    me: User
    allUsers: [User]
}


#We will do update, delete and add with using Mutation
type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email:String!, password: String!): Auth
    saveCharity(newCharity:InputCharity!):User
    unsaveCharity(charityId: ID!):User
    # addDonation(
      #    donationAmount: Float!
     #   donationDate: String!
      #  charity: ID!
       # ): Donation
        #addCharity(charityId: ID!): User
       #unsaveCharity(charityId: ID!): User
        

}
`;
module.exports = typeDefs;
