const { user } = require('../src/models');

const insertDummy = async () => {
  const authUser = await user.create({
    username: 'user',
    avatar: null,
  });

  return authUser;
};

module.exports = {
  insertDummy,
};
