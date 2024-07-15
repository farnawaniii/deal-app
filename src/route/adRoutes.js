import express from 'express';
import adController from '../controller/adController';
import { authenticate } from '../middleware/authentication';
import { authorization } from '../middleware/authorization';
import { userRoles } from '../helper/constants';
import adValidator from '../validator/adValidator';

const Router = express.Router();

Router.post(
    '/createAd',
    authenticate,
    authorization([userRoles.AGENT]),
    adValidator.validateCreateAd,
    adController.createAd
);

Router.get(
    '/matchPropertyRequestWithAd/:_id',
    authenticate,
    adValidator.validateMatchPropertyRequestWithAd,
    adController.matchPropertyRequestWithAd
);

module.exports = Router;
