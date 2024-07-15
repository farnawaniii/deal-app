import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const db = {};

const basename = path.basename(__filename);
const modelsDir = __dirname;

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connection has been established successfully.');
    } catch (err) {
        console.log('Unable to connect to the database:', err);
    }
};

fs.readdirSync(modelsDir)
    .filter(file => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js')
    .forEach(async file => {
        const model = require(path.join(modelsDir, file));
        db[model.modelName] = model;

        if (model && model.ensureIndexes) {
            await model.ensureIndexes();
            console.log(`Indexes ensured for ${model.modelName}`);
        }
    });

module.exports = { db, connectDB };
