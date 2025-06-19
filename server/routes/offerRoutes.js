import { Router } from 'express';
import {
    createOffer,
    getAllOffers,
    getFavouriteOffers,
    getFullOffer,
    toggleFavorite
} from "../controllers/offerController.js";
import upload from "../middleware/upload.js";
import {authenticateToken} from "../middleware/authModdleware.js";

const router = new Router();

router.get('/offers', getAllOffers);

router.get('/offers/:id', getFullOffer);

router.post('/offers', upload.fields([
        { name: 'previewImage', maxCount: 1 },
        { name: 'photos', maxCount: 6 }
    ]), createOffer);

router.get('/favorite', getFavouriteOffers);

router.post('/favorite/:offerId/:status', authenticateToken, toggleFavorite);


export default router;