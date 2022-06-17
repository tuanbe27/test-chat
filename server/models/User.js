import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export const USER_TYPES = {
  CONSUMER: 'consumer',
  SUPPORT: 'support',
};

const userSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: () => uuidv4().replace(/\-/g, ''),
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    type: {
      type: String,
      enum: ['consumer', 'support'],
    },
  },
  {
    timestamps: true,
    collection: 'users',
  }
);

/**
 * @param {String} firstName
 * @param {String} lastName
 * @returns {Object} new user object created
 */
userSchema.statics.createUser = async function (firstName, lastName, type) {
  try {
    const user = await this.create({ firstName, lastName, type });
    return user;
  } catch (error) {
    throw error;
  }
};

/**
 * @param {String} id, user id
 * @return {Object} User profile object
 */
userSchema.statics.getUserById = async function (id) {
  try {
    const user = await this.findOne({ _id: id });
    if (!user) throw { error: 'No user with this id found' };
    return user;
  } catch (error) {
    throw error;
  }
};

/**
 * @return {Array} List of all users
 */
userSchema.statics.getUsers = async function () {
  try {
    const users = await this.find();
    return users;
  } catch (error) {
    throw error;
  }
};

/**
 * @param {Array} ids, string of user ids
 * @return {Array of Objects} users list
 */
userSchema.statics.getUserByIds = async function (ids) {
  try {
    const users = await this.find({ _id: { $in: ids } });
    return users;
  } catch (error) {
    throw error;
  }
};

/**
 * @param {String} id - id of user
 * @return {Object} - details of action performed
 */
userSchema.statics.deleteByUserById = async function (id) {
  try {
    const result = await this.remove({ _id: id });
    return result;
  } catch (error) {
    throw error;
  }
};

export default mongoose.model('User', userSchema);
