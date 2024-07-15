import { userRoles } from '../helper/constants';

const authorization =
    (roles = []) =>
        (req, res, next) => {
            const rolesToByPass = [userRoles.ADMIN];
            roles.push(...rolesToByPass);

            if (!req.user.role) return res.sendStatus(403);

            if (!roles.includes(req.user.role)) return res.sendStatus(403);

            next();
        };

module.exports = {
    authorization,
};
