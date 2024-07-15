import express from 'express';
import userController from '../controller/userController';
import { authenticate } from '../middleware/authentication';
import { authorization } from '../middleware/authorization';

const Router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     UserStats:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Name of the user
 *         role:
 *           type: string
 *           description: Role of the user
 *         phone:
 *           type: string
 *           description: Phone number of the user
 *         status:
 *           type: string
 *           description: Status of the user
 *         adsCount:
 *           type: integer
 *           description: Number of ads posted by the user
 *         totalAdsAmount:
 *           type: number
 *           description: Total amount of all ads posted by the user
 *         requestsCount:
 *           type: integer
 *           description: Number of requests made by the user
 *         totalRequestsAmount:
 *           type: number
 *           description: Total amount of all requests made by the user
 * 
 * /user/getUserStats:
 *   get:
 *     summary: Get User Statistics
 *     tags: [UserStats]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *         required: false
 *         description: The page number to retrieve
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *         required: false
 *         description: The number of items per page
 *     responses:
 *       200:
 *         description: A list of user statistics
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/UserStats'
 *                 page:
 *                   type: integer
 *                 limit:
 *                   type: integer
 *                 total:
 *                   type: integer
 *                 hasNextPage:
 *                   type: boolean
 *                 hasPreviousPage:
 *                   type: boolean
 *       400:
 *         description: Invalid request
 *       500:
 *         description: Internal server error
 */
Router.get('/getUserStats', authenticate, authorization(), userController.getUserStats);

Router.post('/createUser', authenticate, authorization(), userController.createUser);
Router.post('/login', userController.login);

module.exports = Router;
