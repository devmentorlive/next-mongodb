const mongoose = require('mongoose');
const modelOptions = require('./defaults');
require('./match');

const { Schema } = mongoose;
const { MONGODB_URI, MONGODB_DB } = process.env;

mongoose.connect(`mongodb://${MONGODB_URI}/${MONGODB_DB}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const userSchema = new Schema(
  {
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
    },
  },
  modelOptions,
);

userSchema.virtual('fullName').get(function () {
  return `${this.firstName} ${this.lastName}`;
});

userSchema.methods.getMatches = function () {
  return this.model('Match')
    .find({
      $or: [{ challenger: this._id }, { opponent: this._id }],
    })
    .populate('opponent')
    .populate('challenger');
};

module.exports =
  mongoose.models.User || mongoose.model('User', userSchema);
