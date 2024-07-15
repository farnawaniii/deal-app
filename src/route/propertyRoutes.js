import express from 'express';
import propertyController from '../controller/propertyController';
import { authenticate } from '../middleware/authentication';
import { authorization } from '../middleware/authorization';
import { userRoles } from '../helper/constants';
import propertyValidator from '../validator/propertyValidator';

const Router = express.Router();

Router.get(
    '/getPropertyRequest/:_id',
    authenticate,
    authorization([userRoles.CLIENT]),
    propertyController.getPropertyRequest
);

/**
 * @swagger
 * components:
 *   schemas:
 *     PropertyRequest:
 *       type: object
 *       required:
 *         - propertyType
 *         - area
 *         - price
 *         - city
 *         - district
 *         - description
 *       properties:
 *         propertyType:
 *           type: string
 *           enum: [VILLA, HOUSE, LAND, APARTMENT]
 *           description: Type of the property
 *         area:
 *           type: string
 *           description: Area of the property
 *         price:
 *           type: integer
 *           description: Price of the property
 *         city:
 *           type: string
 *           description: City where the property is located
 *         district:
 *           type: string
 *           description: District where the property is located
 *         description:
 *           type: string
 *           description: Description of the property
 * 
 * /createPropertyRequest:
 *   post:
 *     summary: Create a property request
 *     tags: [PropertyRequest]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PropertyRequest'
 *     responses:
 *       200:
 *         description: Request Created Successfully
 *       400:
 *         description: Couldn't Create Request
 *       500:
 *         description: Internal Server Error
 */
Router.post(
    '/createPropertyRequest',
    authenticate,
    authorization([userRoles.CLIENT]),
    propertyValidator.validateCreatePropertyRequest,
    propertyController.createPropertyRequest
);

Router.post(
    '/updatePropertyRequest/:_id',
    authenticate,
    propertyValidator.validateUpdatePropertyRequest,
    propertyController.updatePropertyRequest
);

module.exports = Router;
