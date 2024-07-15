
import mongoose from 'mongoose';
import { convertObjectToListOfValues } from '../helper/functions';
import { propertyTypes } from '../helper/constants';
const { Schema } = mongoose;

const adSchema = new Schema({
  propertyType: {
    type: String,
    enum: convertObjectToListOfValues(propertyTypes),
    required: true
  },
  area: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  district: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  refreshedAt: {
    type: Date,
    default: Date.now
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  collection: 'ad'
});

const Ad = mongoose.model('Ad', adSchema);

module.exports = Ad;
