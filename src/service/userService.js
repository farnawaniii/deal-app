import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import User from '../model/user';
import Token from '../model/token';

require('dotenv').config();

const jwtSecret = process.env.ACCESS_TOKEN || 'ACCESS_TOKEN';

class UserService {
    getUserStats = async (page, limit) => {
        try {
            page = parseInt(page) - 1 || 0;
            limit = parseInt(limit) || 10;

            const userStats = await User.aggregate([
                {
                    $lookup: {
                        from: 'ad',
                        localField: '_id',
                        foreignField: 'user',
                        as: 'ads'
                    }
                },
                {
                    $lookup: {
                        from: 'property_request',
                        localField: '_id',
                        foreignField: 'user',
                        as: 'requests'
                    }
                },
                {
                    $project: {
                        name: 1,
                        phone: 1,
                        role: 1,
                        status: 1,
                        adsCount: { $size: '$ads' },
                        totalAdsAmount: { $sum: '$ads.price' },
                        requestsCount: { $size: '$requests' },
                        totalRequestsAmount: { $sum: '$requests.price' }
                    }
                },
                {
                    $facet: {
                        metadata: [{ $count: 'total' }],
                        data: [
                            { $skip: page * limit },
                            { $limit: limit }
                        ]
                    }
                },
                {
                    $project: {
                        data: 1,
                        total: { $arrayElemAt: ['$metadata.total', 0] }
                    }
                }
            ]);

            const { data, total } = userStats[0] || { data: [], total: 0 };
            const totalPages = Math.ceil(total / limit);

            return {
                data,
                page: parseInt(page, 10),
                limit: parseInt(limit, 10),
                total,
                hasNextPage: page < totalPages - 1,
                hasPreviousPage: page > 1
            };
        } catch (error) {
            console.log('error');
            console.log(error);
            return false;
        }

    };

    createUser = async (name, password, phone, role) => {
        try {
            const dbUser = await User.findOne({ phone });
            if (dbUser) return false;

            password = await bcrypt.hash(password, 10);

            const userDoc = {
                name,
                password,
                phone,
                role,
            };

            await User.create(userDoc);

            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    };

    login = async (phone, password) => {
        try {
            const dbUser = await User.findOne({ phone });
            if (!dbUser) return { isValid: false };

            const isValidPassword = await bcrypt.compare(password, dbUser.password);
            if (!isValidPassword) return { isValid: false };

            const jwtUser = {
                _id: dbUser._id,
                name: dbUser.name,
                phone: dbUser.phone,
                role: dbUser.role,
            };

            const jwtToken = jwt.sign(jwtUser, jwtSecret);

            const tokenDoc = {
                token: jwtToken,
                user: dbUser._id,
            };

            await Token.create(tokenDoc);

            return { isValid: true, jwtToken };
        } catch (error) {
            console.log(error);
            return { isValid: false };
        }
    };
}

export default new UserService();