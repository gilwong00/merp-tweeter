const userMutations = require('./User/mutations');

module.exports = {
  Query: {
    get: () => {}
  },
  Mutation: {
    ...userMutations
  }
};
