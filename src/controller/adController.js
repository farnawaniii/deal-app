import adService from '../service/adService';


class AdController {
    createAd = async (req, res) => {
        try {
            const user = req.user;
            const data = req.body;
            const created = await adService.createAd(data, user);
            if (!created) return res.status(400).json({ message: `Couldn't Create Ad` });
            return res.status(200).json({ message: `Ad Created Successfully` });
        } catch (error) {
            return res.status(500).send('Internal Server Error');
        }
    };

    matchPropertyRequestWithAd = async (req, res) => {
        try {
            const _id = req.params._id;
            const { page, limit } = req.query;
            const data = await adService.matchPropertyRequestWithAd(_id, page, limit);
            return res.status(200).json({ data });
        } catch (error) {
            return res.status(500).send('Internal Server Error');
        }
    };
}

export default new AdController();