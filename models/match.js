const mongoose = require('mongoose');
const modelOptions = require('./defaults');

const { Schema } = mongoose;
const { MONGODB_URI, MONGODB_DB } = process.env;

mongoose.connect(`mongodb://${MONGODB_URI}/${MONGODB_DB}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const matchSchema = new Schema(
  {
    result: {
      type: String,
      enum: ['win', 'loss', 'draw'],
      required: true,
    },
    challenger: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    opponent: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  modelOptions,
);

module.exports =
  mongoose.models.Match || mongoose.model('Match', matchSchema);
