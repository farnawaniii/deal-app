
import mongoose from 'mongoose';
const { Schema } = mongoose;

const tokenSchema = new Schema({
  token: {
    type: String,
    required: true
  },
  isValid: {
    type: Boolean,
    default: true,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  collection: 'token'
});

const Token = mongoose.model('Token', tokenSchema);

module.exports = Token;
