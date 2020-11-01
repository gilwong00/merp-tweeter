const User = require('../../../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const hashPassword = password => {
  if (password && password.length) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  } else {
    throw new Error('Password is null or empty');
  }
};

const findUserByName = async username => await User.findOne({ username });

const register = async (_, args) => {
  try {
    const { username, email, password } = args;
    const doesUserExist = await findUserByName(username);

    if (doesUserExist) {
      throw new Error(`Email is already in use`);
    }

    const newUser = await new User({
      username,
      email,
      password: hashPassword(password)
    }).save();

    return newUser;
  } catch (err) {
    throw err;
  }
};

const authUser = async (_, args) => {
  try {
    const { username, password } = args;
    const user = await findUserByName(username);

    if (!user) {
      throw new Error(`Cannot find user with username ${username}`);
    }

    const doesPasswordMatch = bcrypt.compareSync(password, user.password);

    if (!doesPasswordMatch) {
      return res.status(400).send('password is not correct');
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: 360000
    });

    return token;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  register,
  authUser
};
