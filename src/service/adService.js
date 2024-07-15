
import Ad from '../model/ad';
import PropertyRequest from '../model/propertyRequest';

class AdService {
    createAd = async (data, user) => {
        try {

            await Ad.create({ ...data, user: user._id });

            return true;
        } catch (error) {
            return false;
        }
    };

    matchPropertyRequestWithAd = async (_id, page, limit) => {
        try {
            const ad = await Ad.findById(_id);
            if (!ad) {
                return false;
            }

            page = parseInt(page) - 1 || 0;
            limit = parseInt(limit) || 10;

            const priceLowerBound = ad.price * 0.9;
            const priceUpperBound = ad.price * 1.1;

            const matchingRequests = await PropertyRequest.aggregate([
                {
                    $match: {
                        district: ad.district,
                        area: ad.area,
                        price: { $gte: priceLowerBound, $lte: priceUpperBound },
                    },
                },
                {
                    $facet: {
                        metadata: [{ $count: 'total' }],
                        data: [
                            { $sort: { refreshedAt: -1 } },
                            { $skip: page * limit },
                            { $limit: limit },
                        ],
                    },
                },
                {
                    $project: {
                        data: 1,
                        total: { $arrayElemAt: ['$metadata.total', 0] },
                    },
                },
            ]);

            const { data, total } = matchingRequests[0];

            return {
                data,
                total,
                limit,
                page,
            };
        } catch (error) {
            console.log('error');
            console.log(error);
            return false;
        }
    };
}

export default new AdService();