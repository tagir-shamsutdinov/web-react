import ApiError from "../error/ApiError.js";
import {Review} from "../models/review.js";
import {User} from "../models/user.js";
import {adaptReviewToClient} from "../adapter/reviewAdapter.js";
import {login} from "./userController.js";

export const getReviewsByOfferId = async (req, res, next) => {
    try {
        const reviews = await Review.findAll({
            where: {OfferId: req.params.offerId },
            include: { model: User, as: 'author'}
        });

        const adaptedReviews = reviews.map(adaptReviewToClient);
        res.json(adaptedReviews);
    } catch (error) {
        console.error(error);
        next(ApiError.internal('Ошибка при получении комментариев'));
    }
}

export const addReview = async (req, res, next) => {
    try {
        const { comment, rating } = req.body;
        const { offerId } = req.params;
        const userId = req.user.id;

        console.log(comment);
        console.log(rating);
        console.log(offerId);
        if (!comment || !rating || !offerId) {
            return next(ApiError.badRequest('Не хватает данных для комментария'));
        }

        const review = await Review.create({
            text: comment,
            rating,
            authorId: userId,
            OfferId: offerId
        });

        res.status(201).json(review);
    } catch (error) {
        console.error(error);
        next(ApiError.badRequest('Ошибка при добавлении комментария'));
    }
}