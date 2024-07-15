
import PropertyRequest from '../model/propertyRequest';

class PropertyService {
    getPropertyRequest = async (_id) => {
        try {
            return await PropertyRequest.findByIdAndUpdate(_id, { refreshedAt: new Date() }, { new: true });
        } catch (error) {
            return false;
        }
    };

    createPropertyRequest = async (data, user) => {
        try {
            await PropertyRequest.create({ ...data, user: user._id });

            return true;
        } catch (error) {
            return false;
        }
    };

    updatePropertyRequest = async (_id, area, price, description) => {
        try {
            await PropertyRequest.findByIdAndUpdate(_id, { area, price, description });

            return true;
        } catch (error) {
            return false;
        }
    };
}

export default new PropertyService();