import jwt from 'jsonwebtoken';

import User from '../model/user';
import Token from '../model/token';

require('dotenv').config();
const accessToken = process.env.ACCESS_TOKEN || 'ACCESS_TOKEN';

const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, accessToken, async (err, user) => {
        if (err) return res.sendStatus(401);

        const savedToken = await Token.findOne({ token });

        if (!user.role) return res.sendStatus(401);

        if (!savedToken || !savedToken.isValid) return res.sendStatus(401);

        const systemUser = await User.findOne({ _id: user._id });
        if (!systemUser) {
            return res.sendStatus(401);
        }

        req.user = user;

        next();
    });
};

module.exports = {
    authenticate,
};
