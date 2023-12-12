const {
  GraphQLBoolean,
  GraphQLEnumType,
  GraphQLFloat,
  GraphQLError,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLScalarType,
} = require("graphql");
const { users } = require("../data");

const GenderEnumType = new GraphQLEnumType({
  name: "GenderEnumType",
  description: "Enum type for gender",
  values: {
    male: {
      value: "male",
    },
    female: {
      value: "female",
    },
  },
});

const UserType = new GraphQLObjectType({
  name: "User",
  description: "It's represent a single User",
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    firstName: {
      type: new GraphQLNonNull(GraphQLString),
    },
    lastName: {
      type: new GraphQLNonNull(GraphQLString),
    },
    gender: {
      type: GenderEnumType,
    },
    phone: {
      type: new GraphQLNonNull(GraphQLString),
    },
    email: {
      type: GraphQLString,
    },
  }),
});

const RootQueryType = new GraphQLObjectType({
  name: "Query",
  description: "Root Query",
  fields: () => ({
    users: {
      type: new GraphQLList(new GraphQLNonNull(UserType)),
      resolve: () => {
        return users;
      },
    },
    user: {
      type: UserType,
      args: {
        id: {
          type: GraphQLID,
        },
      },
      resolve: (_, { id }) => {
        const user = users.find((user) => user.id === id);
        return user;
      },
    },
  }),
});

module.exports = { RootQueryType, UserType };
