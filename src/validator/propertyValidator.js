const Joi = require('joi');

class PropertyValidator {
    validateCreatePropertyRequest = async (req, res, next) => {
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

    validateUpdatePropertyRequest = async (req, res, next) => {
        const data = { ...req.body, ...req.params };

        const schema = Joi.object().keys({
            _id: Joi.string().required(),
            area: Joi.string().required(),
            price: Joi.number().integer().positive().options({ convert: false }).required(),
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
}

export default new PropertyValidator();
