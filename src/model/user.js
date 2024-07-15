import mongoose from 'mongoose';
import { convertObjectToListOfValues } from '../helper/functions';
import { userRoles, userStatus } from '../helper/constants';
const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: convertObjectToListOfValues(userRoles),
        required: true
    },
    status: {
        type: String,
        enum: convertObjectToListOfValues(userStatus),
        default: userStatus.ACTIVE
    }
}, {
    collection: 'user'
});

const User = mongoose.model('User', userSchema);

module.exports = User;
