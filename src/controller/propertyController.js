import propertyService from '../service/propertyService';


class PropertyController {
    getPropertyRequest = async (req, res) => {
        try {
            const _id = req.params._id;
            const data = await propertyService.getPropertyRequest(_id);
            return res.status(200).json({ data });
        } catch (error) {
            return res.status(500).send('Internal Server Error');
        }
    };

    createPropertyRequest = async (req, res) => {
        try {
            const user = req.user;
            const data = req.body;
            const created = await propertyService.createPropertyRequest(data, user);
            if (!created) return res.status(400).json({ message: `Couldn't Create Request` });
            return res.status(200).json({ message: `Request Created Successfully` });
        } catch (error) {
            return res.status(500).send('Internal Server Error');
        }
    };

    updatePropertyRequest = async (req, res) => {
        try {
            const _id = req.params._id;
            const { area, price, description } = req.body;
            const created = await propertyService.updatePropertyRequest(_id, area, price, description);
            if (!created) return res.status(400).json({ message: `Couldn't Update Request` });
            return res.status(200).json({ message: `Request Updated Successfully` });
        } catch (error) {
            return res.status(500).send('Internal Server Error');
        }
    };
}

export default new PropertyController();