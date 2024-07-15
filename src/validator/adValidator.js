const Joi = require('joi');

class AdValidator {
    validateCreateAd = async (req, res, next) => {
        const data = req.body;

        const schema = Joi.object().keys({
            propertyType: Joi.string().valid('VILLA', 'HOUSE', 'LAND', 'APARTMENT').required(),
            area: Joi.string().required(),
            price: Joi.number().integer().positive().options({ convert: false }).required(),
            city: Joi.string().required(),
            district: Joi.string().required(),
            description: Joi.string().required(),
        });

        const { error } = schema.validate(data);
        if (error) {
            console.log('error');
            console.log(error);
            res.status(400).json({ message: 'Invalid request' });
        } else {
            next();
        }
    };

    validateMatchPropertyRequestWithAd = async (req, res, next) => {
        const data = { ...req.query, ...req.params };

        const schema = Joi.object().keys({
            _id: Joi.string().required(),
            page: Joi.number().integer().positive().options({ convert: true }),
            limit: Joi.number().integer().positive().options({ convert: true }),
        });

        const { error } = schema.validate(data);
        if (error) {
            console.log('error');
            console.log(error);
            res.status(400).json({ message: 'Invalid request' });
        } else {
            next();
        }
    };
}

export default new AdValidator();
