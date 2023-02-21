import responseHandler from '../handlers/response.handler.js';
import tmdbApi from '../tmdb/tmdb.api.js';
import userModel from '../models/user.model.js';
import favoriteModel from '../models/favorite.model.js';
import reviewModel from '../models/review.model.js';

const getList = async (req, res) => {
    try {
        const { page } = req.query;
        const { mediaType, mediaCategory } = req.params;

        const response = await tmdbApi.mediaList({ mediaType, mediaCategory, page });

        return responseHandler.ok(res, response);
    } catch {
        responseHandler.error(res);
    }
};