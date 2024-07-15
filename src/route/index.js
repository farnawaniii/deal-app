import express from 'express';
import propertyRoutes from './propertyRoutes';
import adRoutes from './adRoutes';
import userRoutes from './userRoutes';

const Router = express.Router();


Router.use('/property', propertyRoutes);
Router.use('/ad', adRoutes);
Router.use('/user', userRoutes);

module.exports = Router;