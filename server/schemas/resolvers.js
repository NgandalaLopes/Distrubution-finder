const { Charity, Donation, User } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
              data = await User.findOne({ _id: context.user._id }).select('-__v -password');
              return data;
            }
            throw new AuthenticationError('You need to be logged in!');
        },

        allUsers: async (parent, args, context) => {
          try {
            const users = await User.find({});
            return users;
          } catch(err) {
            console.error(err)
          throw new Error('You need to be logged in!');
          
        }}
    },

    Mutation: {

       //POST: Adding a new user
       addUser: async( parent, {username, email, password}) => {
        const user = await User.create({ username, email, password});
        const token = signToken(user);
        return { token, user };
    },
        login: async (parent, {email, password}) => {
            const user = await User.findOne({ email })

            if(!user) {
                throw new AuthenticationError('User not found.Incorrect login info');
            }
            const correctPw = await user.isCorrectPassword(password);
      
            if (!correctPw) {
              throw new AuthenticationError('Incorrect login info');
            }
            const token = signToken(user);
      
            return { token, user };
        },

// POST new Donation to User
//        // addDonation: async (parent, { donationAmount, donationDate, charity }, context) => {
//             if(context.user) {
//                 const addingDonations = await User.findOneAndUpdate(
//                     {_id: context.user._id},
//                     {$addToSet: {donations: {donationAmount, donationDate}, charity: charity}},
//                     {new: true}
//                 ).populate("donations").populate("charities")
//                 return addingDonations;
//             };
//             throw new AuthenticationError("You must have an account to add a donation!");
//         },

   saveCharity: async (parent, { newCharity }, context) => {
        if(context.user) {
           const updatedUser = await User.findByIdAndUpdate(
             { _id: context.user._id },
             { $push: { savedCharitys: newCharity }},
             { new: true }
            );
             return updatedUser;
          }
           throw new AuthenticationError('You need to be logged in!');
       },
  
  
      // DELETE Charity from User Portfolio (unsaving)
      unsaveCharity: async (parent, { charityId }, context) => {
        if (context.user) {
          const updatedUser = await User.findByIdAndUpdate(
            { _id: context.user._id },
            { $pull: { savedCharitys: { charityId }}},
            { new: true }
          );
          return updatedUser;
        }
        throw new AuthenticationError('Login required!');
      },
    } 
};

module.exports = resolvers;